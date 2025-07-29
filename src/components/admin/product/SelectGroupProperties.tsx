'use client';
import { Product } from '@/store/types/home';
import { Spinner } from '@heroui/react';
import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { useGetGroupProperties } from '@/hooks/admin/products/useGetGroupProperties';
import Button from '@/components/common/Button';
import { useGetAttributesByGroupPropertiesId } from '@/hooks/admin/products/useGetAttributesByGroupPropertiesId';

type Props = {
  values?: { _id: string; title: string };
  onChange: (value: Product) => void;
  onProperties: (value: Product[]) => void;
  title?: string;
  className?: string;
  propertyId?: string;
};
export default function SelectGroupProperties({
  values,
  onChange,
  title,
  className,
  propertyId,
  onProperties,
}: Props) {
  const [search, setSearch] = useState('');
  const [selectedProductTags, setSelectedProductTags] = useState<
    { _id: string; title: string } | undefined
  >(values);
  const {
    refetch,
    isLoading: isLoadingGroup,
    isSuccess: isSuccessGroup,
    data: dataAttributeByGroopProId,
  } = useGetAttributesByGroupPropertiesId({ id: selectedProductTags?._id });
  const [options, setOptions] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { isLoading, isSuccess, isFetching, data, isPending } = useGetGroupProperties({
    page: page.toString(),
    search,
    id: propertyId,
  });
  useEffect(() => {
    if (isSuccess) {
      const attributes = data?.data?.data?.propertiesGroups;
      setOptions([...options, ...attributes]);
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   setSelectedProductTags(values);
  // }, [values]);

  const onMenuScrollToBottom = () => {
    const total = data?.data?.data?.totalProperties;
    if (page >= total) return;
    setPage(page + 1);
  };
  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    if (isSuccessGroup) {
      const data = dataAttributeByGroopProId?.data?.data?.propertiesGroupe[0].properties;
      onProperties(data);
    }
  }, [isSuccessGroup]);
  return (
    <div className={`w-full ${className}`}>
      <p className={`mb-[6px] pr-1 font-medium text-[14px] lg:text-[14px]`}>{title}</p>
      <div className="flex items-center gap-2">
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
          placeholder="انتخاب از گروه ویژگی‌ها"
          options={memoizedOptions}
          value={selectedProductTags}
          onChange={(value) => {
            if (JSON.stringify(value) !== JSON.stringify(selectedProductTags)) {
              // @ts-expect-error
              setSelectedProductTags(value);
              // @ts-expect-error
              onChange(value);
            }
          }}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          onMenuScrollToBottom={onMenuScrollToBottom}
          isSearchable
          hideSelectedOptions
          loadingMessage={() => (
            <Spinner
              classNames={{
                circle1: 'border-b-main',
                circle2: 'border-b-main',
              }}
            />
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
            container: () => '!outline-none font-regular w-full',
            menuList: () => 'font-regular !text-[14px]',
            menu: () => '!z-[9999] rounded-xl overflow-hidden',
          }}
        />
        {/* @ts-expect-error */}
        <Button
          onClick={async () => await refetch()}
          isPending={isLoadingGroup}
          className="!w-[120px] !min-w-fit bg-main text-white"
        >
          اعمال
        </Button>
      </div>
    </div>
  );
}
