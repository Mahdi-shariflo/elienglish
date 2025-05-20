import { useGetUsersAdmin } from '@/hooks/admin/users/useGetUsersAdmin';
import { User } from '@/types';
import { Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
type Props = {
  values?: User[];
  onChange: (value: User) => void;
  title?: string;
  className?: string;
  isMulti?: boolean;
};
const UsersSelect = ({ values, onChange, className, isMulti = true }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isPending, isLoading, isFetching, isSuccess } = useGetUsersAdmin({
    page: page.toString(),
    search,
  });
  const [options, setOptions] = useState<User[]>([]);

  const getOptionLabel = (option: User) => {
    return `${option.firstName} ${option.lastName} - ${option.mobile}`;
  };

  const onMenuScrollToBottom = () => {
    const total = data?.data?.data?.totalPages;
    if (page >= total) return;
    setPage(page + 1);
  };
  useEffect(() => {
    if (isSuccess) {
      const users = data?.data?.data?.users || [];
      setOptions((prev) => [...prev, ...users]);
    }
  }, [isSuccess, search, data]);

  return (
    <div className={className}>
      <p className={`mb-[6px] pr-1 font-medium text-[14px] lg:text-[14px]`}>
        {'کاربران'}
        {/* <span className="text-red-500">*</span> */}
      </p>
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
        placeholder="انتخاب کاربران"
        options={options}
        value={values}
        // @ts-expect-error error
        onChange={(value) => onChange(value)}
        getOptionLabel={getOptionLabel}
        getOptionValue={(option) => option?._id!}
        isMulti={isMulti}
        onMenuScrollToBottom={onMenuScrollToBottom}
        onInputChange={(value) => setSearch(value)}
        isSearchable
        hideSelectedOptions
        inputValue={search}
        loadingMessage={() => (
          <Spinner classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }} />
        )}
        isLoading={isPending || isLoading || isFetching}
        noOptionsMessage={() => (
          <span className="font-regular text-[14px] text-[#0c0c0c]">لیست خالی است</span>
        )}
        isClearable={false}
        onMenuClose={() => setPage(1)}
        classNames={{
          input: () => '!h-[40px]',
          control: () => ' !bg-[#f5f6f6] !outline-none !border-gray-200 !rounded-lg',
          indicatorSeparator: () => 'hidden',
          placeholder: () => 'font-regular !text-[14px]',
          container: () => '!outline-none !font-regular',
          menuList: () => 'container_select !font-regular',
          menu: () => '!z-[9999] rounded-xl !font-regular overflow-hidden',
        }}
        menuPosition="fixed"
        menuPlacement="top"
      />
    </div>
  );
};

export default UsersSelect;
