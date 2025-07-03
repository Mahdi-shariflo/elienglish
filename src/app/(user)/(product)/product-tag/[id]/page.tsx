import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Product } from '@/types/home';
import CardProduct from '@/components/common/CardProduct';
import Sort from '@/components/common/Sort';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  const result = await request({ url: `/course/archive-category?slug=${id}` });
  const product: {
    products: Product[];
    totalPages: number;
    categories: { title: string; url: string }[];
  } = result?.data?.data;
  console.log(product);
  const categories = product.categories.map((item, idx) => {
    return {
      _id: idx.toString(),
      title: item.title,
      url: item.url,
      type: '',
      isLink: true,
      page: `/product-category/${item.url}`,
    };
  });
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs breadcrumbs={[]} />
        <div className="flex flex-col items-start gap-10 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title="دسته‌بندی محصولات"
            searchParams={searchParamsFilter}
            resultFilter={{
              breadcrumb: [],
              title: 'دسته بندی محصولات',
              properties: [
                {
                  title: 'دسته‌بندی‌ها',
                  attributes: categories,
                  displayType: 'text',
                },
                {
                  title: 'نوع محصول',
                  attributes: [
                    {
                      _id: '1',
                      title: 'فیزیکی',
                      url: 'dd',
                      type: '',
                    },
                    {
                      _id: '2',
                      title: 'دیجیتال',
                      url: 'dd',
                      type: '',
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
            <Sort />
            <div className="grid w-full gap-4 rounded-lg dark:bg-[#172334] lg:grid-cols-3 5xl:grid-cols-5">
              {product?.products.map((product, idx) => (
                <CardProduct
                  url={`/product/${product.url}/`}
                  classNameImage="mt-5 px-2"
                  className="!h-[400px] w-full"
                  product={product}
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
