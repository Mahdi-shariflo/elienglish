import { BASEURL_SITE, logo_image, SITE_NAME } from '@/lib/variable';

import type { Metadata } from 'next';
import { getRobotsMeta } from './common';

export const metadataBrandPage: Metadata = {
  title: `برند ها | ${SITE_NAME}`,
  description: `لذت یه آرایش با کیفیت🌝 پودر فیکس کننده آرایش کاپرا مدل FIXING POWDER شماره F03 بدون رنگ وزن 20 گرم ۴۱۰,۱۰۰ تومان ۳۲۳,۹۷۹ تومان %۲۱ کرم پودر تیوپی`,
  keywords: [],
  robots: getRobotsMeta(),
  alternates: {
    canonical: `${BASEURL_SITE}/brands`,
  },
  openGraph: {
    locale: `fa_IR`,
    type: `article`,
    title: `برند ها | ${SITE_NAME}`,
    description: `لذت یه آرایش با کیفیت🌝 پودر فیکس کننده آرایش کاپرا مدل FIXING POWDER شماره F03 بدون رنگ وزن 20 گرم ۴۱۰,۱۰۰ تومان ۳۲۳,۹۷۹ تومان %۲۱ کرم پودر تیوپی`,
    url: `${BASEURL_SITE}/brands/`,
    siteName: `${SITE_NAME}`,
    images: [
      {
        url: `${logo_image}`,
        secureUrl: `${logo_image}`,
        width: 1000,
        height: 1000,
        alt: `برند ها`,
        type: `image/jpeg`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `برند ها | ${SITE_NAME}`,
    description: `لذت یه آرایش با کیفیت🌝 پودر فیکس کننده آرایش کاپرا مدل FIXING POWDER شماره F03 بدون رنگ وزن 20 گرم ۴۱۰,۱۰۰ تومان ۳۲۳,۹۷۹ تومان %۲۱ کرم پودر تیوپی`,
    images: [`${logo_image}`],
  },
  other: {
    'article:published_time': `1403-01-29+033017:41:24+03:30`,
    'article:modified_time': `1403-07-21+033017:27:20+03:30`,
    'twitter:label1': `زمان خواندن`,
    'twitter:data1': `4 دقیقه`,
    'twitter:updatedTime': `2024-10-12T17:27:20+03:30`,
  },
};

export const jsonLdBrand = {
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
      width: 300, // اصلاح سایز واقعی تصویر
      height: 300,
      inLanguage: 'fa-IR',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASEURL_SITE}/brands/#breadcrumb`,
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
            '@id': `${BASEURL_SITE}/brands/`,
            name: 'برند ها',
          },
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${BASEURL_SITE}/brands/#webpage`,
      url: `${BASEURL_SITE}/brands/`,
      name: `برند ها | ${SITE_NAME}`,
      datePublished: '2024-04-17T17:41:24+03:30',
      dateModified: '2024-04-20T17:27:20+03:30', // اصلاح تاریخ به گذشته
      isPartOf: { '@id': `${BASEURL_SITE}/#website` },
      primaryImageOfPage: { '@id': logo_image },
      inLanguage: 'fa-IR',
      breadcrumb: { '@id': `${BASEURL_SITE}/brands/#breadcrumb` },
    },
    {
      '@type': 'Person',
      '@id': `${BASEURL_SITE}/author/09052549459/`,
      name: 'حسین خادمی',
      url: `${BASEURL_SITE}/author/09052549459/`,
      image: {
        '@type': 'ImageObject',
        '@id': logo_image, // پیشنهاد آدرس واقعی
        url: logo_image,
        caption: 'مهدی شریفلو',
        inLanguage: 'fa-IR',
      },
      worksFor: { '@id': `${BASEURL_SITE}/#organization` },
    },
    {
      '@type': 'Article',
      headline: `برند ها | ${SITE_NAME}`,
      keywords: `پودر فیکس کننده آرایش, کاپرا, فروشگاه ${SITE_NAME}`, // اضافه کردن کلمات کلیدی
      datePublished: '2024-04-17T17:41:24+03:30',
      dateModified: '2024-04-20T17:27:20+03:30',
      author: {
        '@id': `${BASEURL_SITE}/author/09052549459/`,
        name: 'مهدی شریفلو',
      },
      publisher: { '@id': `${BASEURL_SITE}/#organization` },
      description:
        'لذت یک آرایش با کیفیت • پودر فیکس کننده آرایش کاپرا مدل FIXING POWDER شماره F03 بدون رنگ وزن 20 گرم • قیمت: ۴۱,۰۰۰ تومان • تخفیف ویژه: ۳۲,۹۷۹ تومان (۲۱٪)',
      name: `برند ها | ${SITE_NAME}`,
      '@id': `${BASEURL_SITE}/brands/#richSnippet`,
      isPartOf: { '@id': `${BASEURL_SITE}/brands/#webpage` },
      image: { '@id': logo_image },
      inLanguage: 'fa-IR',
      mainEntityOfPage: { '@id': `${BASEURL_SITE}/brands/#webpage` },
    },
  ],
};
