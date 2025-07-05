import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import CardPlp from '@/components/plp/CardPlp';
import { request } from '@/lib/safeClient';
import { Lpa } from '@/types';
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

const Page = async ({ searchParams }: Props) => {
  const searchParamsFilter = await searchParams;
  const data = await request({
    url: `/lpa/archive?${searchParamsFilter.weekday ? `weekday=${searchParamsFilter?.weekday}` : ''}`,
  });
  const lpa: { lpa: Lpa[] } = data?.data?.data;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs breadcrumbs={[{ id: '444', title: 'تعین سطح', url: '#' }]} />
        <div className="flex flex-col items-start gap-10 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title="تعین سطح"
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
              ],
              description: '',
              children: [],
            }}
          />
          <div className="grid w-full gap-4 rounded-lg p-3 px-3 lg:grid-cols-3 4xl:grid-cols-4">
            {lpa?.lpa.map((item, idx) => <CardPlp key={idx} lpa={item} />)}

            {/* <Pagination className="mt-10" total={blog?.totalPages} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
