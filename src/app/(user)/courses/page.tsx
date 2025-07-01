import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Corurse, Product } from '@/types/home';
import CardProduct from '@/components/common/CardProduct';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const searchParamsFilter = await searchParams;
  const result = await request({ url: `/course/main` });
  const product: {
    course: Product[];
    totalPages: number;
  } = result?.data?.data;
  console.log(product);
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs breadcrumbs={[]} />
        <div className="flex flex-col items-start gap-10 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title="دسته‌بندی دوره‌ها"
            searchParams={searchParamsFilter}
            resultFilter={{
              breadcrumb: [],
              title: 'دسته بندی دوره‌ها',
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
          <div className="w-full">
            <div className="grid w-full grid-cols-3 gap-4 rounded-lg px-3 dark:bg-[#172334] 2xl:grid-cols-4">
              {product?.course.map((course, idx) => (
                <CardProduct
                  url={`/course/${course.url}/`}
                  classImage="!object-fill"
                  classNameImage="!w-full"
                  className="!h-[400px] w-full"
                  product={course}
                  key={idx}
                />
              ))}
            </div>
            <Pagination className="mt-10" total={product?.totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
