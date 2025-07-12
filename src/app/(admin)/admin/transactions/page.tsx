'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import { useGetTransactionsAdmin } from '@/hooks/admin/transactions/useGetTransactionsAdmin';
import { initialDataPayment } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import React, { useMemo, useState } from 'react';

const Page = () => {
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });
  const { data, isPending, isSuccess } = useGetTransactionsAdmin({
    page: filter.page,
    sort: filter.sort,
    search: filter.search,
  });
  const { setVerifyDelete } = useGlobalStore();
  const columns = useMemo(
    () =>
      initialDataPayment({
        onDelete: () =>
          setVerifyDelete({
            open: true,
            title: 'حذف وبلاگ',
            description: 'بلاگ‌ها',
            info: 'پوستت رو بشناس!',
            updateCache: 'blogs',
            url: '/blog/',
          }),
      }),
    []
  );

  const transport = data?.data?.data;

  const onChangeInput = (search: string) => {
    setFilter({
      ...filter,
      search: search,
    });
  };
  const onChangeSort = (sort: string) => {
    setFilter({
      search: '',
      page: '1',
      sort: sort,
    });
  };

  const onChangePage = (page: number) => {
    setFilter({ ...filter, page: page.toString(), search: '' });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        تراکنش‌ها
      </p>
      <Input
        value={filter.search}
        onChange={(e) => onChangeInput(e.target.value)}
        startContent={<SearchIcon className="stroke-[#616A76]" />}
        className="!mb-5 !mt-7"
        label="جستجو"
        classNameLabel="text-[#616A76] text-[14px]"
        classNameInput="bg-[#f5f6f6] !h-[48px]"
      />
      <ReactTable
        isSuccess={isSuccess}
        isLoading={isPending}
        total={transport?.totalPages}
        mainData={transport?.payment}
        showData={columns}
        columns={[
          '_id',
          'invoiceNumber',
          'amount',
          'paymentToken',
          'mobile',
          'verify',
          'createdAt',
        ]}
        page={Number(filter.page)}
        sort={filter.sort}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Page;
