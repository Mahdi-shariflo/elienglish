'use client';
import { Product } from '@/store/types/home';
import { Spinner } from '@heroui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PiEye } from 'react-icons/pi';
import Select from 'react-select';
import BaseDialog from '../../common/BaseDialog';
import ReactTable from '../common/ReactTable';
import { initialDataProperties } from '@/lib/table-column';
import Button from '../../common/Button';
import { useGetPropertiesAdmin } from '@/hooks/products/useGetPropertiesAdmin';

type Props = {
  values: Product[];
  onChange: (value: Product) => void;
  title?: string;
  className?: string;
};
export default function SelectProductProperties({ values, onChange, title, className }: Props) {
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(values);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { isLoading, isSuccess, isFetching, data, isPending } = useGetPropertiesAdmin({
    page: page.toString(),
    search,
  });

  useEffect(() => {
    if (isSuccess) {
      const properties = data?.data?.data?.properties;
      setOptions((prevOptions) => [...prevOptions, ...properties]);
    }
  }, [isSuccess, isFetching, data]);

  const columns = useMemo(
    () =>
      initialDataProperties({
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

  const onMenuScrollToBottom = () => {
    const total = data?.data?.data?.totalProducts;

    if (page >= total) return;
    setPage(page + 1);
  };

  const CustomValueContainer = useCallback(({ getValue, children }: any) => {
    const selectedValues = getValue(); // تمام مقادیر انتخاب‌شده
    const visibleValues = selectedValues.slice(0, 2); // نمایش ۴ مقدار اول
    const hiddenCount = selectedValues.length - visibleValues.length; // تعداد آیتم‌های مخفی

    return (
      <div className="flex h-[45px] !w-fit items-center gap-1">
        {visibleValues.map((item: Product, index: number) => (
          <div key={index} className="select-value-product font-reqular whitespace-nowrap">
            <span className="text-[14px]">{item.title}</span>،
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
        getOptionValue={(option) => option.title}
        getOptionLabel={(option) => option.title}
        isMulti
        onMenuScrollToBottom={onMenuScrollToBottom}
        // isSearchable
        hideSelectedOptions
        inputId="input"
        loadingMessage={() => (
          <Spinner classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }} />
        )}
        isLoading={isPending || isLoading || isFetching}
        noOptionsMessage={() => (
          <span className="font-regular text-[14px] text-[#0c0c0c]">لیست خالی است</span>
        )}
        isClearable={false}
        classNames={{
          input: () => '!h-[40px] !w-[120px]',
          control: () =>
            ' !bg-[#f5f6f6] !outline-none !flex-nowarp !flex !pr-1 !border-gray-200 !rounded-lg',
          indicatorSeparator: () => 'hidden',
          placeholder: () => 'font-regular !text-[14px]',
          container: () => '!outline-none ',
          menuList: () => 'container_select !text-[14px] !font-reqular',
          menu: () => `!z-[9999] rounded-xl !font-reqular overflow-hidden relative after:font-medium after:text-center after:py-3 after:content-['در_حال_دریافت_محصولات_...'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-fit after:bg-white after:text-main after:border-t after:z-50
                    ${isPending || isLoading || isFetching ? 'after:block' : 'after:hidden'}`,
        }}
      />
      <BaseDialog
        isOpen={open}
        size="full"
        title="ویژگی‌های انتخاب شده"
        onClose={() => setOpen(false)}
      >
        <ReactTable
          isFetching={isFetching}
          isSuccess={isSuccess}
          isLoading={isPending || isLoading}
          mainData={values}
          showData={columns}
          columns={['_id', 'title']}
        />
      </BaseDialog>
    </div>
  );
}
