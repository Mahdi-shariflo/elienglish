import Breadcrumbs from '@/components/common/Breadcrumbs';
import Filters from '@/components/blog/Filters';
import React from 'react';
import Pagination from '@/components/common/Pagination';
import { request } from '@/lib/safeClient';
import { Product } from '@/store/types/home';
import CardProduct from '@/components/common/CardProduct';
import Sort from '@/components/common/Sort';
import SelectedFilterProduct from '@/components/product/SelectedFilterProduct';
import { buildQueryFromSearchParams } from '@/lib/regexes';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ [key: string]: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  // @ts-expect-error error
  const querySearchParams = buildQueryFromSearchParams(searchParamsFilter);
  const result = await request({
    url: `/product/archive-tag?slug=${id}&${querySearchParams}`,
  });
  const product: {
    products: Product[];
    totalPages: number;
    categories: { title: string; url: string }[];
  } = result?.data?.data;
  const categories = product.categories.map((item, idx) => {
    return {
      _id: idx.toString(),
      title: item.title,
      url: item.url,
      type: 'productTypeCategory',
      isLink: true,
      page: `/product-category/${item.url}`,
    };
  });
  return (
    <div className="min-h-screen w-full bg-white dark:bg-dark">
      <div className="container_page">
        <Breadcrumbs breadcrumbs={[]} />
        <div className="flex flex-col items-start gap-0 pt-3 lg:flex-row lg:gap-10 lg:pt-10">
          <Filters
            title="دسته‌بندی محصولات"
            // @ts-expect-error error
            searchParams={{ ...searchParamsFilter, productTypeCategory: decodeURIComponent(id) }}
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
                      url: 'physical',
                      type: 'productType',
                    },
                    {
                      _id: '2',
                      title: 'دیجیتال',
                      url: 'digital',
                      type: 'productType',
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
            <SelectedFilterProduct />
            <div className="mt-5 w-full">
              {Number(product?.products?.length) <= 0 ? (
                <p className="dark:txet-white mt-32 w-full text-center font-medium text-[18px] text-[#505B74] lg:mt-32 lg:text-[18px]">
                  محصولی یافت نشد
                </p>
              ) : (
                <>
                  <Sort />
                  <div className="grid w-full gap-4 rounded-lg lg:grid-cols-3 lg:p-5 dark:lg:bg-[#172334]">
                    {product?.products?.map((product, idx) => (
                      <CardProduct
                        url={`/product/${product.url}/`}
                        classImage="!object-contain "
                        classNameImage="mt-5 px-2 w-full !h-[260px] lg:!h-[220px]"
                        className="!h-[400px] w-full dark:bg-[#172334] lg:!h-[400px] dark:lg:bg-transparent"
                        product={product}
                        key={idx}
                      />
                    ))}
                  </div>
                  {product?.products?.length >= 1 && (
                    <Pagination className="mt-10" total={product?.totalPages} />
                  )}
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
