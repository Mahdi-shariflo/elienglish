'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import ActionCourseTags from '@/components/admin/courses/ActionCourseTags';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import { useGetCourseTagsAdmin } from '@/hooks/admin/courses/useGetCourseTagsAdmin';
import { initialDataTagProduct } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import { TagType } from '@/types';
import React, { useMemo, useState } from 'react';

const Page = () => {
  const [modal, setModal] = useState<{ open: boolean; info: null | TagType }>({
    open: false,
    info: null,
  });
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
    filter: '',
  });
  const { data, isPending, isSuccess, isFetching, isLoading } = useGetCourseTagsAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
    filter: filter.filter,
  });
  const { setVerifyDelete } = useGlobalStore();
  const columns = useMemo(
    () =>
      initialDataTagProduct({
        onEdit: (row) => setModal({ open: true, info: row }),
        onDelete: (row) =>
          setVerifyDelete({
            open: true,
            title: 'حذف تگ',
            description: 'تگ محصولات',
            info: row.title,
            updateCache: 'course-tags-admin',
            url: `/course/admin/tag/${row._id}`,
          }),
      }),
    [isSuccess]
  );

  const product = data?.data?.data;

  const onChangeInput = (search: string) => {
    setFilter({
      ...filter,
      page: '1',
      search: search,
    });
  };
  const onChangeSort = (sort: string) => {
    setFilter({
      search: '',
      page: '1',
      sort: sort,
      filter: '',
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
        تگ دوره ها
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
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isPending || isLoading}
        page={Number(filter.page)}
        total={product?.totalPages}
        mainData={product?.tag}
        showData={columns}
        columns={['_id', 'title', 'description', 'action']}
        nameAction="ایجاد تگ"
        onAction={() => setModal({ open: true, info: null })}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
        sort={filter.sort}
      ></ReactTable>
      <ActionCourseTags modal={modal} setModal={setModal} />
      {/* <CreateProduct/> */}
    </div>
  );
};

export default Page;
