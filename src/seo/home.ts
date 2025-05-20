import { BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { Metadata } from 'next';
import { getRobotsMeta } from './common';
const logo_image = 'https://api.rozesefid.com/upload/2025/1/1738748628361.png';

export const jsonLdHome = () => {
  if (process.env.APP_ENV === 'stage') return {};
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASEURL_SITE}/#organization`,
        name: SITE_NAME,
        url: BASEURL_SITE,
        logo: logo_image,
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
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASEURL_SITE}/?s={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ImageObject',
        '@id': logo_image,
        url: logo_image,
        width: '750',
        height: '748',
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'WebPage',
        '@id': `${BASEURL_SITE}/#webpage`,
        url: BASEURL_SITE,
        name: `${SITE_NAME}: فروشگاه اینترنتی خرید لوازم آرایشی، بهداشتی و ادکلن`,
        datePublished: '2023-08-30T15:00:46+03:30',
        dateModified: new Date().toISOString(),
        about: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
        isPartOf: {
          '@id': `${BASEURL_SITE}/#website`,
        },
        primaryImageOfPage: {
          '@id': logo_image,
        },
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'Corporation',
        name: SITE_NAME,
        alternateName: SITE_NAME,
        url: BASEURL_SITE,
        logo: logo_image,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '025-32140',
          contactType: 'customer service',
          contactOption: 'HearingImpairedSupported',
          areaServed: 'IR',
          availableLanguage: 'Persian',
        },
        sameAs: [
          'https://instagram.com/iranwhiterose',
          'https://www.linkedin.com/in/rozesefid-company-b8596b237/',
          BASEURL_SITE,
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${BASEURL_SITE}/#localbusiness`,
        name: SITE_NAME,
        image: logo_image,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'قم، خیابان فلان، پلاک ۱۲۳',
          addressLocality: 'قم',
          postalCode: '3719611111',
          addressCountry: 'IR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '34.6416',
          longitude: '50.8756',
        },
        url: BASEURL_SITE,
        telephone: '025-32140',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Friday',
            opens: '10:00',
            closes: '14:00',
          },
        ],
        sameAs: [
          'https://instagram.com/iranwhiterose',
          'https://www.linkedin.com/in/rozesefid-company-b8596b237/',
        ],
        priceRange: 'IRR',
      },
    ],
  };
};

const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();

// متادیتای پیش‌فرض برای SEO بهتر
export const default_meta_data: Metadata = {
  robots: getRobotsMeta(),
  openGraph: {
    locale: `fa_IR`,
    type: `website`,
    siteName: `${SITE_NAME}`,
    images: [
      {
        url: `${logo_image}`,
        secureUrl: `${logo_image}`,
        width: 750,
        height: 748,
        alt: `${SITE_NAME}`,
        type: `image/jpeg`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    images: [`${logo_image}`],
  },
  other: {
    'og:updated_time': fourHoursAgo,
  },
};

export const home_meta_data: Metadata = {
  title: `${SITE_NAME}: فروشگاه اینترنتی خرید لوازم آرایشی، بهداشتی و ادکلن`,
  description: `خرید بهترین لوازم آرایشی، بهداشتی، عطر و ادکلن و لوازم برقی زنانه و مردانه اورجینال با بهترین قیمت در فروشگاه اینترنتی ${SITE_NAME}`,
  alternates: {
    canonical: `${BASEURL_SITE}/`,
  },
  openGraph: {
    url: `${BASEURL_SITE}/`,
  },
  robots: {
    index: process.env.APP_ENV === 'stage' ? false : true,
    follow: process.env.APP_ENV === 'stage' ? false : true,
  },
  other: {
    'twitter:label1': `نویسنده`,
    'twitter:data1': `پشتیبان سایت`,
    'twitter:label2': `زمان خواندن`,
    'twitter:data2': `28 دقیقه`,
  },
};
