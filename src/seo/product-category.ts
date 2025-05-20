import { safeRequest } from '@/lib/safeClient';
import { BASEURL, BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { Product } from '@/types/home';
import { htmlToText } from 'html-to-text';
import { permanentRedirect, redirect } from 'next/navigation';
import { getRobotsMeta } from './common';
type SearchParamsCategory = {
  attribiutes?: string;
  available?: string;
  discounted?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  search?: string;
};
type Props = {
  products: Product[];
  category: {
    breadcrumb: {
      order: number;
      title: string;
    }[];
    title: string;
    url: string;
    metaTitle: string;
  };
};

function parseRobotsString(robotsString: string) {
  const robotsArray = robotsString.split(', ');
  const robotsObject = {};

  robotsArray.forEach((item: any) => {
    const [key, value] = item.split(':');
    if (value === undefined) {
      // @ts-ignore
      robotsObject[key] = true;
    } else {
      // @ts-ignore
      robotsObject[key] = value;
    }
  });

  return robotsObject;
}

export const getProductsCategory = async ({
  searchParamsFilter,
  defaultSort = 'discount_desc',
  id,
}: {
  searchParamsFilter: SearchParamsCategory;
  defaultSort?: string;
  id?: string;
}) => {
  searchParamsFilter.sort = searchParamsFilter?.sort || defaultSort;

  const filterProduct = new URLSearchParams();
  // Iterate over searchParams and encode key-value pairs
  for (const [key, value] of Object.entries(searchParamsFilter!)) {
    filterProduct.append(decodeURIComponent(key), decodeURIComponent(value));
  }
  const newQueryString = filterProduct.toString();
  const result = await safeRequest({
    url: `/user/product/all?limit=24&${
      id ? `categoryUrl=${decodeURIComponent(id)}` : ''
    }&${newQueryString}`,
  });

  return result;
};

export const sortBreadcumb = (breadcrumb: { order: number; title: string }[]) => {
  return Array.isArray(breadcrumb)
    ? breadcrumb.sort((a, b) => {
        if (a.order === null) return -1;
        if (b.order === null) return 1;
        return a.order - b.order;
      })
    : [];
};
export const jsonLdProductCategory = ({ category, products }: Props) => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASEURL_SITE}/#organization`,
        name: category?.title,
        url: `${BASEURL_SITE}`,
      },
      {
        '@type': 'WebSite',
        '@id': `${BASEURL_SITE}/#website`,
        url: `${BASEURL_SITE}`,
        name: category?.title,
        publisher: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASEURL_SITE}/product-category/${category?.url}/#breadcrumb`,
        itemListElement: [
          { title: 'صفحه اصلی' },
          ...sortBreadcumb(category.breadcrumb!),
          { title: category.title },
        ].map((item, idx) => {
          return {
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@id': BASEURL_SITE,
              name: item?.title,
            },
          };
        }),
      },
      {
        '@type': 'CollectionPage',
        '@id': `${BASEURL_SITE}/product-category/${category?.url}/#webpage`,
        url: `${BASEURL_SITE}/product-category/${category?.url}/`,
        name: category.title,
        isPartOf: {
          '@id': `${BASEURL_SITE}/#website`,
        },
        inLanguage: 'fa-IR',
        breadcrumb: {
          '@id': `${BASEURL_SITE}/product-category/${category?.url}/#breadcrumb`,
        },
      },
      {
        '@context': 'https://schema.org/',
        '@graph': products.map((product) => {
          return {
            '@type': 'Product',
            image: `${BASEURL}/${product?.thumbnailImage?.url}`,
            name: product.title,
            url: `${BASEURL_SITE}/product/${product.title}/`,
            '@id': `${BASEURL_SITE}/product/${product.title}/`,
            description: product.title,
            offers: {
              // اضافه کردن offers
              '@type': 'Offer',
              priceCurrency: 'IRR', // یا واحد پول مورد نظر
              price: product?.discountPrice ? product.discountPrice : product.price, // قیمت محصول
              availability: `https://schema.org/${product.count === 0 ? 'OutOfStock' : 'InStock'}`, // یا OutOfStock
            },
          };
        }),
      },
    ],
  };
};

export const generate_metadata_productCategory = async ({
  id,
  searchParamsFilter,
}: {
  id: string;
  searchParamsFilter: SearchParamsCategory;
}) => {
  // has query params
  const hasQueryParams = Object.keys(searchParamsFilter).length > 0;
  const filters = await safeRequest({ url: `/category/?url=${id}` });
  const products = await getProductsCategory({ searchParamsFilter, id });
  const category = filters?.data?.data?.category ? filters.data.data.category : null;
  const resultProucts: {
    products: Product[];
    totalPages: number;
    maxProductPrice: number;
    minProductPrice: number;
    totalProducts: number;
  } = Array.isArray(products.data.data.products) ? products.data.data : [];
  if (category?.redirecturltype === 302) redirect(category.redirecturl);
  if (category?.redirecturltype === 301) permanentRedirect(category.redirecturl);
  const fullHtml = category?.description;

  const textContent = htmlToText(fullHtml, {
    wordwrap: 130,
  });

  // تقسیم متن به جملات و انتخاب چند جمله اول
  const sentences = textContent.slice(0, 168); // برای نمایش ۲ جمله اول
  if (category) {
    return {
      title: category?.metaTitle,
      description: category?.metaDescription ? category.metaDescription : sentences,
      keywords: category.keyWords.join(','),
      openGraph: {
        title: category.metaTitle,
        description: category?.metaDescription ? category.metaDescription : sentences,
        locale: `fa_IR`,
        type: `article`,
        siteName: `${SITE_NAME}`,
        url: category.canonicalurl
          ? category.canonicalurl
          : `${BASEURL}/product-category/${category.url}`,
      },
      twitter: {
        title: category.metaTitle,
        description: category?.metaDescription ? category.metaDescription : sentences,
      },
      alternates: {
        canonical: category.canonicalurl
          ? category.canonicalurl
          : `${BASEURL_SITE}/product-category/${category.url}`,
      },
      other: {
        'og:locale': 'fa_IR',
        'twitter:label1': 'محصولات',
        'twitter:data1': resultProucts.totalProducts,

        //  "next":`${BASEURL}/product-category/${category.url}?page=2`,
      },
      robots: getRobotsMeta(
        hasQueryParams
          ? {
              index: false,
              follow: false,
              'max-image-preview': 'large',
              'max-snippet': -1,
              'max-video-preview': '-1',
            }
          : category?.robots
      ),
    };
  } else {
    return {
      title: decodeURIComponent(id),
      description: decodeURIComponent(id),
      robots: `index, follow, max-snippet:0, max-video-preview:0, max-image-preview:large`,
    };
  }
};
