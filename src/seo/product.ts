import { groupAttributesByProperty } from '@/lib/product';
import { safeRequest } from '@/lib/safeClient';
import { BASEURL, BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { Comment } from '@/store/types';
import { Product } from '@/store/types/home';
import { htmlToText } from 'html-to-text';

import { permanentRedirect, redirect } from 'next/navigation';
import { getRobotsMeta } from './common';

export const getProduct = async (id: string) => {
  try {
    const data = await safeRequest({ url: `/product/detail/${id}`, method: 'GET' });
    return {
      product: data?.data?.data?.product,
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
  comments?: {
    ratingStats: [
      {
        avgRating: number;
        totalRating: number;
        count: number;
      },
    ];
    comments: Comment[];
  };
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

export const jsonLdProduct = ({ product, comments }: Props) => {
  // Divide by the length of the array to get the average
  // تقسیم متن به جملات و انتخاب چند جمله اول
  const fullHtml = product?.description;

  const textContent = htmlToText(fullHtml, {
    wordwrap: 130,
  });

  // تقسیم متن به جملات و انتخاب چند جمله اول
  const sentences = textContent.slice(0, 168); // برای نمایش ۲ جمله اول
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.metaTitle ? product.metaTitle : product.title,
    description: product.metaDescription ? product.metaDescription : sentences,
    // @ts-expect-error error
    robots: getRobotsMeta(product?.robots),
    alternates: {
      canonical: product?.canonicalurl ? product.canonicalurl : `${BASEURL_SITE}/${product.url}/`,
    },
    image: [`${BASEURL}/${product.thumbnailImage.url}`],
    ...(product.discountPrice
      ? {
          offers: {
            '@type': 'Offer',
            url: `${BASEURL_SITE}/product/${product.url}`,
            priceCurrency: 'IRR',
            price: product.price,
            priceValidUntil: product.createdAt,
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: SITE_NAME,
            },
          },
        }
      : null),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: comments?.ratingStats[0].totalRating,
      reviewCount: comments?.ratingStats[0].count,
    },
    review: comments?.comments?.map((item) => {
      return {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: item.rating,
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: `${item.author.firstName} ${item.author.lastName}`,
        },
        reviewBody: item.content,
      };
    }),
  };
};

export const jsonLdProductBreadcrub = ({ product }: Props) => {
  // Divide by the length of the array to get the average
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: product.title,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: 3,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: BASEURL_SITE,
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: `${BASEURL_SITE}/${product.url}`,
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

  if (product?.redirectType === 302) redirect(product.redirecturl);
  if (product?.redirectType === 301) permanentRedirect(product.redirecturl);
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
