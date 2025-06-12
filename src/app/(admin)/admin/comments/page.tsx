'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import CreateComment from '@/components/common/CreateComment';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import Select from '@/components/common/Select';
import { useGetCommentsAdmin } from '@/hooks/admin/comments/useGetCommentsAdmin';
import { initialDataComments } from '@/lib/table-column';
import { Comment } from '@/types';
import React, { useMemo, useState } from 'react';

const Page = () => {
  const [modal, setModal] = useState<{ open: boolean; info: null | Comment; admin?: boolean }>({
    open: false,
    info: null,
    admin: true,
  });
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
    status: 'false',
  });
  const { data, isLoading, isSuccess } = useGetCommentsAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
    status: filter.status,
  });
  const columns = useMemo(
    () =>
      initialDataComments({
        // @ts-expect-error error
        onEdit: (row) => setModal({ info: row, open: true, admin: true }),
      }),
    []
  );

  const comment = data?.data?.data;

  const onChangeInput = (search: string) => {
    setFilter({
      ...filter,
      search: search,
    });
  };
  // const onChangeSort = (sort: string) => {
  //   setFilter({
  //     search: "",
  //     page: "1",
  //     sort: sort,
  //     status:filter.status
  //   })
  // }

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
        دیدگاه‌ها
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
        isLoading={isLoading}
        total={comment?.totalPages}
        mainData={comment?.comments}
        showData={columns}
        columns={['_id', 'firstName', 'mobile', 'comment', 'rate', 'title', 'published', 'action']}
        page={Number(filter.page)}
        onChangePage={onChangePage}
      >
        <Select
          onChange={(value) =>
            // @ts-expect-error error
            setFilter({ page: '1', status: value.value!, search: '', sort: filter.sort })
          }
          value={filter.status}
          className="w-full"
          label="وضعیت"
          options={[
            { label: 'در انتظار تائید', value: 'Awaiting' },
            { label: 'تائید شده', value: 'Published' },
          ]}
        />
      </ReactTable>
      {modal.open && <CreateComment modal={modal} setModal={setModal} showCommentRate={false} />}
    </div>
  );
};

export default Page;
