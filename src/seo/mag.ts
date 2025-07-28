import { safeRequest } from '@/lib/safeClient';
import { BASEURL, BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { Article } from '@/types';
import { htmlToText } from 'html-to-text';
import { Metadata } from 'next';
import { permanentRedirect, redirect } from 'next/navigation';
import { getRobotsMeta } from './common';

export const jsonLdMag = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASEURL_SITE}/#organization`,
        name: 'خانه',
        url: BASEURL_SITE,
      },
      {
        '@type': 'WebSite',
        '@id': `${BASEURL_SITE}/#website`,
        url: BASEURL_SITE,
        name: 'خانه',
        publisher: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASEURL_SITE}/mag/#breadcrumb`,
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
              '@id': `${BASEURL_SITE}/mag`,
              name: 'مقاله‌ها',
            },
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${BASEURL_SITE}/mag/#webpage`,
        url: `${BASEURL_SITE}/mag/`,
        name: 'مقاله ها',
        isPartOf: {
          '@id': `${BASEURL_SITE}/#website`,
        },
        inLanguage: 'fa-IR',
        breadcrumb: {
          '@id': `${BASEURL_SITE}/mag/#breadcrumb`,
        },
      },
    ],
  };
};
export const jsonLdCategoryMag = ({ title, url }: { title: string; url: string }) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          name: 'خانه',
          '@id': BASEURL_SITE,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          name: title,
          '@id': `${BASEURL_SITE}/mag/${url}`,
        },
      },
    ],
  };
};
export const jsonLdSingleMag = ({ mag }: { mag: Article }) => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASEURL_SITE}/#organization`,
        name: mag.title,
        url: BASEURL_SITE,
      },
      {
        '@type': 'WebSite',
        '@id': `"${BASEURL_SITE}/#website"`,
        url: BASEURL_SITE,
        name: mag.title,
        publisher: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'ImageObject',
        '@id': `${BASEURL}/${mag?.thumbnailimage?.url}`,
        url: `${BASEURL}/${mag?.thumbnailimage?.url}`,
        width: '1024',
        height: '540',
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASEURL_SITE}/${mag.url}/#breadcrumb`,
        itemListElement: [{ title: 'خانه', url: '' }, ...mag.breadcrumb, { title: mag.title }].map(
          (mag, idx) => {
            return {
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@id': `${BASEURL_SITE}/mag/${mag.url}`,
                name: mag.title,
              },
            };
          }
        ),
      },
      {
        '@type': 'WebPage',
        '@id': `${BASEURL_SITE}/${mag.url}/#webpage`,
        url: `${BASEURL_SITE}/mag/${mag.url}/`,
        name: mag.title,
        datePublished: mag.createdAt,
        dateModified: mag.updatedAt,
        isPartOf: {
          '@id': `${BASEURL_SITE}/#website`,
        },
        primaryImageOfPage: {
          '@id': `${BASEURL}/${mag?.thumbnailimage?.url}`,
        },
        inLanguage: 'fa-IR',
        breadcrumb: {
          '@id': `${BASEURL_SITE}/${mag.url}/#breadcrumb`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${BASEURL_SITE}/author/${mag.author._id}/`,
        name: `${mag.author.firstName} ${mag.author.lastName}`,
        url: `${BASEURL_SITE}/author/${mag.author._id}/`,
        image: {
          '@type': 'ImageObject',
          '@id': `${BASEURL}/${mag.thumbnailimage?.url}`,
          url: `${BASEURL}/${mag.thumbnailimage?.url}`,
          inLanguage: 'fa-IR',
        },
        worksFor: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
      },
      {
        '@type': 'Article',
        headline: mag.title,
        keywords: mag.keyWords,
        datePublished: mag.createdAt,
        dateModified: mag.updatedAt,
        author: {
          '@id': `${BASEURL_SITE}/author/${mag.author._id}/`,
          name: `${mag.author.firstName} ${mag.author.lastName}`,
        },
        publisher: {
          '@id': `${BASEURL_SITE}/#organization`,
        },
        description: mag.short_des,
        name: mag.title,
        '@id': `${BASEURL_SITE}/mag/${mag.url}/#richSnippet`,
        isPartOf: {
          '@id': `${BASEURL_SITE}/mag/${mag.url}/#webpage`,
        },
        image: {
          '@id': `${BASEURL}/${mag?.thumbnailimage?.url}`,
        },
        inLanguage: 'fa-IR',
        mainEntityOfPage: {
          '@id': `${BASEURL_SITE}/mag/${mag.url}/#webpage`,
        },
      },
    ],
  };
};

export const getmetadatSingleMag = async ({ id }: { id: string }) => {
  const result = await safeRequest({ url: `/user/mag/${id}` });
  const blog: Article = result?.data?.data?.blog;
  if (blog?.redirecturltype === 302) redirect(blog.redirecturl);
  if (blog?.redirecturltype === 301) permanentRedirect(blog.redirecturl);
  // تقسیم متن به جملات و انتخاب چند جمله اول
  const fullHtml = blog?.description;

  const textContent = htmlToText(fullHtml, {
    wordwrap: 130,
  });

  // تقسیم متن به جملات و انتخاب چند جمله اول
  const sentences = textContent.slice(0, 168); // برای نمایش ۲ جمله اول
  if (blog) {
    return {
      title: blog.metaTitle ? blog.metaTitle : blog.title,
      description: blog.metaDescription ? blog.metaDescription : sentences,
      alternates: {
        canonical: blog?.canonicalurl ? blog.canonicalurl : `${BASEURL_SITE}/mag/${blog.url}/`,
      },
      openGraph: {
        // required for Torob
        images: [
          {
            url: `${BASEURL}/${blog?.thumbnailimage?.url}`,
            secureUrl: `${BASEURL}/${blog?.thumbnailimage?.url}`,
            width: 1920,
            height: 1000,
            alt: blog?.thumbnailimage?.url ? blog?.thumbnailimage?.url : blog.title,
            type: `image/jpeg`,
          },
        ],
        title: blog?.metaTitle ? blog.metaTitle : blog.title,
        description: blog.metaDescription ? blog.metaDescription : sentences,
        locale: 'fa_IR',
        siteName: SITE_NAME,
        countryName: 'Iran',
        type: 'article',
        url: `${BASEURL_SITE}/mag/${blog.url}/`,
      },
      twitter: {
        card: `summary_large_image`,
        title: blog.metaTitle ? blog.metaTitle : blog.title,
        description: blog.metaDescription ? blog.metaDescription : sentences,
        image: `${BASEURL}/${blog?.thumbnailimage?.url}`,
      },
      other: {
        'article:section': blog?.category?.title,
        'article:published_time': blog.updatedAt,
        'article:modified_time': blog.updatedAt,
        'twitter:label1': `نویسنده`,
        'twitter:data1': `${blog?.author?.firstName} ${blog?.author?.lastName}`,
        'twitter:label2': `زمان خواندن`,
        'twitter:data2': `9 دقیقه`,
      },
    };
  } else return {};
};

export const metadatMagPage: Metadata = {
  title: `الی اینگلیش | ${SITE_NAME}`,
  robots: getRobotsMeta(),
  alternates: {
    canonical: `${BASEURL_SITE}/mag/`,
  },
  openGraph: {
    locale: `fa_IR`,
    title: `الی اینگلیش | ${SITE_NAME}`,
    description: `بهترین کانسیلر برای پوست چرب و جوش دار چه ویژگی هایی دارد؟ پوست چرب، یکی از انواع پوست های رایج است که با تولید بیش از حد سبوم یا چربی مشخص می شود. این امر می تواند منجر به بروز...`,
    url: `${BASEURL_SITE}/mag/`,
    siteName: `${SITE_NAME}`,
    type: 'article',
  },
  twitter: {
    card: `summary_large_image`,
    title: `الی اینگلیش | ${SITE_NAME}`,
    description: `بهترین کانسیلر برای پوست چرب و جوش دار چه ویژگی هایی دارد؟ پوست چرب، یکی از انواع پوست های رایج است که با تولید بیش از حد سبوم یا چربی مشخص می شود. این امر می تواند منجر به بروز...`,
  },
  other: {
    'twitter:label1': `نویسنده`,
    'twitter:data1': `پشتیبان سایت`,
    'twitter:label2': `زمان خواندن`,
    'twitter:data2': `12 دقیقه`,
  },
};
export const metadatMagPageCategories = {
  title: `مقالات آرایشی و زیبایی ${SITE_NAME}`,
  description: `در این دسته بندی از فروشگاه اینترنتی ${SITE_NAME} به یک آرایگر حرفه ای تبدیل شوید و بهترین مقالات آرایشی و زیبایی را مطالعه کنید`,
  robots: getRobotsMeta(),
  alternates: {
    canonical: `${BASEURL_SITE}/magazine/classification-of-cosmetic-articles/`,
    next: `${BASEURL_SITE}/magazine/classification-of-cosmetic-articles/page/2/`,
  },
  openGraph: {
    locale: `fa_IR`,
    type: `article`,
    title: `مقالات آرایشی و زیبایی ${SITE_NAME}`,
    description: `در این دسته بندی از فروشگاه اینترنتی ${SITE_NAME} به یک آرایگر حرفه ای تبدیل شوید و بهترین مقالات آرایشی و زیبایی را مطالعه کنید`,
    url: `${BASEURL_SITE}/mag/classification-of-cosmetic-articles/`,
    siteName: `${SITE_NAME}`,
  },
  twitter: {
    card: `summary_large_image`,
    title: `مقالات آرایشی و زیبایی ${SITE_NAME}`,
    description: `در این دسته بندی از فروشگاه اینترنتی ${SITE_NAME} به یک آرایگر حرفه ای تبدیل شوید و بهترین مقالات آرایشی و زیبایی را مطالعه کنید`,
    label1: `نوشته‌ها`,
    data1: `18`,
  },
};
