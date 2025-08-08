import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Course } from '@/store/types/home';
import CardProduct from '@/components/common/CardProduct';
import Sort from '@/components/common/Sort';
import { buildQueryFromSearchParams } from '@/lib/regexes';
import { BASEURL_SITE } from '@/lib/variable';
import { Metadata } from 'next';
import { getRobotsMeta } from '@/seo/common';
import Script from 'next/script';
import { jsonLdProductBreadcrub } from '@/seo/product';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // read route params
  const searchParamsFilter = await searchParams;
  const hasQueryParams = Object.keys(searchParamsFilter).length > 0;

  return {
    title: 'دوره‌ها',
    description: 'توضیحات دوره ها',
    alternates: {
      canonical: `${BASEURL_SITE}/courses`,
    },
    robots: getRobotsMeta(
      hasQueryParams
        ? {
            index: false,
            follow: false,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': '-1',
          }
        : {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': '-1',
          }
    ),
  };
}

const Page = async ({ searchParams }: Props) => {
  const searchParamsFilter = await searchParams;
  // @ts-expect-error error
  const querySearchParams = buildQueryFromSearchParams(searchParamsFilter);
  const result = await request({ url: `/course/main?${querySearchParams}` });
  const product: {
    course: Course[];
    totalPages: number;
    categories: { title: string; url: string }[];
  } = result?.data?.data;
  const categories = product.categories.map((item, idx) => {
    return {
      _id: idx.toString(),
      title: item.title,
      url: item.url,
      type: '',
      isLink: true,
      page: `/course-category/${item.url}`,
    };
  });

  return (
    <div className="min-h-screen w-full bg-white pb-32 dark:bg-dark">
      <Script
        id="user-layout-layoutwithdefaultmetadata-product-construct"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdProductBreadcrub({
              title: 'دوره ها' as string,
              url: '/courses' as string,
            })
          ),
        }}
      />
      <div className="container_page">
        <Breadcrumbs breadcrumbs={[{ title: 'دوره‌ها', id: '22', url: '#' }]} />
        <div className="flex flex-col items-start gap-0 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title="دسته‌بندی دوره‌ها"
            searchParams={searchParamsFilter}
            resultFilter={{
              breadcrumb: [],
              title: '',
              properties: [
                {
                  title: 'دسته‌بندی‌ها',
                  attributes: categories,
                  displayType: 'text',
                },
                {
                  title: 'وضعیت دوره',
                  attributes: [
                    {
                      _id: '1',
                      title: 'تکمیل شده',
                      url: 'completed',
                      type: 'courseStatus',
                    },
                    {
                      _id: '2',
                      title: 'در حال برگزاری',
                      url: 'inProgress',
                      type: 'courseStatus',
                    },
                  ],
                  displayType: 'text',
                },
              ],
              description: '',
              children: [],
            }}
          />
          <div className="w-full">
            <Sort />
            {Number(product?.course?.length) <= 0 ? (
              <p className="dark:txet-white mt-32 w-full text-center font-medium text-[18px] text-[#505B74] lg:mt-32 lg:text-[18px]">
                محصولی یافت نشد
              </p>
            ) : (
              <>
                <div className="grid w-full gap-4 rounded-lg p-2 dark:bg-[#172334] lg:grid-cols-3 lg:p-10">
                  {product?.course.map((course, idx) => (
                    <CardProduct
                      url={`/course/${course.url}/`}
                      classImage="!object-cover lg:!object-cover"
                      classNameImage="!w-full !h-[350px] lg:!h-[310px] !w-full"
                      className="!h-[550px] w-full !rounded-xl lg:!h-[490px]"
                      product={course}
                      key={idx}
                    >
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span>
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 14 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask id="path-1-inside-1_84_18428" fill="white">
                                <path d="M11.1958 2.44922H3.3397C2.89322 2.44922 2.46503 2.62658 2.14932 2.94229C1.83361 3.258 1.65625 3.68619 1.65625 4.13267V8.62187C1.65625 9.06835 1.83361 9.49654 2.14932 9.81225C2.46503 10.128 2.89322 10.3053 3.3397 10.3053H6.7066V11.4276H4.462C4.31318 11.4276 4.17045 11.4867 4.06521 11.592C3.95997 11.6972 3.90085 11.8399 3.90085 11.9888C3.90085 12.1376 3.95997 12.2803 4.06521 12.3856C4.17045 12.4908 4.31318 12.5499 4.462 12.5499H10.0735C10.2223 12.5499 10.3651 12.4908 10.4703 12.3856C10.5755 12.2803 10.6347 12.1376 10.6347 11.9888C10.6347 11.8399 10.5755 11.6972 10.4703 11.592C10.3651 11.4867 10.2223 11.4276 10.0735 11.4276H7.8289V10.3053H11.1958C11.6423 10.3053 12.0705 10.128 12.3862 9.81225C12.7019 9.49654 12.8793 9.06835 12.8793 8.62187V4.13267C12.8793 3.68619 12.7019 3.258 12.3862 2.94229C12.0705 2.62658 11.6423 2.44922 11.1958 2.44922ZM11.757 8.62187C11.757 8.7707 11.6978 8.91343 11.5926 9.01867C11.4874 9.1239 11.3446 9.18302 11.1958 9.18302H3.3397C3.19087 9.18302 3.04814 9.1239 2.94291 9.01867C2.83767 8.91343 2.77855 8.7707 2.77855 8.62187V4.13267C2.77855 3.98384 2.83767 3.84111 2.94291 3.73588C3.04814 3.63064 3.19087 3.57152 3.3397 3.57152H11.1958C11.3446 3.57152 11.4874 3.63064 11.5926 3.73588C11.6978 3.84111 11.757 3.98384 11.757 4.13267V8.62187Z" />
                              </mask>
                              <path
                                d="M3.3397 2.44922V0.858357V2.44922ZM1.65625 4.13267H0.0653886H1.65625ZM1.65625 8.62187L0.0653886 8.62187L1.65625 8.62187ZM6.7066 10.3053H8.29747V8.71446H6.7066V10.3053ZM6.7066 11.4276V13.0185H8.29747V11.4276H6.7066ZM7.8289 11.4276H6.23804V13.0185H7.8289V11.4276ZM7.8289 10.3053V8.71446H6.23804V10.3053H7.8289ZM11.1958 10.3053V11.8962V10.3053ZM12.8793 8.62187H14.4701H12.8793ZM12.8793 4.13267H14.4701H12.8793ZM3.3397 3.57152V5.16238V3.57152ZM11.1958 2.44922V0.858357H3.3397V2.44922V4.04008H11.1958V2.44922ZM3.3397 2.44922V0.858357C2.4713 0.858357 1.63847 1.20333 1.02441 1.81738L2.14932 2.94229L3.27423 4.0672C3.29159 4.04984 3.31515 4.04008 3.3397 4.04008V2.44922ZM2.14932 2.94229L1.02441 1.81738C0.41036 2.43143 0.0653886 3.26427 0.0653886 4.13267H1.65625H3.24711C3.24711 4.10811 3.25687 4.08456 3.27423 4.0672L2.14932 2.94229ZM1.65625 4.13267H0.0653886V8.62187H1.65625H3.24711V4.13267H1.65625ZM1.65625 8.62187L0.0653886 8.62187C0.0653886 9.49027 0.41036 10.3231 1.02441 10.9372L2.14932 9.81225L3.27423 8.68734C3.25687 8.66998 3.24711 8.64643 3.24711 8.62187H1.65625ZM2.14932 9.81225L1.02441 10.9372C1.63847 11.5512 2.4713 11.8962 3.3397 11.8962V10.3053V8.71446C3.31514 8.71446 3.29159 8.70471 3.27423 8.68734L2.14932 9.81225ZM3.3397 10.3053V11.8962H6.7066V10.3053V8.71446H3.3397V10.3053ZM6.7066 10.3053H5.11574V11.4276H6.7066H8.29747V10.3053H6.7066ZM6.7066 11.4276V9.83676H4.462V11.4276V13.0185H6.7066V11.4276ZM4.462 11.4276V9.83676C3.89126 9.83676 3.34388 10.0635 2.9403 10.4671L4.06521 11.592L5.19012 12.7169C4.99701 12.91 4.7351 13.0185 4.462 13.0185V11.4276ZM4.06521 11.592L2.9403 10.4671C2.53672 10.8707 2.30999 11.418 2.30999 11.9888H3.90085H5.49171C5.49171 12.2619 5.38323 12.5238 5.19012 12.7169L4.06521 11.592ZM3.90085 11.9888H2.30999C2.30999 12.5595 2.53672 13.1069 2.9403 13.5105L4.06521 12.3856L5.19012 11.2607C5.38323 11.4538 5.49171 11.7157 5.49171 11.9888H3.90085ZM4.06521 12.3856L2.9403 13.5105C3.34388 13.9141 3.89126 14.1408 4.462 14.1408V12.5499V10.9591C4.7351 10.9591 4.99701 11.0675 5.19012 11.2607L4.06521 12.3856ZM4.462 12.5499V14.1408H10.0735V12.5499V10.9591H4.462V12.5499ZM10.0735 12.5499V14.1408C10.6443 14.1408 11.1916 13.9141 11.5952 13.5105L10.4703 12.3856L9.34539 11.2607C9.5385 11.0675 9.80042 10.9591 10.0735 10.9591V12.5499ZM10.4703 12.3856L11.5952 13.5105C11.9988 13.1069 12.2255 12.5595 12.2255 11.9888H10.6347H9.0438C9.0438 11.7157 9.15228 11.4538 9.34539 11.2607L10.4703 12.3856ZM10.6347 11.9888H12.2255C12.2255 11.418 11.9988 10.8707 11.5952 10.4671L10.4703 11.592L9.34539 12.7169C9.15228 12.5238 9.0438 12.2619 9.0438 11.9888H10.6347ZM10.4703 11.592L11.5952 10.4671C11.1916 10.0635 10.6443 9.83676 10.0735 9.83676V11.4276V13.0185C9.80042 13.0185 9.5385 12.91 9.34539 12.7169L10.4703 11.592ZM10.0735 11.4276V9.83676H7.8289V11.4276V13.0185H10.0735V11.4276ZM7.8289 11.4276H9.41977V10.3053H7.8289H6.23804V11.4276H7.8289ZM7.8289 10.3053V11.8962H11.1958V10.3053V8.71446H7.8289V10.3053ZM11.1958 10.3053V11.8962C12.0642 11.8962 12.897 11.5512 13.5111 10.9372L12.3862 9.81225L11.2613 8.68734C11.2439 8.70471 11.2204 8.71446 11.1958 8.71446V10.3053ZM12.3862 9.81225L13.5111 10.9372C14.1251 10.3231 14.4701 9.49027 14.4701 8.62187L12.8793 8.62187H11.2884C11.2884 8.64643 11.2786 8.66998 11.2613 8.68734L12.3862 9.81225ZM12.8793 8.62187H14.4701V4.13267H12.8793H11.2884V8.62187H12.8793ZM12.8793 4.13267H14.4701C14.4701 3.26427 14.1251 2.43143 13.5111 1.81738L12.3862 2.94229L11.2613 4.0672C11.2786 4.08456 11.2884 4.10811 11.2884 4.13267H12.8793ZM12.3862 2.94229L13.5111 1.81738C12.897 1.20333 12.0642 0.858357 11.1958 0.858357V2.44922V4.04008C11.2204 4.04008 11.2439 4.04984 11.2613 4.0672L12.3862 2.94229ZM11.757 8.62187H10.1661C10.1661 8.34878 10.2746 8.08687 10.4677 7.89376L11.5926 9.01867L12.7175 10.1436C13.1211 9.73999 13.3478 9.19262 13.3478 8.62187H11.757ZM11.5926 9.01867L10.4677 7.89376C10.6608 7.70065 10.9227 7.59216 11.1958 7.59216V9.18302V10.7739C11.7666 10.7739 12.3139 10.5472 12.7175 10.1436L11.5926 9.01867ZM11.1958 9.18302V7.59216H3.3397V9.18302V10.7739H11.1958V9.18302ZM3.3397 9.18302V7.59216C3.6128 7.59216 3.87471 7.70065 4.06782 7.89376L2.94291 9.01867L1.818 10.1436C2.22158 10.5472 2.76895 10.7739 3.3397 10.7739V9.18302ZM2.94291 9.01867L4.06782 7.89376C4.26092 8.08686 4.36941 8.34877 4.36941 8.62187H2.77855H1.18769C1.18769 9.19262 1.41442 9.73999 1.818 10.1436L2.94291 9.01867ZM2.77855 8.62187H4.36941V4.13267H2.77855H1.18769V8.62187H2.77855ZM2.77855 4.13267H4.36941C4.36941 4.40577 4.26092 4.66768 4.06782 4.86079L2.94291 3.73588L1.818 2.61097C1.41442 3.01455 1.18769 3.56192 1.18769 4.13267H2.77855ZM2.94291 3.73588L4.06782 4.86079C3.87471 5.05389 3.6128 5.16238 3.3397 5.16238V3.57152V1.98066C2.76895 1.98066 2.22158 2.20739 1.818 2.61097L2.94291 3.73588ZM3.3397 3.57152V5.16238H11.1958V3.57152V1.98066H3.3397V3.57152ZM11.1958 3.57152V5.16238C10.9227 5.16238 10.6608 5.05389 10.4677 4.86079L11.5926 3.73588L12.7175 2.61097C12.3139 2.20739 11.7666 1.98066 11.1958 1.98066V3.57152ZM11.5926 3.73588L10.4677 4.86079C10.2746 4.66768 10.1661 4.40576 10.1661 4.13267H11.757H13.3478C13.3478 3.56192 13.1211 3.01455 12.7175 2.61097L11.5926 3.73588ZM11.757 4.13267H10.1661V8.62187H11.757H13.3478V4.13267H11.757Z"
                                fill="#6A7890"
                                mask="url(#path-1-inside-1_84_18428)"
                              />
                            </svg>
                          </span>
                          <span className="font-regular text-[12px] text-[#6A7890]">
                            {course.type === 'inPerson' ? 'حضوری' : 'آنلاین'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>
                            <svg
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6654 7.88527V8.49861C14.6645 9.93622 14.199 11.3351 13.3383 12.4865C12.4775 13.6379 11.2676 14.4803 9.88894 14.8879C8.51032 15.2955 7.03687 15.2465 5.68834 14.7483C4.33982 14.2501 3.18847 13.3293 2.406 12.1233C1.62354 10.9173 1.25189 9.49065 1.34648 8.05615C1.44107 6.62165 1.99684 5.25616 2.93088 4.16332C3.86493 3.07049 5.12722 2.30886 6.52949 1.99204C7.93176 1.67521 9.39888 1.82017 10.712 2.40527"
                                stroke="#6A7890"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M14.6667 3.16797L8 9.8413L6 7.8413"
                                stroke="#6A7890"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="font-regular text-[12px] text-[#6A7890]">
                            {course.status === 'inProgress' ? 'در حال برگزاری' : 'تکمیل شده'}
                          </span>
                        </div>
                      </div>
                    </CardProduct>
                  ))}
                </div>
                <Pagination className="mt-10" total={product?.totalPages} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
