import { BASEURL_SITE, logo_image, SITE_NAME } from '@/lib/variable';
import { Metadata } from 'next';
import { getRobotsMeta } from './common';
export const metadata_aboutPage: Metadata = {
  title: `درباره ${SITE_NAME}`,
  description: `فروشگاه اینترنتی رزسفید در سال 98 با هدف تسهیل در روند خرید محصولات ادکلن ، آرایشی و بهداشتی مشتریان و همراهان رزسفید افتتاح گردید. فروشگاه اینترنتی ${SITE_NAME}،`,
  robots: getRobotsMeta(),
  alternates: {
    canonical: `${BASEURL_SITE}/about-us/`,
  },
  keywords: ['درباره ما'],
  openGraph: {
    locale: `fa_IR`,
    type: `article`,
    title: `درباره ${SITE_NAME}`,
    description: `فروشگاه اینترنتی رزسفید در سال 98 با هدف تسهیل در روند خرید محصولات ادکلن ، آرایشی و بهداشتی مشتریان و همراهان رزسفید افتتاح گردید. فروشگاه اینترنتی ${SITE_NAME}،`,
    url: `${BASEURL_SITE}/about-us/`,
    siteName: `${SITE_NAME}`,
    images: [
      {
        url: `${logo_image}`,
        secureUrl: `${logo_image}`,
        width: 1920,
        height: 1196,
        alt: `درباره ما`,
        type: `image/jpeg`,
      },
    ],
    // videos: [
    //   `${BASEURL_SITE}/wp-content/uploads/2022/07/video_2022-07-03_18-28-04.mp4`,
    //   `${BASEURL_SITE}/wp-content/uploads/2022/07/video_2022-07-03_18-28-08.mp4`,
    // ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `درباره ${SITE_NAME}`,
    description: `فروشگاه اینترنتی رزسفید در سال 98 با هدف تسهیل در روند خرید محصولات ادکلن ، آرایشی و بهداشتی مشتریان و همراهان رزسفید افتتاح گردید. فروشگاه اینترنتی ${SITE_NAME}،`,
    images: [`${logo_image}`],
  },
  other: {
    'article:published_time': `1399-08-03+033015:54:34+03:30`,
    'article:modified_time': `1402-11-14+033013:38:42+03:30`,
    'ya:ovs:upload_date': `1399-08-03+033015:54:34+03:30`,
    'ya:ovs:allow_embed': `false`,
    'twitter:label1': `زمان خواندن`,
    'twitter:data1': `کمتر از یک دقیقه`,
    'og:updatedTime': '2024-02-03T13:38:42+03:30',
  },
};

export const jsonLdAboutUs = () => {
  if (process.env.APP_ENV === 'stage') return {};

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
        '@id': `${BASEURL_SITE}/about-us/#breadcrumb`,
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
              '@id': `${BASEURL_SITE}/about-us/`,
              name: 'درباره ما',
            },
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${BASEURL_SITE}/about-us/#webpage`,
        url: `${BASEURL_SITE}/about-us/`,
        name: `درباره ما- هر آنچه که در باره ${SITE_NAME} نیاز است که بدانید!`,
        datePublished: '2020-10-24T15:54:34+03:30',
        dateModified: '2024-02-03T13:38:42+03:30',
        isPartOf: { '@id': `${BASEURL_SITE}/#website` },
        primaryImageOfPage: { '@id': logo_image },
        inLanguage: 'fa-IR',
        breadcrumb: { '@id': `${BASEURL_SITE}/about-us/#breadcrumb` },
      },
      {
        '@type': 'Person',
        '@id': `${BASEURL_SITE}/author/root/`,
        name: 'پشتیبان سایت',
        url: `${BASEURL_SITE}/author/root/`,
        image: {
          '@type': 'ImageObject',
          '@id':
            'https://secure.gravatar.com/avatar/c405393242ea558880a2cff55f3d02bd?s=96&d=mm&r=g',
          url: 'https://secure.gravatar.com/avatar/c405393242ea558880a2cff55f3d02bd?s=96&d=mm&r=g',
          caption: 'پشتیبان سایت',
          inLanguage: 'fa-IR',
        },
        worksFor: { '@id': `${BASEURL_SITE}/#organization` },
      },
      {
        headline: `درباره ما- هر آنچه که در باره ${SITE_NAME} نیاز است که بدانید!`,
        description: `فروشگاه اینترنتی ${SITE_NAME} در سال 98 با هدف تسهیل در روند خرید محصولات ادکلن، آرایشی و بهداشتی مشتریان و همراهان ${SITE_NAME} افتتاح گردید. `,
        datePublished: '2020-10-24T15:54:34+03:30',
        dateModified: '2024-02-03T13:38:42+03:30',
        image: { '@id': logo_image },
        author: {
          '@id': `${BASEURL_SITE}/author/root/`,
          name: 'پشتیبان سایت',
        },
        '@type': 'Article',
        name: `درباره ما- هر آنچه که در باره ${SITE_NAME} نیاز است که بدانید!`,
        '@id': `${BASEURL_SITE}/about-us/#schema-1626775`,
        isPartOf: { '@id': `${BASEURL_SITE}/about-us/#webpage` },
        publisher: { '@id': `${BASEURL_SITE}/#organization` },
        inLanguage: 'fa-IR',
        mainEntityOfPage: { '@id': `${BASEURL_SITE}/about-us/#webpage` },
      },
    ],
  };
};
