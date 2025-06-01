import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/mag/Filters';
import React from 'react';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const searchParamsFilter = await searchParams;

  return (
    <div>
      <Breadcrumbs breadcrumbs={[]} />
      <div className="mt-10 flex items-start gap-10">
        <Filters
          searchParams={searchParamsFilter}
          resultFilter={{
            breadcrumb: [],
            title: 'دسته بندی بلاگ‌ها',
            properties: [
              {
                title: 'دسته بندی مقالات',
                attributes: [
                  {
                    _id: '1',
                    title: 'الی کست',
                    url: 'dd',
                    color: '#0ABF8C',
                    image: 'ffffffff',
                  },
                  {
                    _id: '2',
                    title: 'آموزش گرامر',
                    url: 'dd',
                    color: '#0ABF8C',
                    image: 'ffffffff',
                  },
                  {
                    _id: '3',
                    title: 'دیکشنری الی انگلیس',
                    url: 'dd',
                    color: '#0ABF8C',
                    image: 'ffffffff',
                  },
                ],
                displayType: 'text',
              },
              {
                title: 'نوع مقالات',
                attributes: [
                  {
                    _id: '1',
                    title: 'متنی',
                    url: 'dd',
                    color: '#0ABF8C',
                    image: 'ffffffff',
                  },
                  {
                    _id: '2',
                    title: 'ویدیویی',
                    url: 'dd',
                    color: '#0ABF8C',
                    image: 'ffffffff',
                  },
                  {
                    _id: '3',
                    title: 'پادکست',
                    url: 'dd',
                    color: '#0ABF8C',
                    image: 'ffffffff',
                  },
                ],
                displayType: 'text',
              },
            ],
            description: '',
            children: [],
          }}
        />
      </div>
    </div>
  );
};

export default Page;
