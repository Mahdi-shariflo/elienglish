'use client';
import ActionTagBlog from '@/components/admin/blog/ActionTagBlog';
import ReactTable from '@/components/admin/common/ReactTable';
import Input from '@/components/common/form/Input';
import { SearchIcon } from '@/components/common/icon';
import { useGetTagsBlogAdmin } from '@/hooks/admin/blogs/useGetTagsBlogAdmin';
import { initialDataBlogTags } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import { useSession } from 'next-auth/react';
import React, { useMemo, useState } from 'react';
type Tag = {
  _id?: string;
  title: string;
  url: string;
  description: string;
};
const Page = () => {
  const [modal, setModal] = useState<{ open: boolean; info: null | Tag }>({
    open: false,
    info: null,
  });
  const user = useSession();
  const { isLoading, data, error, isSuccess } = useGetTagsBlogAdmin({});

  const tags = data?.data?.data;
  const { setVerifyDelete } = useGlobalStore();
  const columns = useMemo(
    () =>
      initialDataBlogTags({
        onDelete: (row: Tag) =>
          setVerifyDelete({
            open: true,
            title: 'حذف تگ بلاگ',
            description: 'تگ بلاگ‌ها',
            info: row.title,
            updateCache: 'tags-mag-admin',
            url: `/blog/admin/tag/${row._id}`,
          }),
        onEdit: (info: Tag) => setModal({ open: true, info }),
      }),
    [user]
  );

  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        {' '}
        تگ بلاگ‌ها
      </p>
      <Input
        startContent={<SearchIcon className="stroke-[#616A76]" />}
        className="!mb-5 !mt-7"
        label="جستجو"
        classNameLabel="text-[#616A76] text-[14px]"
        classNameInput="bg-[#f5f6f6] !h-[48px]"
      />
      <ReactTable
        isSuccess={isSuccess}
        isLoading={isLoading}
        page={1}
        total={tags?.totalPages}
        mainData={tags?.blogTag}
        showData={columns}
        columns={['_id', 'title', 'action', 'createdAt', 'isPublic']}
        nameAction="ایجاد تگ جدید"
        onAction={() => setModal({ info: null, open: true })}
        // @ts-expect-error error
        haveAccess={error?.status === 403 ? false : true}
      />
      <ActionTagBlog modal={modal} setModal={setModal} />
    </div>
  );
};

export default Page;
