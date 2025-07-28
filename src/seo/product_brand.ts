import { safeRequest } from '@/lib/safeClient';
import { BASEURL, BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { Product } from '@/types/home';
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
  id?: string;
  url?: string;
  title?: string;
  metaTitle?: string;
  products: Product[];
};

export const jsonLdProductBrand = ({ products, title, url, metaTitle }: Props) => {
  return {
    '@context': `https://schema.org`,
    '@graph': [
      {
        '@type': `Organization`,
        '@id': `${BASEURL_SITE}/#organization`,
        name: `${SITE_NAME}`,
        url: `${BASEURL_SITE}`,
      },
      {
        '@type': `WebSite`,
        '@id': `${BASEURL_SITE}/#website`,
        url: `${BASEURL_SITE}`,
        name: `${SITE_NAME}`,
        publisher: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
        inLanguage: `fa-IR`,
      },
      {
        '@type': `BreadcrumbList`,
        '@id': `${BASEURL_SITE}/product_brand/${url}/#breadcrumb`,
        itemListElement: [
          {
            '@type': `ListItem`,
            position: `1`,
            item: {
              '@id': `${BASEURL_SITE}`,
              name: `خانه`,
            },
          },
          {
            '@type': `ListItem`,
            position: `2`,
            item: {
              '@id': `${BASEURL_SITE}/product_brand/${url}/`,
              name: title,
            },
          },
        ],
      },
      {
        '@type': `CollectionPage`,
        '@id': `${BASEURL_SITE}/product_brand/${url}/#webpage`,
        url: `${BASEURL_SITE}/product_brand/${url}/`,
        name: metaTitle ? metaTitle : title,
        isPartOf: {
          '@id': `${BASEURL_SITE}/#website`,
        },
        inLanguage: `fa-IR`,
        breadcrumb: {
          '@id': `${BASEURL_SITE}/product_brand/${url}/#breadcrumb`,
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

export const getProductsBrand = async ({
  searchParamsFilter,
  defaultSort = 'discount_desc',
  id,
}: {
  searchParamsFilter: SearchParamsCategory;
  defaultSort?: string;
  id: string;
}) => {
  // ست کردن مقدار پیش‌فرض برای sort
  searchParamsFilter.sort = searchParamsFilter?.sort || defaultSort;

  // مقدار پیش‌فرض برای minPrice و maxPrice
  if (!searchParamsFilter.minPrice) {
    searchParamsFilter.minPrice = '0';
  }
  if (!searchParamsFilter.maxPrice) {
    searchParamsFilter.maxPrice = '100000000';
  }

  const filterProduct = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParamsFilter)) {
    filterProduct.append(decodeURIComponent(key), decodeURIComponent(value));
  }

  const newQueryString = filterProduct.toString();

  const result = await safeRequest({
    url: `/user/product/allattribiute?limit=21&${id ? `attributeUrl=${decodeURIComponent(id)}` : ''}&${newQueryString}`,
  });

  return result;
};

export const generate_metadata_productBranmd = async ({
  id,
  searchParamsFilter,
}: {
  id: string;
  searchParamsFilter: SearchParamsCategory;
}) => {
  // has query params
  const { sort, ...otherSearchParamsFilter } = searchParamsFilter;
  const hasQueryParams = Object.keys(otherSearchParamsFilter).length > 0;
  const filters = await getProductsBrand({ id, searchParamsFilter });
  const category = filters.data.data ? filters.data.data : null;

  if (category?.redirecturltype === 302) redirect(category.redirecturl);
  if (category?.redirecturltype === 301) permanentRedirect(category.redirecturl);

  // تقسیم متن به جملات و انتخاب چند جمله اول
  if (category) {
    return {
      title: category.attribute.metaTitle ? category.attribute.metaTitle : category.attribute.title,
      description: category?.attribute?.metaDescription,
      next: `${BASEURL}/product_brand/${category.attribute.url}?page=2`,
      openGraph: {
        locale: `fa_IR`,
        type: `article`,
        siteName: `${SITE_NAME}`,
        title: category.attribute.metaTitle
          ? category.attribute.metaTitle
          : category.attribute.title,
        description: category.attribute?.metaDescription,
        site_name: `${SITE_NAME}`,
      },
      twitter: {
        card: `summary_large_image`,
        title: category.attribute.metaTitle
          ? category.attribute.metaTitle
          : category.attribute.title,
        description: category.attribute?.metaDescription,
      },
      alternates: {
        canonical: category.attribute?.canonicalurl
          ? category.attribute?.canonicalurl
          : `${BASEURL_SITE}/product_brand/${category?.attribute.url}`,
      },
      other: {
        label1: `محصولات`,
        data1: category.totalProducts,
        'og:url': `${BASEURL_SITE}/product_brand/${category.attribute.url}`,
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
          : category?.attribute?.rebots
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
