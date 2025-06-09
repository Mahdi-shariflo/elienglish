'use client';
import ActionAccessUser from '@/components/admin/ActionAccess';
import ActionUser from '@/components/admin/ActionUser';
import ReactTable from '@/components/admin/common/ReactTable';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import { useGetUsersAdmin } from '@/hooks/admin/users/useGetUsersAdmin';
import { initialDataUsers } from '@/lib/table-column';
import { User } from '@/types';
import React, { useMemo, useState } from 'react';

const Page = () => {
  const [modal, setModal] = useState<{ open: boolean; info: null | User }>({
    open: false,
    info: null,
  });
  const [access, setAccess] = useState<{ open: boolean; info: null | User }>({
    open: false,
    info: null,
  });
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });
  const { data, isPending, isSuccess } = useGetUsersAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
  });
  // const { setVerifyDelete } = useGlobalStore();
  const columns = useMemo(
    () =>
      initialDataUsers({
        onEdit: (row) => setModal({ open: true, info: row }),
        onAccess: (row) => setAccess({ open: true, info: row }),
        // onDelete: () =>
        //   setVerifyDelete({
        //     open: true,
        //     title: 'حذف وبلاگ',
        //     description: 'بلاگ‌ها',
        //     info: 'پوستت رو بشناس!',
        //     updateCache: 'blogs',
        //     url: '/blog/',
        //   }),
      }),
    [isSuccess]
  );

  const user = data?.data?.data;

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
        کاربران
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
        total={user?.totalPages}
        mainData={user?.users}
        showData={columns}
        columns={['firstName', 'lastName', 'action', 'mobile', 'createdAt', 'Role']}
        page={Number(filter.page)}
        sort={filter.sort}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
        onAction={() => setModal({ info: null, open: true })}
        nameAction="ایجاد"
      />
      {modal.open && <ActionUser modal={modal} setModal={setModal} />}
      {access.open && <ActionAccessUser modal={access} setModal={setAccess} />}
    </div>
  );
};

export default Page;
