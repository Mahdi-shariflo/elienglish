'use client';
import ReactTable from '@/components/admin/common/ReactTable';
import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import { SearchIcon } from '@/components/common/icon';
import { useActionNotification } from '@/hooks/admin/notifications/useActionNotification';
import { useGetNotificationsAdmin } from '@/hooks/admin/notifications/useGetNotificationsAdmin';
import { initialDataNotifications } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
const Page = () => {
  const {
    mutate,
    isPending: isPendingNotification,
    isSuccess: isSuccessNotification,
  } = useActionNotification();
  const [modal, setModal] = useState<{
    open: boolean;
    info: { _id: string; title: string; description: string } | null;
  }>({
    open: false,
    info: null,
  });
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
  });
  const { data, isPending, isSuccess } = useGetNotificationsAdmin({
    page: filter.page,
    search: filter.search,
    sort: filter.sort,
  });
  const { setVerifyDelete } = useGlobalStore();
  const columns = useMemo(
    () =>
      initialDataNotifications({
        onDelete: (row) =>
          setVerifyDelete({
            open: true,
            title: 'حذف اعلان',
            description: 'اعلان‌ها',
            info: `${row.title}`,
            updateCache: 'notifications-admin',
            url: `/notification/admin/${row._id}`,
          }),
        onEdit: (row) => setModal({ info: row, open: true }),
      }),
    [isSuccess]
  );

  const notifications = data?.data?.data;
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

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (value) => {
      mutate({ data: value, id: modal?.info?._id as string });
    },
  });

  useEffect(() => {
    if (modal?.info?._id) {
      formik.setValues({
        title: modal?.info?.title,
        description: modal?.info?.description,
      });
    }
  }, [modal?.info?._id]);
  useEffect(() => {
    if (isSuccessNotification) {
      setModal({
        info: null,
        open: false,
      });
    }
  }, [isSuccessNotification]);
  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        اعلان‌ها
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
        total={notifications?.totalPages}
        mainData={notifications?.notification}
        showData={columns}
        columns={['id', 'title', 'description', 'createdAt', 'action']}
        page={Number(filter.page)}
        onAction={() => setModal({ info: null, open: true })}
        nameAction="ایجاد اعلان"
        sort={filter.sort}
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
      />
      {modal.open ? (
        <BaseDialog
          isLoadingFooterBtn={isPendingNotification}
          isOpen={modal.open}
          onClose={() => setModal({ info: null, open: false })}
          title={modal?.info?._id ? 'ویرایش اعلان' : 'ایجاد اعلان'}
          onClickFooter={formik.handleSubmit}
        >
          <div>
            <Input name="title" label={'عنوان'} formik={formik} />
            <Textarea formik={formik} className="mt-4" label={'توضیحات'} name="description" />
          </div>
        </BaseDialog>
      ) : null}
    </div>
  );
};

export default Page;
