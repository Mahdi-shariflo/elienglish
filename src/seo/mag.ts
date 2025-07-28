import { safeRequest } from '@/lib/safeClient';
import { BASEURL, BASEURL_SITE, logo_image, SITE_NAME } from '@/lib/variable';
import { Blog } from '@/types';
import { htmlToText } from 'html-to-text';
import { Metadata } from 'next';
import { permanentRedirect, redirect } from 'next/navigation';
import { getRobotsMeta } from './common';

// export const jsonLdMag = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@graph': [
//       {
//         '@type': 'Organization',
//         '@id': `${BASEURL_SITE}/#organization`,
//         name: 'خانه',
//         url: BASEURL_SITE,
//       },
//       {
//         '@type': 'WebSite',
//         '@id': `${BASEURL_SITE}/#website`,
//         url: BASEURL_SITE,
//         name: 'خانه',
//         publisher: {
//           '@id': `${BASEURL_SITE}/#organization`,
//         },
//         inLanguage: 'fa-IR',
//       },
//       {
//         '@type': 'BreadcrumbList',
//         '@id': `${BASEURL_SITE}/mag/#breadcrumb`,
//         itemListElement: [
//           {
//             '@type': 'ListItem',
//             position: '1',
//             item: {
//               '@id': BASEURL_SITE,
//               name: 'خانه',
//             },
//           },
//           {
//             '@type': 'ListItem',
//             position: '2',
//             item: {
//               '@id': `${BASEURL_SITE}/mag`,
//               name: 'مقاله‌ها',
//             },
//           },
//         ],
//       },
//       {
//         '@type': 'CollectionPage',
//         '@id': `${BASEURL_SITE}/mag/#webpage`,
//         url: `${BASEURL_SITE}/mag/`,
//         name: 'مقاله ها',
//         isPartOf: {
//           '@id': `${BASEURL_SITE}/#website`,
//         },
//         inLanguage: 'fa-IR',
//         breadcrumb: {
//           '@id': `${BASEURL_SITE}/mag/#breadcrumb`,
//         },
//       },
//     ],
//   };
// };
// export const jsonLdCategoryMag = ({ title, url }: { title: string; url: string }) => {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'BreadcrumbList',
//     itemListElement: [
//       {
//         '@type': 'ListItem',
//         position: 1,
//         item: {
//           name: 'خانه',
//           '@id': BASEURL_SITE,
//         },
//       },
//       {
//         '@type': 'ListItem',
//         position: 2,
//         item: {
//           name: title,
//           '@id': `${BASEURL_SITE}/mag/${url}`,
//         },
//       },
//     ],
//   };
// };
export const jsonLdSingleMag = ({ mag, commentCount }: { mag: Blog; commentCount: number }) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.example.com/namone-matn-maqala',
    },
    headline: mag?.title,
    alternativeHeadline: mag.title,
    description: mag.short_des,
    image: {
      '@type': 'ImageObject',
      url: `${BASEURL}/${mag?.thumbnailImage.url}`,
      width: mag?.thumbnailImage?.width,
      height: mag?.thumbnailImage?.height,
    },
    author: {
      '@type': 'Person',
      name: 'نام نویسنده',
    },
    editor: {
      '@type': 'Person',
      name: `${mag?.author?.firstName} ${mag?.author?.lastName}`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: logo_image,
        width: 600,
        height: 60,
      },
    },
    datePublished: mag?.createdAt,
    dateModified: mag?.updatedAt,
    articleSection: mag?.category?.title,
    keywords: mag.keyWords,
    wordCount: mag?.description?.length,
    commentCount: commentCount,
    // "interactionStatistic": {
    //   "@type": "InteractionCounter",
    //   "interactionType": { "@type": "CommentAction" },
    //   "userInteractionCount": 12
    // },
    url: `${BASEURL_SITE}/${mag.url}`,
    isAccessibleForFree: 'True',
  };
};
export const jsonLdSingleMagBreadcramp = ({
  breadcrumbPath,
}: {
  breadcrumbPath: { id: string; order: number; title: string; url: string }[];
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbPath.map((item, idx) => {
      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: item.title,
        item: `${BASEURL_SITE}/${item.url}`,
      };
    }),

    //   {
    //     '@type': 'ListItem',
    //     position: 1,
    //     name: 'خانه',
    //     item: 'https://www.example.com/',
    //   },
    //   {
    //     '@type': 'ListItem',
    //     position: 2,
    //     name: 'دسته‌بندی مقاله‌ها',
    //     item: 'https://www.example.com/category/articles',
    //   },
    //   {
    //     '@type': 'ListItem',
    //     position: 3,
    //     name: 'تکنولوژی',
    //     item: 'https://www.example.com/category/articles/technology',
    //   },
    //   {
    //     '@type': 'ListItem',
    //     position: 4,
    //     name: 'عنوان مقاله‌ی فعلی',
    //     item: 'https://www.example.com/category/articles/technology/current-article',
    //   },
    // ],
  };
};
export const getmetadatSingleMag = async ({ id }: { id: string }) => {
  const result = await safeRequest({ url: `/blog/detail/${decodeURIComponent(id)}` });
  const blog: Blog = result?.data?.data.blog;

  if (blog?.redirectType === 302) redirect(blog.redirecturl);
  if (blog?.redirectType === 301) permanentRedirect(blog.redirecturl);
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
      // @ts-expect-error error
      robots: getRobotsMeta(blog?.robots),
      alternates: {
        canonical: blog?.canonicalurl ? blog.canonicalurl : `${BASEURL_SITE}/${blog.url}/`,
      },
      openGraph: {
        // required for Torob
        images: [
          {
            url: `${BASEURL}/${blog?.thumbnailImage?.url}`,
            secureUrl: `${BASEURL}/${blog?.thumbnailImage?.url}`,
            width: blog?.thumbnailImage.width,
            height: blog.thumbnailImage.height,
            alt: blog?.thumbnailImage?.url ? blog?.thumbnailImage?.url : blog.title,
            type: `image/jpeg`,
          },
        ],
        title: blog?.metaTitle ? blog.metaTitle : blog.title,
        description: blog.metaDescription ? blog.metaDescription : sentences,
        locale: 'fa_IR',
        siteName: SITE_NAME,
        countryName: 'Iran',
        type: 'article',
        url: `${BASEURL_SITE}/${blog.url}/`,
      },
      twitter: {
        card: `summary_large_image`,
        title: blog.metaTitle ? blog.metaTitle : blog.title,
        description: blog.metaDescription ? blog.metaDescription : sentences,
        image: `${BASEURL}/${blog?.thumbnailImage?.url}`,
      },
      other: {
        'article:section': blog?.category?.title,
        'article:published_time': blog?.updatedAt,
        'article:modified_time': blog?.updatedAt,
        'twitter:label1': `نویسنده`,
        'twitter:data1': `${blog?.author?.firstName} ${blog?.author?.lastName}`,
        'twitter:label2': `زمان خواندن`,
        'twitter:data2': blog?.readTime,
      },
    };
  } else return {};
};

export const metadatMagPage: Metadata = {
  title: `بلاگ | ${SITE_NAME}`,
  robots: getRobotsMeta(),
  alternates: {
    canonical: `${BASEURL_SITE}/blog/`,
  },
  openGraph: {
    locale: `fa_IR`,
    title: `بلاگ | ${SITE_NAME}`,
    description: `معرفی روش های بازیابی رمز عبور اینستاگرام چگونه پولدار شویم؟ بهترین روش‌ها معرفی بهترین اینستاگرامرهای خارجی مراحل اجرای یک کمپین تبلیغاتی موفق چیست؟ بهترین`,
    url: `${BASEURL_SITE}/blog/`,
    siteName: `${SITE_NAME}`,
    type: 'article',
  },
  twitter: {
    card: `summary_large_image`,
    title: `بلاگ | ${SITE_NAME}`,
    description: `معرفی روش های بازیابی رمز عبور اینستاگرام چگونه پولدار شویم؟ بهترین روش‌ها معرفی بهترین اینستاگرامرهای خارجی مراحل اجرای یک کمپین تبلیغاتی موفق چیست؟ بهترین`,
  },
  other: {
    'twitter:label1': `نویسنده`,
    'twitter:data1': `پشتیبان سایت`,
    'twitter:label2': `زمان خواندن`,
    'twitter:data2': `12 دقیقه`,
  },
};

export const metadatMagPageCategories = ({
  title,
  url,
  hasQueryParams,
}: {
  title: string;
  url: string;
  hasQueryParams: boolean;
}) => {
  return {
    title: `${title} | ${SITE_NAME}`,
    robots: getRobotsMeta(
      // @ts-expect-error error
      hasQueryParams
        ? {
            index: false,
            follow: false,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': '-1',
          }
        : 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
    ),
    alternates: {
      canonical: `${BASEURL_SITE}/category/${url}`,
    },
    openGraph: {
      locale: `fa_IR`,
      type: `article`,
      title: `${title} | ${SITE_NAME}`,
      url: `${BASEURL_SITE}/category${url}/`,
      siteName: `${SITE_NAME}`,
    },
    twitter: {
      card: `summary_large_image`,
      title: `${title} | ${SITE_NAME}`,
      label1: `نوشته‌ها`,
      data1: `18`,
    },
  };
};
