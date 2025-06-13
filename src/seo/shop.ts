import { BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { getRobotsMeta } from './common';

export const metadata_shop = {
  title: `فروشگاه | ${SITE_NAME}`,
  description: `محصولات Archive | ${SITE_NAME}`,
  robots: getRobotsMeta(),
  openGraph: {
    locale: `fa_IR`,
    type: `article`,
    title: `فروشگاه | ${SITE_NAME}`,
    description: `محصولات Archive | ${SITE_NAME}`,
    url: `${BASEURL_SITE}/shop/`,
  },
  twitter: {
    card: `summary_large_image`,
    title: `فروشگاه | ${SITE_NAME}`,
    description: `محصولات Archive | ${SITE_NAME}`,
  },
  alternates: {
    canonical: `${BASEURL_SITE}/shop/`,
  },
};

export const jsonLd_Shop = {
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
      '@id': `${BASEURL_SITE}/shop/#breadcrumb`,
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
            '@id': `${BASEURL_SITE}/shop/`,
            name: `فروشگاه`,
          },
        },
      ],
    },
    {
      '@type': `CollectionPage`,
      '@id': `${BASEURL_SITE}/shop/#webpage`,
      url: `${BASEURL_SITE}/shop/`,
      name: `فروشگاه | ${SITE_NAME}`,
      isPartOf: {
        '@id': `${BASEURL_SITE}/#website`,
      },
      inLanguage: `fa-IR`,
      breadcrumb: {
        '@id': `${BASEURL_SITE}/shop/#breadcrumb`,
      },
    },
  ],
};
