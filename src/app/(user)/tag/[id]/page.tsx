import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import CardBlog from '@/components/blog/CardBlog';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Blog } from '@/types';
import SelectedFilterBlog from '@/components/blog/SelectedFilterBlog';
import Sort from '@/components/common/Sort';
import { metadatMagPageCategories } from '@/seo/mag';
import { Metadata } from 'next';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  const hasQueryParams: boolean = Object.keys(searchParamsFilter).length > 0;

  const result = await request({ url: `/blog/archive-tag?slug=${id}` });
  const blog: { blogs: Blog[]; totalPages: number } = result?.data?.data;
  return metadatMagPageCategories({
    url: id!,
    title: Array.isArray(blog.blogs) ? blog.blogs[0].category.title : '',
    hasQueryParams,
  });
}

const Page = async ({ searchParams, params }: Props) => {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  const result = await request({
    url: `/blog/archive-tag?slug=${id}&sort=${searchParamsFilter.sort ?? 'createdAt_desc'}&${searchParamsFilter?.blogType ? `blogType=${searchParamsFilter?.blogType}` : ''}`,
  });
  const blog: { blogs: Blog[]; totalPages: number } = result?.data?.data;
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark">
      {/* <script
        id="jsonld_mag"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCategoryMag(blog)) }}
      /> */}
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs
          page={`/category/${decodeURIComponent(id!)}`}
          breadcrumbs={[
            {
              id: '1234',
              title: decodeURIComponent(
                Array.isArray(blog.blogs) && blog.blogs.length >= 1
                  ? blog.blogs[0].category.title
                  : 'مقاله'
              ),
              url: '#',
            },
          ]}
        />
        <div className="flex flex-col items-start gap-10 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title="برچسب بلاگ‌ها"
            searchParams={searchParamsFilter}
            resultFilter={{
              breadcrumb: [],
              title: 'دسته بندی بلاگ‌ها',
              properties: [
                {
                  title: 'نوع مقالات',
                  attributes: [
                    {
                      _id: '1',
                      title: 'متنی',
                      url: 'text',
                      type: 'blogType',
                    },
                    {
                      _id: '2',
                      title: 'ویدیویی',
                      url: 'video',
                      type: 'blogType',
                    },
                    {
                      _id: '3',
                      title: 'پادکست',
                      url: 'poddcast',
                      type: 'blogType',
                    },
                  ],
                  displayType: 'text',
                },
              ],
              description: '',
              children: [],
            }}
          />
          <div className="flex-1">
            <SelectedFilterBlog />
            <div className="mt-5">
              {Number(blog.blogs.length) <= 0 ? (
                <p className="dark:txet-white mt-10 text-center font-medium text-[14px] text-[#505B74] lg:mt-32 lg:text-[18px]">
                  مقاله‌ای یافت نشد
                </p>
              ) : (
                <>
                  <Sort />
                  <div className="mt-2 w-full rounded-lg px-3 dark:bg-[#263248]">
                    {blog.blogs.map((blog, idx) => (
                      <CardBlog blog={blog} key={idx} />
                    ))}
                    <Pagination className="mt-10" total={blog?.totalPages} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
