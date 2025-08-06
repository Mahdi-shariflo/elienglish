import { safeRequest } from '@/lib/safeClient';
import { BASEURL, BASEURL_SITE, SITE_NAME } from '@/lib/variable';
import { htmlToText } from 'html-to-text';
import { permanentRedirect, redirect } from 'next/navigation';
import { getRobotsMeta } from './common';

export const getCourse = async (id: string) => {
  try {
    const data = await safeRequest({
      url: `/course/detail/${decodeURIComponent(id)}`,
      method: 'GET',
    });
    return {
      course: data?.data?.data?.course,
    };
  } catch (error) {
    return {
      breadcrumb: [],
      course: null,
    };
  }
};

export const generate_metadata_course = async ({
  id,
  hasQueryParams,
}: {
  id: string;
  hasQueryParams: boolean;
}) => {
  const courseData = await getCourse(id);
  const course = courseData?.course || {};

  if (course?.redirectType === 302) redirect(course.redirecturl);
  if (course?.redirectType === 301) permanentRedirect(course.redirecturl);

  if (course) {
    const fullHtml = course?.description;

    const textContent = htmlToText(fullHtml, {
      wordwrap: 130,
    });
    // تقسیم متن به جملات و انتخاب چند جمله اول
    const sentences = textContent.slice(0, 168); // برای نمایش ۲ جمله اول
    return {
      other: {
        'twitter:label1': 'قیمت',
        'twitter:data1': `${Number(course.price)} تومان`,
        'twitter:label2': 'دسترسی',
        'twitter:data2': course.count === 0 ? 'ناموجود' : 'موجود',
        'og:url': `${BASEURL_SITE}/course/${course.url}`,
        'course:retailer_item_id': course._id,
        'og:updated_time': course.updatedAt,
        'og:image:secure_url': `${BASEURL}/${course.thumbnailImage.url}`,
        'og:image:alt': course?.thumbnailImage?.alt,
        'og:image:type': 'image/png',
        'course:price:currency': 'IRT',
        'og:image:width': '370',
        'og:image:height': '390',
        course_id: course._id,
        course_price: course.discountPrice,
        course_old_price: course.price,
        course_name: course.title,
        availability: course.count === 0 ? 'outofstock' : 'instock',
      },
      title: course?.metaTitle ? course.metaTitle : course.title,
      description: course.metaDescription ? course.metaDescription : sentences,
      twitter: {
        title: course?.metaTitle ? course.metaTitle : course.title,
        description: course.metaDescription ? course.metaDescription : sentences,
        label1: 'قیمت',
        data1: course.discountPrice ? course.discountPrice : course.price,
        label2: 'دسترسی',
        data2: course.count === 0 ? 'ناموجود' : 'موجود',
      },
      openGraph: {
        // required for Torob
        images: [`${BASEURL}/${course?.thumbnailImage?.url}`],
        title: course?.metaTitle ? course.metaTitle : course.title,
        description: course.metaDescription ? course.metaDescription : sentences,
        locale: 'fa_IR',
        siteName: SITE_NAME,
        countryName: 'Iran',
      },

      alternates: {
        canonical: course.canonicalurl
          ? course.canonicalurl
          : `${BASEURL_SITE}/course/${course.url}`,
      },
      keywords: course.keyWords?.join(','),
      robots: getRobotsMeta(
        hasQueryParams
          ? {
              index: false,
              follow: false,
              'max-image-preview': 'large',
              'max-snippet': -1,
              'max-video-preview': '-1',
            }
          : course?.robots
      ),
    };
  } else {
    return {
      title: 'محصول',
    };
  }
};
