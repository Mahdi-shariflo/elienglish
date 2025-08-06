import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import CardBlog from '@/components/blog/CardBlog';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Blog } from '@/store/types';
import SelectedFilterBlog from '@/components/blog/SelectedFilterBlog';
import Sort from '@/components/common/Sort';
import { metadatMagPageCategories } from '@/seo/mag';
import { Metadata } from 'next';
import { buildQueryFromSearchParams } from '@/lib/regexes';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string | undefined }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  // @ts-expect-error error
  const querySearchParams = buildQueryFromSearchParams(searchParamsFilter);
  const result = await request({
    url: `/search/result?${querySearchParams}`,
  });
  return (
    <div className="mt-14 min-h-[50vh] w-full bg-white dark:bg-dark lg:min-h-screen">
      <div className="container_page">
        <Breadcrumbs page={`/category/${decodeURIComponent(id!)}`} breadcrumbs={[]} />
        <div className="flex flex-col items-start lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title={`شما  “ ${searchParamsFilter?.search} “  را جستجو کردید`}
            searchParams={searchParamsFilter}
            resultFilter={{
              breadcrumb: [],
              title: `شما  “ ${searchParamsFilter?.search} “  را جستجو کردید`,
              properties: [
                {
                  title: 'نوع جستجو',
                  attributes: [
                    {
                      _id: '1',
                      title: 'همه',
                      url: 'ALL',
                      type: 'searchItemType',
                    },
                    {
                      _id: '2',
                      title: 'محصول',
                      url: 'PRODUCT',
                      type: 'searchItemType',
                    },
                    {
                      _id: '3',
                      title: 'دوره',
                      url: 'COURSE',
                      type: 'searchItemType',
                    },
                    {
                      _id: '3',
                      title: 'بلاگ',
                      url: 'BLOG',
                      type: 'searchItemType',
                    },
                  ],
                  displayType: 'text',
                },
              ],
              description: '',
              children: [],
            }}
          />
          <div className="w-full flex-1">
            <SelectedFilterBlog />
            <div className="mt-5 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
