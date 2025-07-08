'use client';
import ActionDiscountCode from '@/components/admin/ActionDiscountCode';
import ReactTable from '@/components/admin/common/ReactTable';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import { useGetDiscountsAdmin } from '@/hooks/admin/discounts/useGetDiscountsAdmin';
import { initialDataDiscount } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import React, { useMemo, useState } from 'react';

const Page = () => {
  const [modal, setModal] = useState({
    open: false,
    id: '',
  });
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });
  const { data, isLoading, isSuccess } = useGetDiscountsAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
  });
  const { setVerifyDelete } = useGlobalStore();
  const columns = useMemo(
    () =>
      initialDataDiscount({
        onDelete: (row) =>
          setVerifyDelete({
            open: true,
            title: 'حذف تخفیف',
            description: 'تخفیف‌ها',
            info: row.discountCode,
            updateCache: 'discount-admin',
            url: `/disocuntcode/admin/${row._id}`,
          }),
        onEdit: (row) => setModal({ id: row._id, open: true }),
      }),
    []
  );

  const sms = data?.data?.data;
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
        تخفیفات
      </p>
      <Input
        value={filter.search}
        onChange={(e) => onChangeInput(e.target.value)}
        startContent={<SearchIcon className="h-6 w-6 stroke-[#616A76]" />}
        className="!mb-5 !mt-7"
        label="جستجو"
        classNameLabel="text-[#616A76] text-[14px]"
        classNameInput="bg-[#f5f6f6] !h-[48px]"
      />
      <ReactTable
        isLoading={isLoading}
        total={sms?.totalPages}
        isSuccess={isSuccess}
        mainData={sms?.discountCode}
        showData={columns}
        columns={[
          '_id',
          'discountCode',
          'discountCodeType',
          'limitForEachUser',
          'updatedAt',
          'description',
          'createdAt',
          'descriptionCode',
          'discountCodePrice',
          'action',
        ]}
        page={Number(filter.page)}
        sort={filter.sort}
        onAction={() => setModal({ id: '', open: true })}
        nameAction="ایجاد کد تخفیف"
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
      />
      {modal.open && <ActionDiscountCode modal={modal} setModal={setModal} />}
    </div>
  );
};

export default Page;
