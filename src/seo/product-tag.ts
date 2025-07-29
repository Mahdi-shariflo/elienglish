import { safeRequest } from '@/lib/safeClient';
import { BASEURL, BASEURL_SITE, SITE_NAME } from '@/lib/variable';
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

export const getProductsTag = async ({
  searchParamsFilter,
  defaultSort = 'discount_desc',
  id,
}: {
  searchParamsFilter?: SearchParamsCategory;
  defaultSort?: string;
  id?: string;
}) => {
  searchParamsFilter?.sort
    ? (searchParamsFilter.sort = searchParamsFilter?.sort || defaultSort)
    : null;

  const filterProduct = new URLSearchParams();
  // Iterate over searchParams and encode key-value pairs
  for (const [key, value] of Object.entries(searchParamsFilter!)) {
    filterProduct.append(decodeURIComponent(key), decodeURIComponent(value));
  }
  const newQueryString = filterProduct.toString();
  const result = await safeRequest({
    url: `/user/product/alltag?limit=24&${id ? `productTag=${decodeURIComponent(id)}` : ''}&${newQueryString}`,
  });

  return result;
};

export const generate_metadata_productTag = async ({
  id,
  searchParamsFilter,
}: {
  id: string;
  searchParamsFilter: SearchParamsCategory;
}) => {
  // has query params
  const hasQueryParams = Object.keys(searchParamsFilter).length > 0;

  const data = await getProductsTag({ searchParamsFilter, id });

  const category = data?.data?.data ? data?.data?.data?.tag : null;

  if (category?.redirectType === 302) redirect(category.redirecturl);
  if (category?.redirectType === 301) permanentRedirect(category.redirecturl);
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
        'twitter:data1': category.totalProducts,

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

export const jsonLdProductTag = ({ url, title }: { url: string; title: string }) => {
  return {
    '@context': `https://schema.org`,
    '@graph': [
      {
        '@type': `Organization`,
        '@id': `${BASEURL_SITE}/#organization`,
        name: `${SITE_NAME}`,
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
        '@id': `${BASEURL_SITE}/product-tag/${url}/#breadcrumb`,
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
              '@id': `${BASEURL_SITE}/product-tag/${url}/`,
              name: title,
            },
          },
        ],
      },
      {
        '@type': `CollectionPage`,
        '@id': `${BASEURL_SITE}/product-tag/${url}/#webpage`,
        url: `${BASEURL_SITE}/product-tag/${url}/`,
        name: `${title} - ${SITE_NAME}`,
        isPartOf: {
          '@id': `${BASEURL_SITE}/#website`,
        },
        inLanguage: `fa-IR`,
        breadcrumb: {
          '@id': `${BASEURL_SITE}/product-tag/${url}/#breadcrumb`,
        },
      },
    ],
  };
};
