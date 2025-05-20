import { BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { getRobotsMeta } from './common';

export const metadataResukt = async ({
  search,
  hasQueryParams,
}: {
  search: string;
  hasQueryParams: boolean;
}) => {
  return {
    title: `شما برای ${search} جستجو کردید | ${SITE_NAME}`,
    robots: getRobotsMeta(
      hasQueryParams
        ? {
            index: false,
            follow: false,
          }
        : {
            index: true,
            follow: true,
          }
    ),
    openGraph: {
      locale: 'fa_IR',
      type: 'article',
      title: `شما برای کرم جستجو کردید | ${SITE_NAME}`,
      url: `${BASEURL_SITE}/result?search=${search}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: `شما برای کرم جستجو کردید | ${SITE_NAME}`,
    },
  };
};

export const jsonldResult = ({ search }: { search: string }) => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASEURL_SITE}/#organization`,
        name: SITE_NAME,
        url: BASEURL_SITE,
      },
      {
        '@type': 'WebSite',
        '@id': `${BASEURL_SITE}/#website`,
        url: BASEURL_SITE,
        name: SITE_NAME,
        publisher: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASEURL_SITE}/result?search=${search}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: '1',
            item: {
              '@id': BASEURL_SITE,
              name: 'خانه',
            },
          },
          {
            '@type': 'ListItem',
            position: '2',
            item: {
              '@id': `/result?search=${search}&post_type=product`,
              name: `نتایج برای ${search}`,
            },
          },
        ],
      },
      {
        '@type': 'SearchResultsPage',
        '@id': `${BASEURL_SITE}/result?search=${search}/#webpage`,
        url: `${BASEURL_SITE}/result?search=${search}/`,
        name: `شما برای ${search} جستجو کردید | ${SITE_NAME}`,
        isPartOf: {
          '@id': `${BASEURL_SITE}/#website`,
        },
        inLanguage: 'fa-IR',
        breadcrumb: {
          '@id': `${BASEURL_SITE}/result?search=${search}/#breadcrumb`,
        },
      },
    ],
  };
};
