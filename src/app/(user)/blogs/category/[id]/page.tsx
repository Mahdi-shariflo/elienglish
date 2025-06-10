import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import CardBlog from '@/components/blog/CardBlog';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Blog } from '@/types';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string | undefined }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  const result = await request({ url: `/blog/archive-category?slug=${id}` });
  const blog: { blogs: Blog[]; totalPages: number } = result?.data?.data;
  console.log(blog);
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container_page pt-32">
        <Breadcrumbs breadcrumbs={[]} />
        <div className="flex items-start gap-10 pt-10">
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
          <div className="w-full">
            {blog.blogs.map((blog, idx) => (
              <CardBlog blog={blog} key={idx} />
            ))}
            <Pagination className="mt-10" total={blog?.totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
