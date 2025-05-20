import { questionSite } from '@/lib/data';
import { BASEURL_SITE, logo_image, SITE_NAME } from '@/lib/variable';
import { Metadata } from 'next';
import { getRobotsMeta } from './common';

export const metadataCommonQuestions: Metadata = {
  title: `پاسخ به پرسش‌ های متداول | ${SITE_NAME}`,
  description: `ما در اینجا سوالات پر تکرار کاربران ${SITE_NAME} را جمع آوری کردیم `,
  robots: getRobotsMeta(),
  alternates: {
    canonical: `${BASEURL_SITE}/common-questions/`,
  },
  keywords: ['سوالات متداول'],
  openGraph: {
    locale: `fa_IR`,
    type: `article`,
    title: `پاسخ به پرسش‌های متداول | ${SITE_NAME}`,
    description: `ما در اینجا سوالات پر تکرار کاربران ${SITE_NAME} را جمع آوری کردیم `,
    url: `${BASEURL_SITE}/common-questions/`,
    siteName: `${SITE_NAME}`,
    images: [
      {
        url: `${logo_image}`,
        secureUrl: `${logo_image}`,
        width: 512,
        height: 512,
        alt: `faq-icon`,
        type: `image/png`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `پاسخ به پرسش‌های متداول | ${SITE_NAME}`,
    description: `ما در اینجا سوالات پر تکرار کاربران ${SITE_NAME} را جمع آوری کردیم `,
    images: [`${logo_image}`],
  },
  other: {
    'twitter:label1': `زمان خواندن`,
    'twitter:data1': `8 دقیقه`,
  },
};

export const jsonLdcommonQuestions = {
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
      publisher: { '@id': `${BASEURL_SITE}/#organization` },
      inLanguage: 'fa-IR',
    },
    {
      '@type': 'ImageObject',
      '@id': logo_image,
      url: logo_image,
      width: '200',
      height: '200',
      inLanguage: 'fa-IR',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASEURL_SITE}/common-questions/#breadcrumb`,
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
            '@id': `${BASEURL_SITE}/common-questions/`,
            name: 'پاسخ به پرسشهای متداول',
          },
        },
      ],
    },
    {
      '@type': ['WebPage', 'FAQPage'],
      '@id': `${BASEURL_SITE}/common-questions/#webpage`,
      url: `${BASEURL_SITE}/common-questions/`,
      name: `پاسخ به پرسشهای متداول | ${SITE_NAME}`,
      datePublished: '2023-05-20T12:00:03+03:30',
      dateModified: '2024-12-07T10:06:40+03:30',
      isPartOf: { '@id': `${BASEURL_SITE}/#website` },
      primaryImageOfPage: { '@id': logo_image },
      inLanguage: 'fa-IR',
      breadcrumb: { '@id': `${BASEURL_SITE}/common-questions/#breadcrumb` },
      mainEntity: questionSite.map((item) => {
        return {
          '@type': 'Question',
          name: item.question,
          url: `${BASEURL_SITE}/common-questions/#delivery`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        };
      }),
    },
  ],
};
