'use client';
import { Product } from '@/store/types/home';
import { Spinner } from '@heroui/react';
import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { useGetAttributeById } from '@/hooks/admin/products/useGetAttributeById';
import { TagType } from '@/store/types';

type Props = {
  values: TagType[];
  onChange: (value: TagType) => void;
  title?: string;
  className?: string;
  propertyId?: string;
  idx: number;
};
export default function SelectAtrributeBuyPropertyId({
  values,
  onChange,
  title,
  className,
  propertyId,
  idx,
}: Props) {
  const [search, setSearch] = useState('');
  const [selectedProductTags, setSelectedProductTags] = useState<TagType[]>(values);
  const [options, setOptions] = useState<TagType[]>([]);
  const [page, setPage] = useState(1);
  const { isLoading, isSuccess, isFetching, data, isPending } = useGetAttributeById({
    page: page.toString(),
    search,
    id: propertyId,
  });
  useEffect(() => {
    if (isSuccess) {
      const attributes = data?.data?.data?.propertyAttribiute;
      setOptions([...options, ...attributes]);
    }
  }, [isSuccess]);

  useEffect(() => {
    setSelectedProductTags(values);
  }, [values]);

  const onMenuScrollToBottom = () => {
    const total = data?.data?.data?.totalProperties;
    if (page >= total) return;
    setPage(page + 1);
  };
  const memoizedOptions = useMemo(() => options, [options]);

  return (
    <div className={`w-full ${className}`}>
      <p className={`mb-[6px] pr-1 font-medium text-[14px] lg:text-[14px]`}>{title}</p>

      <Select
        inputId="search"
        inputValue={search}
        onInputChange={(value) => setSearch(value)}
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
        placeholder="انتخاب ویژگی"
        options={memoizedOptions}
        value={selectedProductTags}
        onChange={(value) => {
          if (JSON.stringify(value) !== JSON.stringify(selectedProductTags)) {
            // @ts-expect-error
            setSelectedProductTags({ ...value, idx });
            // @ts-expect-error
            onChange(value);
          }
        }}
        getOptionLabel={(option) => option?.title!}
        getOptionValue={(option) => option._id}
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
