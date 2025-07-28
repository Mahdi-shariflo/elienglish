import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import CardBlog from '@/components/blog/CardBlog';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Blog } from '@/types';
import SelectedFilterBlog from '@/components/blog/SelectedFilterBlog';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string | undefined }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  const result = await request({ url: `/blog/archive-category?slug=${id}` });
  const blog: { blogs: Blog[]; totalPages: number } = result?.data?.data;
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs breadcrumbs={[]} />
        <div className="flex flex-col items-start gap-10 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title="دسته‌بندی وبلاگ‌ها"
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
                      url: 'dd',
                      type: 'text',
                    },
                    {
                      _id: '2',
                      title: 'ویدیویی',
                      url: 'dd',
                      type: 'video',
                    },
                    {
                      _id: '3',
                      title: 'پادکست',
                      url: 'dd',
                      type: 'padcast',
                    },
                  ],
                  displayType: 'text',
                },
              ],
              description: '',
              children: [],
            }}
          />
          <div>
            <SelectedFilterBlog />
            <div className="mt-5 w-full rounded-lg px-3 dark:bg-[#172334]">
              {blog.blogs.map((blog, idx) => (
                <CardBlog blog={blog} key={idx} />
              ))}
              <Pagination className="mt-10" total={blog?.totalPages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
