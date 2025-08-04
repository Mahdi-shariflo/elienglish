'use client';
import { Product } from '@/store/types/home';
import { Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { TagType } from '@/store/types';
import { useGetProductTag } from '@/hooks/products/useGetProductTag';

type Props = {
  values: TagType[];
  onChange: (value: TagType) => void;
  title?: string;
  className?: string;
};
export default function SelectProductTag({ values, onChange, title, className }: Props) {
  const [selectedProductTags, setSelectedProductTags] = useState<TagType[]>(values);
  const [options, setOptions] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { isLoading, isSuccess, isFetching, data, isPending } = useGetProductTag({
    page: page.toString(),
  });
  useEffect(() => {
    if (isSuccess) {
      const productTags = data?.data?.data?.productTag;
      setOptions([...options, ...(Array.isArray(productTags) ? productTags : [])]);
    }
  }, [isSuccess]);

  useEffect(() => {
    setSelectedProductTags(values);
  }, [values]);

  const onMenuScrollToBottom = () => {
    const total = data?.data?.data?.totalTag;
    if (page >= total) return;
    setPage(page + 1);
  };

  return (
    <div className={`w-full ${className}`}>
      <p className={`mb-[6px] pr-1 font-medium text-[14px] lg:text-[14px]`}>{title}</p>

      <Select
        components={{
          IndicatorsContainer: () => (
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
        }}
        placeholder="انتخاب تگ"
        // @ts-expect-error error
        options={options}
        value={selectedProductTags}
        onChange={(value) => {
          // @ts-expect-error error
          setSelectedProductTags(value); // به‌روزرسانی state داخلی
          // @ts-expect-error error
          onChange(value); // ارسال مقدار به تابع والد
        }}
        getOptionLabel={(option) => option?.title!}
        getOptionValue={(option) => option?._id}
        isMulti
        onMenuScrollToBottom={onMenuScrollToBottom}
        isSearchable
        hideSelectedOptions
        loadingMessage={() => (
          <Spinner classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }} />
        )}
        isLoading={isPending || isLoading || isFetching}
        noOptionsMessage={() => (
          <span className="font-regular text-[14px] text-[#0c0c0c]">لیست خالی است</span>
        )}
        isClearable={false}
        classNames={{
          input: () => '!h-[40px]',
          control: () => ' !bg-[#f5f6f6] !outline-none !border-gray-200 !rounded-lg',
          indicatorSeparator: () => 'hidden',
          placeholder: () => 'font-regular !text-[14px]',
          container: () => '!outline-none font-regular',
          menuList: () => 'font-regular !text-[14px]',
          menu: () => '!z-[9999] rounded-xl overflow-hidden',
        }}
      />
    </div>
  );
}
