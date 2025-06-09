'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import { useGetBlogsAdmin } from '@/hooks/admin/blogs/useGetBlogsAdmin';
import { initialDataBlogs } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });
  const user = useSession();
  const { isPending, data, isFetching, isLoading, isSuccess } = useGetBlogsAdmin({
    search: filter.search,
    sort: filter.sort,
    page: filter.page,
  });
  const { setVerifyDelete } = useGlobalStore();

  const blogs = data?.data?.data;

  const columns = useMemo(
    () =>
      initialDataBlogs({
        onDelete: (row) =>
          setVerifyDelete({
            open: true,
            title: 'حذف وبلاگ',
            description: 'بلاگ‌ها',
            info: row.title,
            updateCache: 'blogs-admin',
            url: `/blog/admin/${row._id}`,
          }),
        onEdit: (row) => router.push(`/admin/blogs/${row._id}/`),
      }),
    [isSuccess, user]
  );
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
        بلاگ‌ها
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
        isFetching={isFetching}
        isLoading={isPending || isFetching || isLoading}
        total={blogs?.totalPages}
        mainData={blogs?.blogs}
        showData={columns}
        columns={['_id', 'title', 'action', 'createdAt', 'isPublic']}
        nameAction="ایجاد بلاگ جدید"
        onAction={() => router.push(`/admin/blogs/add/`)}
        page={Number(filter.page)}
        sort={filter.sort}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Page;
