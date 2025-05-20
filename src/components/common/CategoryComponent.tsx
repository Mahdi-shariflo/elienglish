'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Button from '@/components/common/Button';
import CardProduct from '@/components/common/CardProduct';
import EmptyCategory from '@/components/common/category/EmptyCategory';
import Filters from '@/components/common/category/Filters';
import Sort from '@/components/common/category/Sort';
import SubCategory from '@/components/common/category/SubCategory';
import { Arrow_back_mobile } from '@/components/common/icon';
import Loading from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import useGlobalStore from '@/store/global-store';
import { FilterCategory } from '@/types';
import { Product } from '@/types/home';
import React, { useState } from 'react';
type Props = {
  id: string;
  title?: string;
  urlBredcrumb?: string;
  resultFilter?: FilterCategory;
  resultProucts: {
    maxProductPrice?: number;
    minProductPrice?: number;
    totalPages: number;
    products: Product[];
  };
  searchParams: {
    attribiutes?: string;
    available?: string;
    discounted?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  };
};
const CategoryComponent = ({
  resultFilter,
  resultProucts,
  searchParams,
  id,
  title,
  urlBredcrumb = '/product-category',
}: Props) => {
  const { isPendingCategory } = useGlobalStore();
  const [open, setOpen] = useState(false);
  const cleanDescription =
    typeof resultFilter?.description === 'string'
      ? resultFilter?.description
          ?.replace(/\[caption.*?](.*?)\[\/caption\]/g, '$1') // حذف فقط تگ‌های [caption] و نگه داشتن محتوای داخل آن
          ?.replace(/id="attachment_\d+"/g, '') // حذف idهای attachment
          ?.replace(/align=".*?"/g, '') // حذف ویژگی align
          ?.replace(/width=".*?"/g, '') // حذف ویژگی width
          ?.replace(/height=".*?"/g, '')
      : ''; // حذف ویژگی height

  const sortedBreadcrumb = Array.isArray(resultFilter?.breadcrumb)
    ? resultFilter?.breadcrumb.sort((a, b) => {
        if (a.order === null) return -1;
        if (b.order === null) return 1;
        return a.order - b.order;
      })
    : [];
  return (
    <div className="pt-28 lg:pt-4">
      {/* <BackPrevPage title={title ? title : resultFilter?.title ?? "محصولات"} /> */}

      <div className="container_page mt-14 lg:mt-0">
        {Array.isArray(resultFilter?.breadcrumb) && (
          <Breadcrumbs
            className="mb-6"
            page={urlBredcrumb}
            breadcrumbs={[
              ...sortedBreadcrumb,
              {
                id: '1',
                title: title ? title : resultFilter?.title,
                url: null,
              },
            ]}
          />
        )}
        {/* title */}
        <h1 className="mt-[24px] hidden font-medium text-[14px] text-[#232429] lg:block lg:text-[24px]">
          {resultFilter?.title}
        </h1>
        {Array.isArray(resultFilter?.children) && (
          <SubCategory categories={resultFilter?.children} />
        )}

        <div className="flex flex-col items-start gap-[24px] lg:mt-10 lg:flex-row">
          <Filters
            // @ts-expect-error
            resultFilter={{
              ...resultFilter,
              maxProductPrice: resultProucts?.maxProductPrice,
              minProductPrice: resultProucts?.minProductPrice,
            }}
            searchParams={searchParams}
          />
          <div className="flex-1">
            <Sort searchParams={searchParams} />

            <>
              {resultProucts?.products?.length >= 1 ? (
                <div className="grid grid-cols-2 gap-4 lg:mt-3 lg:grid-cols-3">
                  {resultProucts?.products?.map((product, idx) => (
                    <CardProduct
                      className="!h-[190px] lg:!h-[350px]"
                      showTotalProduct={
                        id === 'perfume-cologne' || id === 'electrical-appliances' ? false : true
                      }
                      product={product}
                      key={idx}
                    />
                  ))}
                </div>
              ) : (
                <EmptyCategory />
              )}
            </>
            {isPendingCategory ? <Loading /> : null}
            <Pagination total={resultProucts?.totalPages} className="mt-10" />
          </div>
        </div>
      </div>

      {cleanDescription && (
        <>
          <div
            className={`container_des_category container_page mt-10 overflow-hidden border-t border-[#E4E7E9] py-5 font-regular leading-8 ${
              open ? '' : 'h-[230px]'
            }`}
            dangerouslySetInnerHTML={{ __html: cleanDescription! }}
          ></div>
          <span className="container_page flex justify-end border-b border-[#E4E7E9]">
            <Button onClick={() => setOpen(!open)} className="w-fit min-w-fit text-main">
              <Arrow_back_mobile className="h-4 w-4 rotate-90 stroke-main" />
              <span>{open ? 'مشاهده کمتر' : 'مشاهده بیشتر'}</span>
            </Button>
          </span>
        </>
      )}
    </div>
  );
};

export default CategoryComponent;
