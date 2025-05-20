import { BASEURL_SITE, logo_image, SITE_NAME } from '@/lib/variable';

import type { Metadata } from 'next';
import { getRobotsMeta } from './common';

export const metadataQuide: Metadata = {
  title: `راهنمای خرید از سایت | ${SITE_NAME}`,
  description: `جهت خرید از سایت ${SITE_NAME} ابتدا از طریق لینک www.rozesefid.com و یا جستجو نام فروشگاه ${SITE_NAME} در گوگل، مانند تصویر زیر وارد صفحه اصلی سایت شوید.`,
  robots: getRobotsMeta(),
  alternates: {
    canonical: `${BASEURL_SITE}/guide/`,
  },
  openGraph: {
    locale: `fa_IR`,
    type: `article`,
    title: `راهنمای خرید از سایت | ${SITE_NAME}`,
    description: `جهت خرید از سایت ${SITE_NAME} ابتدا از طریق لینک www.rozesefid.com و یا جستجو نام فروشگاه ${SITE_NAME} در گوگل، مانند تصویر زیر وارد صفحه اصلی سایت شوید.`,
    url: `${BASEURL_SITE}/guide/`,
    siteName: `${SITE_NAME}`,
    images: [
      {
        url: `${logo_image}`,
        secureUrl: `${logo_image}`,
        width: 1920,
        height: 1000,
        alt: `مرحله اول راهنمای خرید از سایت ${SITE_NAME}`,
        type: `image/jpeg`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `راهنمای خرید از سایت | ${SITE_NAME}`,
    description: `جهت خرید از سایت ${SITE_NAME} ابتدا از طریق لینک www.rozesefid.com و یا جستجو نام فروشگاه ${SITE_NAME} در گوگل، مانند تصویر زیر وارد صفحه اصلی سایت شوید.`,
    images: [`${logo_image}`],
  },
  other: {
    'article:published_time': `1399-09-02+033018:04:23+03:30`,
    'article:modified_time': `1401-04-24+043013:20:42+04:30`,
    'twitter:label1': `زمان خواندن`,
    'twitter:data1': `1 دقیقه`,
    'og:updatedTime': '2022-07-15T13:20:42+04:30',
  },
};

export const jsonLdGuide = {
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
      width: 800,
      height: 600,
      caption: `راهنمای خرید از فروشگاه ${SITE_NAME}`,
      inLanguage: 'fa-IR',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASEURL_SITE}/guide/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': BASEURL_SITE,
            name: 'خانه',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `${BASEURL_SITE}/guide/`,
            name: 'راهنمای خرید از سایت',
          },
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${BASEURL_SITE}/guide/#webpage`,
      url: `${BASEURL_SITE}/guide/`,
      name: `راهنمای خرید از سایت | ${SITE_NAME}`,
      datePublished: '2020-11-22T18:04:23+03:30',
      dateModified: '2024-05-01T09:15:00+03:30',
      isPartOf: { '@id': `${BASEURL_SITE}/#website` },
      primaryImageOfPage: { '@id': logo_image },
      inLanguage: 'fa-IR',
      breadcrumb: { '@id': `${BASEURL_SITE}/guide/#breadcrumb` },
    },
    {
      '@type': 'Person',
      '@id': `${BASEURL_SITE}/author/team/`,
      name: `تیم پشتیبانی ${SITE_NAME}`,
      url: `${BASEURL_SITE}/author/support/`,
      image: {
        '@type': 'ImageObject',
        '@id': logo_image,
        url: logo_image,
        caption: 'تیم پشتیبانی',
        inLanguage: 'fa-IR',
      },
      worksFor: { '@id': `${BASEURL_SITE}/#organization` },
    },
    {
      '@type': 'Article',
      headline: `آموزش کامل خرید از فروشگاه اینترنتی ${SITE_NAME}`,
      keywords: `خرید آنلاین, راهنمای خرید, ${SITE_NAME}`,
      datePublished: '2020-11-22T18:04:23+03:30',
      dateModified: '2024-05-01T09:15:00+03:30',
      author: {
        '@id': `${BASEURL_SITE}/author/team/`,
        name: `تیم پشتیبانی ${SITE_NAME}`,
      },
      publisher: { '@id': `${BASEURL_SITE}/#organization` },
      description: `آموزش گام به گام خرید از فروشگاه اینترنتی ${SITE_NAME}: از جستجوی محصول تا تکمیل سفارش و پیگیری ارسال • تضمین کیفیت کالاها • پشتیبانی 24 ساعته • روشهای پرداخت امن`,
      name: `راهنمای خرید از سایت | ${SITE_NAME}`,
      '@id': `${BASEURL_SITE}/guide/#richSnippet`,
      isPartOf: { '@id': `${BASEURL_SITE}/guide/#webpage` },
      image: { '@id': logo_image },
      inLanguage: 'fa-IR',
      mainEntityOfPage: { '@id': `${BASEURL_SITE}/guide/#webpage` },
    },
  ],
};
