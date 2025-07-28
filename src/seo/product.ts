import { groupAttributesByProperty } from '@/lib/product';
import { safeRequest } from '@/lib/safeClient';
import { BASEURL, BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { Comment } from '@/types';
import { Product } from '@/types/home';
import { htmlToText } from 'html-to-text';

import { permanentRedirect, redirect } from 'next/navigation';
import { getRobotsMeta } from './common';

export const getProduct = async (id: string) => {
  try {
    const data = await safeRequest({ url: `/user/product/${id}`, method: 'GET' });
    return {
      breadcrumb: data?.data?.data?.breadcrumb,
      product: data?.data?.data?.product[0],
    };
  } catch (error) {
    return {
      breadcrumb: [],
      product: null,
    };
  }
};

const findWarrantyTitle = function (
  propFields: [{ _id: string; url: string }],
  attrFields: [{ property: string; _id: string; title: string }]
): string {
  // lookup in the attributeLookup
  const foundField = propFields?.find((prop) => prop?.url === 'warranty');
  if (foundField) {
    const foundAttribute = attrFields?.find((prop) => prop.property === foundField._id);
    if (foundAttribute) {
      return foundAttribute.title;
    }
  }
  return '';
};

type Props = {
  product: Product;
  comments: Comment[];
  breadcrumb: {
    title: string;
    order: number;
    url: string;
    customUrl?: boolean;
  }[];
};

export const sortBreadcumb = (breadcrumb: { order: number; title: string; url: string }[]) => {
  return Array.isArray(breadcrumb)
    ? breadcrumb.sort((a, b) => {
        if (a.order === null) return -1;
        if (b.order === null) return 1;
        return a.order - b.order;
      })
    : [];
};

export const jsonLdProduct = ({ breadcrumb, product, comments }: Props) => {
  // @ts-expect-error error
  const property: {
    url: string;
    archive: boolean;
    title: string;
    displayName: string;
    mainProperty: boolean;
    attribiuts: {
      displayName: string;
      title: string;
      label: string;
      url: string;
    }[];
  }[] = groupAttributesByProperty({
    main: false,
    attribiutsLookup: product?.attributeLookup,
    children: [],
    propertiesLookup: product?.propertyLookup,
    // @ts-expect-error error
    mainProperty: product?.properties,
  });
  const findBrand: any = property?.find((item) => item?.title === 'برند');
  const totalRate = comments?.reduce((acc, comment) => acc + Number(comment.rate), 0);
  // Divide by the length of the array to get the average
  const averageRate = totalRate / comments?.length;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASEURL_SITE}/#organization`,
        name: product.title,
        url: BASEURL_SITE,
      },
      {
        '@type': 'WebSite',
        '@id': `${BASEURL_SITE}/#website`,
        url: BASEURL_SITE,
        name: product.title,
        publisher: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'ImageObject',
        '@id': `${BASEURL}/${product.thumbnailImage?.url}`,
        url: `${BASEURL}/${product.thumbnailImage?.url}`,
        width: '1000',
        height: '1000',
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASEURL_SITE}/product/${product.url}/#breadcrumb`,
        itemListElement: breadcrumb.map((item, idx) => {
          // اطمینان از URL منحصر به فرد برای هر item
          return {
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@id': item?.customUrl
                ? `${BASEURL_SITE}/${item.url}`
                : `${BASEURL_SITE}/product-category/${item.url}`, // استفاده از URL خاص
              name: item.title, // نام یکتا برای هر بخش
            },
          };
        }),
      },
      {
        '@type': 'ItemPage',
        '@id': `${product.title}/product/${product.url}/#webpage`,
        url: `${BASEURL_SITE}/product/${product.url}/`,
        name: product.title,
        datePublished: product.createdAt,
        dateModified: product.updatedAt,
        isPartOf: {
          '@id': `${BASEURL_SITE}/#website`,
        },
        primaryImageOfPage: {
          '@id': `${BASEURL}/${product.thumbnailImage?.url}`,
        },
        inLanguage: 'fa-IR',
        breadcrumb: {
          '@id': `${BASEURL_SITE}/product/${product.url}/#breadcrumb`,
        },
      },
      {
        '@type': 'Product',
        ...(findBrand
          ? {
              brand: {
                '@type': 'Brand',
                name: findBrand.title,
                ...(Array.isArray(findBrand.attribiuts)
                  ? {
                      image: `${BASEURL}/${findBrand.attribiuts[0]?.image?.url}`,
                    }
                  : null),
              },
            }
          : null),
        name: product.title,
        description: product.title,
        sku: product.skuId,
        category: product.category?.title,
        mainEntityOfPage: {
          '@id': `${BASEURL_SITE}/product/${product.url}/#webpag`,
        },
        image: [product.thumbnailImage, ...product?.galleryImage]?.map((image) => {
          return {
            '@type': 'ImageObject',
            // @ts-expect-error error
            url: `${BASEURL}/${image?.thumbnailImage?.url}`,
            height: '1000',
            width: '1000',
          };
        }),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.00',
          bestRating: '5',
          ratingCount: averageRate ? averageRate.toFixed(0) : 1,
          reviewCount: averageRate ? averageRate.toFixed(0) : 1,
        },
        review: comments.map((comment) => {
          return {
            '@type': 'Review',
            '@id': `${BASEURL_SITE}/product/${product.url}/#li-comment-${comment._id}`,
            description: comment.comment,
            datePublished: comment.createdAt,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: comment.rate,
              bestRating: '5',
              worstRating: '1',
            },
            author: {
              '@type': 'Person',
              name: `${comment?.author?.firstName} ${comment?.author?.lastName}`,
            },
          };
        }),
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'IRR',
          priceValidUntil: '2026-12-31',
          availability: `https://schema.org/${product.count === 0 ? 'outStock' : 'InStock'}`,
          itemCondition: 'NewCondition',
          url: `${BASEURL_SITE}/product/${product.url}`,
          seller: {
            '@type': 'Organization',
            '@id': `${BASEURL_SITE}`,
            name: product.title,
            url: BASEURL_SITE,
            logo: '',
          },
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'pa_licensor',
            value:
              '\u0633\u0627\u0632\u0645\u0627\u0646 \u063a\u0630\u0627 \u0648 \u062f\u0627\u0631\u0648',
          },
        ],
        gtin12: product.gtin,
        '@id': `${BASEURL_SITE}/product/${product.url}/#richSnippet`,
      },
    ],
  };
};

export const generate_metadata_product = async ({
  id,
  hasQueryParams,
}: {
  id: string;
  hasQueryParams: boolean;
}) => {
  const productData = await getProduct(id);
  const product = productData?.product || {};

  if (product?.redirecturltype === 302) redirect(product.redirecturl);
  if (product?.redirecturltype === 301) permanentRedirect(product.redirecturl);
  // @ts-expect-error error
  const property: {
    url: string;
    archive: boolean;
    title: string;
    displayName: string;
    mainProperty: boolean;
    attribiuts: {
      displayName: string;
      title: string;
      label: string;
      url: string;
    }[];
  }[] = groupAttributesByProperty({
    main: false,
    attribiutsLookup: product?.attributeLookup,
    children: [],
    propertiesLookup: product?.propertyLookup,
    mainProperty: product?.properties,
  });
  const findBrand: any = property?.find((item) => item?.title === 'برند');
  if (product) {
    const fullHtml = product?.description;

    const textContent = htmlToText(fullHtml, {
      wordwrap: 130,
    });
    // تقسیم متن به جملات و انتخاب چند جمله اول
    const sentences = textContent.slice(0, 168); // برای نمایش ۲ جمله اول
    return {
      other: {
        ...(findBrand ? { product_brand: findBrand.attribiuts[0].title } : null),
        'twitter:label1': 'قیمت',
        'twitter:data1': `${Number(product.price)} تومان`,
        'twitter:label2': 'دسترسی',
        'twitter:data2': product.count === 0 ? 'ناموجود' : 'موجود',
        'og:type': 'product',
        'og:url': `${BASEURL_SITE}/product/${product.url}`,
        'product:retailer_item_id': product._id,
        'og:updated_time': product.updatedAt,
        'og:image:secure_url': `${BASEURL}/${product.thumbnailImage.url}`,
        'og:image:alt': product?.thumbnailImage?.alt,
        'og:image:type': 'image/png',
        'product:price:currency': 'IRT',
        'og:image:width': '370',
        'og:image:height': '390',
        product_id: product._id,
        product_price: product.discountPrice,
        product_old_price: product.price,
        product_name: product.title,
        availability: product.count === 0 ? 'outofstock' : 'instock',
        guarantee: findWarrantyTitle(product.propertyLookup, product.attributeLookup),
      },
      title: product?.metaTitle ? product.metaTitle : product.title,
      description: product.metaDescription ? product.metaDescription : sentences,
      twitter: {
        title: product?.metaTitle ? product.metaTitle : product.title,
        description: product.metaDescription ? product.metaDescription : sentences,
        label1: 'قیمت',
        data1: product.discountPrice ? product.discountPrice : product.price,
        label2: 'دسترسی',
        data2: product.count === 0 ? 'ناموجود' : 'موجود',
      },
      openGraph: {
        // required for Torob
        images: [`${BASEURL}/${product?.thumbnailImage?.url}`],
        title: product?.metaTitle ? product.metaTitle : product.title,
        description: product.metaDescription ? product.metaDescription : sentences,
        locale: 'fa_IR',
        siteName: SITE_NAME,
        countryName: 'Iran',
      },

      alternates: {
        canonical: product.canonicalurl
          ? product.canonicalurl
          : `${BASEURL_SITE}/product/${product.url}`,
      },
      keywords: product.keyWords?.join(','),
      robots: getRobotsMeta(
        hasQueryParams
          ? {
              index: false,
              follow: false,
              'max-image-preview': 'large',
              'max-snippet': -1,
              'max-video-preview': '-1',
            }
          : product?.robots
      ),
    };
  } else {
    return {
      title: 'محصول',
    };
  }
};
