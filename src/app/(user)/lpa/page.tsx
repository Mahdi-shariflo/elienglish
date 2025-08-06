import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import CardPlp from '@/components/lpa/CardLpa';
import { request } from '@/lib/safeClient';
import { Lpa } from '@/store/types';
import SelectedFilterLpa from '@/components/lpa/SelectedFilterLpa';
import Pagination from '@/components/common/Pagination';
import { BASEURL_SITE } from '@/lib/variable';
import { getRobotsMeta } from '@/seo/common';
import { Metadata } from 'next';
import Script from 'next/script';
import { jsonLdProductBreadcrub } from '@/seo/product';
import { buildQueryFromSearchParams } from '@/lib/regexes';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const days = [
  { title: 'شنبه', url: 'SATURDAY', _id: '1', type: 'weekday' },
  { title: 'یک‌شنبه', url: 'SUNDAY', _id: '2', type: 'weekday' },
  { title: 'دوشنبه', url: 'MONDAY', _id: '3', type: 'weekday' },
  { title: 'سه‌شنبه', url: 'TUESDAY', _id: '4', type: 'weekday' },
  { title: 'چهارشنبه', url: 'WEDNESDAY', _id: '5', type: 'weekday' },
  { title: 'پنج‌شنبه', url: 'THURSDAY', _id: '6', type: 'weekday' },
  { title: 'جمعه', url: 'FRIDAY', _id: '7', type: 'weekday' },
];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // read route params
  const searchParamsFilter = await searchParams;
  const hasQueryParams = Object.keys(searchParamsFilter).length > 0;

  return {
    title: 'تعیین سطح',
    description: 'توضیحات سطح',
    alternates: {
      canonical: `${BASEURL_SITE}/lpa`,
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
  const data = await request({
    url: `/lpa/archive?${querySearchParams}`,
  });
  const lpa: { lpa: Lpa[]; totalPages: number } = data?.data?.data;
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark">
      <Script
        id="user-layout-layoutwithdefaultmetadata-product-construct"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdProductBreadcrub({
              title: 'تعین سطح' as string,
              url: '/lpa' as string,
            })
          ),
        }}
      />
      <div className="container_page">
        <Breadcrumbs page="/lpa" breadcrumbs={[{ id: '444', title: 'تعیین سطح', url: '' }]} />
        <div className="flex flex-col items-start gap-0 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title="تعیین سطح"
            searchParams={searchParamsFilter}
            resultFilter={{
              breadcrumb: [],
              title: 'دسته بندی بلاگ‌ها',
              properties: [
                {
                  title: 'انتخاب روز',
                  attributes: days,
                  displayType: 'text',
                },
                {
                  title: 'وضعیت تعین سطح',
                  displayType: 'text',
                  attributes: [
                    {
                      _id: '1',
                      title: 'رزرو شده',
                      type: 'lpaStatus',
                      url: 'RESERVED',
                    },
                    {
                      _id: '1',
                      title: 'قابل رزرو',
                      type: 'lpaStatus',
                      url: 'AVAILABLE',
                    },
                  ],
                },
              ],
              description: '',
              children: [],
            }}
          />
          <div className="w-full">
            <SelectedFilterLpa />
            {lpa?.lpa.length >= 1 ? (
              <>
                <div className="mt-5 grid w-full gap-4 rounded-lg lg:!grid-cols-2 lg:p-3">
                  {lpa?.lpa.map((item, idx) => <CardPlp key={idx} lpa={item} />)}
                </div>
                {lpa?.lpa?.length >= 1 && (
                  <Pagination
                    className="mt-10 flex items-center justify-center"
                    total={lpa?.totalPages}
                  />
                )}
              </>
            ) : (
              <p className="dark:txet-white mt-32 w-full text-center font-medium text-[18px] text-[#505B74] lg:mt-32 lg:text-[18px]">
                یافت نشد
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
