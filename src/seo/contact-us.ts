import { BASEURL_SITE, logo_image, SITE_NAME } from '@/lib/variable';
import { Metadata } from 'next';
import { getRobotsMeta } from './common';

export const metadataContentUs: Metadata = {
  title: `تماس با ${SITE_NAME} | ${SITE_NAME}`,
  description: `تماس با ${SITE_NAME} | شما میتوانید با پر کردن فرم یا از طریق چت آنلاین با پشتیبانی فروشگاه اینترنتی ${SITE_NAME} در ارتباط باشید و هر گونه مشکل و ایرادی را برطرف نمایید ...`,
  robots: getRobotsMeta(),
  alternates: {
    canonical: `${BASEURL_SITE}/contact-us/`,
  },
  keywords: ['تماس با ما'],
  openGraph: {
    locale: `fa_IR`,
    type: `article`,
    title: `تماس با ${SITE_NAME} | ${SITE_NAME}`,
    description: `تماس با ${SITE_NAME} | شما میتوانید با پر کردن فرم یا از طریق چت آنلاین با پشتیبانی فروشگاه اینترنتی ${SITE_NAME} در ارتباط باشید و هر گونه مشکل و ایرادی را برطرف نمایید ...`,
    url: `${BASEURL_SITE}/contact-us/`,
    siteName: `${SITE_NAME}`,
    images: [
      {
        url: `${logo_image}`,
        secureUrl: `${logo_image}`,
        width: 400,
        height: 300,
        alt: `تماس با ${SITE_NAME}`,
        type: `image/png`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `تماس با ${SITE_NAME} | ${SITE_NAME}`,
    description: `تماس با ${SITE_NAME} | شما میتوانید با پر کردن فرم یا از طریق چت آنلاین با پشتیبانی فروشگاه اینترنتی ${SITE_NAME} در ارتباط باشید و هر گونه مشکل و ایرادی را برطرف نمایید ...`,
    images: [`${logo_image}`],
  },
  other: {
    'article:published_time': `1398-04-10+043022:14:30+04:30`,
    'article:modified_time': `1402-10-30+033010:02:24+03:30`,
    'twitter:label1': `زمان خواندن`,
    'twitter:data1': `کمتر از یک دقیقه`,
  },
};

export const jsonLdContactUs = {
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
      '@id': `${BASEURL_SITE}/contact-us/#breadcrumb`,
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
            '@id': `${BASEURL_SITE}/contact-us/`,
            name: `تماس با ${SITE_NAME}`,
          },
        },
      ],
    },
    {
      '@type': `WebPage`,
      '@id': `${BASEURL_SITE}/contact-us/#webpage`,
      url: `${BASEURL_SITE}/contact-us/`,
      name: `تماس با ${SITE_NAME} | ${SITE_NAME}`,
      datePublished: `2019-07-01T22:14:30+04:30`,
      dateModified: `2024-01-20T10:02:24+03:30`,
      isPartOf: {
        '@id': `${BASEURL_SITE}/#website`,
      },
      primaryImageOfPage: {
        '@id': `${BASEURL_SITE}/${logo_image}`,
      },
      inLanguage: `fa-IR`,
      breadcrumb: {
        '@id': `${BASEURL_SITE}/contact-us/#breadcrumb`,
      },
    },
    {
      '@type': `Person`,
      '@id': `${BASEURL_SITE}/author/root/`,
      name: `پشتیبان سایت`,
      url: `${BASEURL_SITE}/author/root/`,
      worksFor: {
        '@id': `${BASEURL_SITE}/#organization`,
      },
    },
    {
      '@type': `Article`,
      headline: `تماس با ${SITE_NAME} | ${SITE_NAME}`,
      keywords: `تماس با ${SITE_NAME}`,
      datePublished: `2019-07-01T22:14:30+04:30`,
      dateModified: `2024-01-20T10:02:24+03:30`,
      author: {
        '@id': `${BASEURL_SITE}/author/root/`,
        name: `پشتیبان سایت`,
      },
      publisher: {
        '@id': `${BASEURL_SITE}/#organization`,
      },
      description: `تماس با ${SITE_NAME} | شما میتوانید با پر کردن فرم یا از طریق چت آنلاین با پشتیبانی فروشگاه اینترنتی ${SITE_NAME} در ارتباط باشید و هر گونه مشکل و ایرادی را برطرف نمایید ...`,
      name: `تماس با ${SITE_NAME} | ${SITE_NAME}`,
      '@id': `${BASEURL_SITE}/contact-us/#richSnippet`,
      isPartOf: {
        '@id': `${BASEURL_SITE}/contact-us/#webpage`,
      },
      inLanguage: `fa-IR`,
      mainEntityOfPage: {
        '@id': `${BASEURL_SITE}/contact-us/#webpage`,
      },
    },
  ],
};
