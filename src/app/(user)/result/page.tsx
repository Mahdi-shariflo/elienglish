import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import { request } from '@/lib/safeClient';
import SelectedFilterBlog from '@/components/blog/SelectedFilterBlog';
import { buildQueryFromSearchParams } from '@/lib/regexes';
import Image from '@/components/common/Image';
import { Product } from '@/store/types/home';
import { discountCalculation } from '@/lib/utils';
import { Toman_Icon } from '@/components/common/icon';
import Pagination from '@/components/common/Pagination';
import { Metadata } from 'next';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // read route params
  const searchParamsFilter = await searchParams;

  return {
    title: `سرچ ${searchParamsFilter?.search}`,
    description: 'توضیحات',

    robots: {
      index: false,
      follow: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': '-1',
    },
  };
}

const Page = async ({ searchParams, params }: Props) => {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  // @ts-expect-error error
  const querySearchParams = buildQueryFromSearchParams(searchParamsFilter);
  const result = await request({
    url: `/search/result?${querySearchParams}`,
  });
  const data: { archive: Product[]; totalPages: number } = result?.data?.data;
  return (
    <div className="min-h-[50vh] w-full bg-white dark:bg-dark lg:mt-14 lg:min-h-screen">
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
            {Number(data?.archive?.length) <= 0 ? (
              <p className="dark:txet-white mt-32 w-full text-center font-medium text-[18px] text-[#505B74] lg:mt-32 lg:text-[18px]">
                نتیجه ای یافت نشد
              </p>
            ) : (
              <div className="flex w-full flex-col gap-4 rounded-lg lg:p-5 dark:lg:bg-[#172334]">
                {data?.archive?.map((item, idx: number) => (
                  <div
                    className="flex h-[117px] items-center justify-between rounded-lg border-b border-[#E5EAEF] pb-3 dark:border-[#263248]"
                    key={idx}
                  >
                    <div className="flex items-center gap-5">
                      <Image
                        className="h-[100px] w-[190px] overflow-hidden rounded-lg"
                        alt=""
                        classImg="!object-contain overflow-hidden rounded-xl"
                        src={item.thumbnailImage.url}
                      />
                      <div className="space-y-4">
                        <span className="flex h-[28px] w-fit items-center justify-center rounded bg-[#EDE8FC] px-2 font-medium text-[14px] text-main">
                          {item.itemType === 'blog'
                            ? 'بلاگ'
                            : item.itemType === 'course'
                              ? 'دوره'
                              : 'محصول'}
                        </span>
                        <p className="line-clamp-2 font-medium text-lg text-black dark:text-white lg:text-xl">
                          {item.title}
                        </p>
                      </div>
                    </div>
                    <div>
                      {item.discountPrice ? (
                        <div className="flex flex-col items-end gap-2">
                          {item.discountPrice && (
                            <>
                              <span className="flex h-[20px] w-[39px] items-center justify-center rounded-full border-2 border-[#FCEDE8] bg-[#F44336] pt-px font-medium text-[10px] text-white lg:static lg:h-[32px] lg:w-[54px] lg:text-[12px]">
                                {discountCalculation(item.discountPrice, item.price)}%
                              </span>
                              <p className="mt-3 font-regular text-[14px] text-[#8E98A8] line-through">
                                {Number(item?.price).toLocaleString()}
                              </p>
                            </>
                          )}
                        </div>
                      ) : null}
                      {item.price && (
                        <div className="flex items-center gap-1">
                          <p className="font-demibold text-[16px] dark:text-white">
                            {item.discountPrice
                              ? Number(item.discountPrice).toLocaleString()
                              : Number(item.price).toLocaleString()}
                          </p>
                          <Toman_Icon />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Pagination className="mt-10" total={data?.totalPages} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
