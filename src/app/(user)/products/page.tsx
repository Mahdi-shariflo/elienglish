import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import CardBlog from '@/components/blog/CardBlog';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Blog } from '@/types';
import { Product } from '@/types/home';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const searchParamsFilter = await searchParams;
  const result = await request({ url: `/product/main` });
  // const product: { blogs: Product[]; totalPages: number } = result?.data?.data;
  console.log(result);
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs breadcrumbs={[]} />
        <div className="flex flex-col items-start gap-10 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
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
          <div className="w-full rounded-lg px-3 dark:bg-[#172334]">
            {/* {product.blogs.map((blog, idx) => (
              <CardBlog blog={blog} key={idx} />
            ))}
            <Pagination className="mt-10" total={blog?.totalPages} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
