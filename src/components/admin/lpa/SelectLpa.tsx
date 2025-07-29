'use client';
import { useGetProductsAdmin } from '@/hooks/admin/products/useGetProductsAdmin';
import { BASEURL } from '@/lib/variable';
import { Product } from '@/store/types/home';
import { Spinner } from '@heroui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PiEye } from 'react-icons/pi';
import Select from 'react-select';
import BaseDialog from '../../common/BaseDialog';
import ReactTable from '../common/ReactTable';
import { initialDataProducts } from '@/lib/table-column';
import Button from '../../common/Button';
import { useGetLpaAdmin } from '@/hooks/admin/lpa/useGetLpaAdmin';

type Props = {
  values: Product[];
  onChange: (value: Product) => void;
  title?: string;
  className?: string;
};
export default function SelectLpa({ values, onChange, title, className }: Props) {
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(values);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { isLoading, isSuccess, isFetching, data, isPending } = useGetLpaAdmin({
    page: page.toString(),
    search,
    sort: 'createdAt_desc',
  });

  useEffect(() => {
    if (isSuccess) {
      const products = data?.data?.data.lpa;
      setOptions((prevOptions) => [...prevOptions, ...products]);
    }
  }, [isSuccess]);

  const columns = useMemo(
    () =>
      initialDataProducts({
        onDelete: (row) => {
          if (!Array.isArray(values)) {
            return;
          }
          const filterArray = values.filter((item) => item._id !== row._id);

          setSelectedProducts(filterArray);
          //@ts-expect-error error
          onChange(filterArray);
        },
      }),
    [values, onChange]
  );

  useEffect(() => {
    setSelectedProducts(values);
  }, [values]);

  const getOptionLabel = useCallback((option: Product) => {
    return (
      <>
        <div
          className={`relative flex w-full items-center gap-2 !bg-transparent font-regular text-[12px]`}
        >
          <img
            loading="eager"
            className="h-10 w-10 rounded-full border border-gray-100 object-contain"
            src={`${option?.teacherProfile}`}
          />
          <p className="line-clamp-2">{option.title}</p>
          <div className="absolute left-0 top-0 flex flex-col items-end justify-end gap-1 group-hover:bg-gray-200">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-main text-white">
              {option.count}
            </span>
            <div className="flex items-center gap-2">
              {option.discountPrice && <p className="text-main line-through">{option.price}</p>}
              <p>
                {option.discountPrice > 0
                  ? option.discountPrice.toLocaleString()
                  : option.price.toLocaleString()}{' '}
                <span className="!text-[10px]">تومان</span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }, []);

  const onMenuScrollToBottom = () => {
    const total = data?.data?.data?.totalProducts;

    if (page >= total) return;
    setPage(page + 1);
  };

  const CustomValueContainer = useCallback(({ getValue, children }: any) => {
    const selectedValues = getValue(); // تمام مقادیر انتخاب‌شده
    const visibleValues = selectedValues.slice(0, 6); // نمایش ۴ مقدار اول
    const hiddenCount = selectedValues.length - visibleValues.length; // تعداد آیتم‌های مخفی

    return (
      <div className="flex h-[45px] items-center gap-1">
        {visibleValues.map((item: Product, index: number) => (
          <div key={index} className="select-value-product">
            <img
              loading="eager"
              className="jpeg-layer h-8 w-8 rounded-full border border-gray-100 object-contain"
              src={item.teacherProfile}
            />
          </div>
        ))}
        {hiddenCount > 0 && <span className="ml-2 font-regular text-gray-600">+{hiddenCount}</span>}
        {/* @ts-ignore */}
        {children[1]} {/* برای حفظ placeholder و input */}
      </div>
    );
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <p className={`mb-[6px] pr-1 font-medium text-[14px] lg:text-[14px]`}>
        {title}
        {/* <span className="text-red-500">*</span> */}
      </p>

      <Select
        inputValue={search}
        onInputChange={(value) => setSearch(value)}
        components={{
          IndicatorsContainer: () =>
            values?.length >= 1 ? (
              <Button className="min-fit w-fit" onClick={() => setOpen(true)}>
                <PiEye size={20} className="relative z-50 ml-2 cursor-pointer" />
              </Button>
            ) : (
              <span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  role="presentation"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="1em"
                  data-slot="selectorIcon"
                  className="ml-3 h-4 w-4 transition-none"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            ),
          ValueContainer: CustomValueContainer,
        }}
        placeholder="انتخاب محصولات"
        options={options}
        value={selectedProducts}
        onChange={(value) => {
          // @ts-expect-error error
          setSelectedProducts(value); // به‌روزرسانی state داخلی
          // @ts-expect-error error
          onChange(value); // ارسال مقدار به تابع والد
        }}
        // @ts-expect-error
        getOptionLabel={getOptionLabel}
        getOptionValue={(option) => option.title}
        isMulti
        onMenuScrollToBottom={onMenuScrollToBottom}
        // isSearchable
        hideSelectedOptions
        inputId="input"
        loadingMessage={() => (
          <Spinner classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }} />
        )}
        LoadingIndicator={() => (
          <Spinner classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }} />
        )}
        isLoading={isPending || isLoading || isFetching}
        noOptionsMessage={() => (
          <span className="font-regular text-[14px] text-[#0c0c0c]">لیست خالی است</span>
        )}
        isClearable={false}
        classNames={{
          input: () => '!h-[40px] !w-[120px]',
          control: () => ' !bg-[#f5f6f6] !outline-none !border-gray-200 !rounded-lg',
          indicatorSeparator: () => 'hidden',
          placeholder: () => 'font-regular !text-[14px]',
          container: () => '!outline-none',
          menuList: () => 'container_select',
          menu: () => `!z-[9999] rounded-xl overflow-hidden relative after:font-medium after:text-center after:py-3 after:content-['در_حال_دریافت_محصولات_...'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-fit after:bg-white after:text-main after:border-t after:z-50
                    ${isPending || isLoading || isFetching ? 'after:block' : 'after:hidden'}`,
        }}
      />
      <BaseDialog
        isOpen={open}
        size="full"
        title="محصولات انتخاب شده"
        onClose={() => setOpen(false)}
      >
        <ReactTable
          isFetching={isFetching}
          isSuccess={isSuccess}
          isLoading={isPending || isLoading}
          mainData={values}
          showData={columns}
          columns={[
            'nid',
            'wooid',
            'count',
            'title',
            'noindex',
            'price',
            'discountPrice',
            'action',
          ]}
        />
      </BaseDialog>
    </div>
  );
}
