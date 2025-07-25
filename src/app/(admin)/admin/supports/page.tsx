'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { SearchIcon, User_Icon } from '@/components/common/icon';
import { useGetSupportsAdmin } from '@/hooks/admin/supports/useGetSupportsAdmin';
import { initialDataContactus } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import React, { useMemo, useState } from 'react';

const Page = () => {
  const [modal, setModal] = useState<{
    open: boolean;
    info: { firstName: string; lastName: string; message: string; mobile: string } | null;
  }>({
    open: false,
    info: null,
  });
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });
  const { data, isPending, isSuccess } = useGetSupportsAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
  });
  const { setVerifyDelete } = useGlobalStore();
  const columns = useMemo(
    () =>
      initialDataContactus({
        onDelete: (row) =>
          setVerifyDelete({
            open: true,
            title: 'حذف پیام تماس با ما',
            description: 'تماس‌ها',
            info: `${row.firstName} ${row.lastName}`,
            updateCache: 'supports-admin',
            url: `/admin/contactus/remove/${row._id}`,
          }),
        onEye: (row) => setModal({ info: row, open: true }),
      }),
    [isSuccess]
  );

  const comment = data?.data?.data;
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
        تماس با ما
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
        total={comment?.totalPages}
        mainData={comment?.contactus}
        showData={columns}
        columns={['_id', 'firstName', 'lastName', 'mobile', 'message', 'action']}
        page={Number(filter.page)}
        sort={filter.sort}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
      />
      {modal.open ? (
        <BaseDialog
          isOpen={modal.open}
          onClose={() => setModal({ info: null, open: false })}
          title="مشاهده"
        >
          <div>
            <div className="flex items-center gap-2 font-regular text-[12px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed">
                <User_Icon />
              </div>
              <div className="space-y-2">
                <p>
                  {modal.info?.firstName} {modal.info?.lastName}
                </p>
                <p>{modal.info?.mobile}</p>
              </div>
            </div>

            <p className="mt-4 border-t border-gray-100 py-6 font-regular">{modal.info?.message}</p>
          </div>
        </BaseDialog>
      ) : null}
    </div>
  );
};

export default Page;
