'use client';
import Media from '@/components/admin/common/Media';
import ReactTable from '@/components/admin/common/ReactTable';
import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import { SearchIcon } from '@/components/common/icon';
import { useGetSetting } from '@/hooks/admin/settings/useGetSetting';
import { initialDataPayment } from '@/lib/table-column';
import useGlobalStore from '@/store/global-store';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, isSuccess } = useGetSetting();
  const [filter, setFilter] = useState({
    page: '1',
    sort: 'createdAt_desc',
    search: '',
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

  const setting = data?.data?.data;

  const onChangeInput = (search: string) => {
    setFilter({
      ...filter,
      search: search,
    });
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      enTitle: '',
      logo: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
      enTitle: Yup.string().required('فیلد اجباری است'),
      logo: Yup.string().required('فیلد اجباری است'),
      description: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const mainData = {
        ...setting,
        checkoutPage: {
          paymentList: {
            ...setting?.checkoutPage?.paymentList,
            ...values,
          },
        },
      };
      console.log(mainData, 'hhhhhhhhhhh');
    },
  });

  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        لیست درگاه های پرداخت
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
        isLoading={false}
        total={1}
        mainData={setting?.checkoutPage?.paymentList ? setting?.checkoutPage?.paymentList : []}
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
        onAction={() => setShowModal(true)}
        nameAction="ایجاد درگاه جدید"
      />
      {showModal && (
        <BaseDialog onClickFooter={formik.handleSubmit} title="ایجاد درگاه" isOpen>
          <div className="space-y-2">
            <Media
              className="w-full"
              withModal
              onSelect={(img) => formik.setFieldValue('thumbnailImage', img)}
            >
              <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full border">
                {typeof formik.values.logo === 'object' ? (
                  <img
                    className="h-full w-full object-contain"
                    // @ts-expect-error error
                    src={`${BASEURL}/${formik.values?.logo?.url}`}
                    alt="thumbnail"
                  />
                ) : (
                  <p className="text-center font-regular text-[9px]">
                    انتخاب لوگو بانک <span className="text-red-500">*</span>
                  </p>
                )}
              </div>
            </Media>
            <div className="flex items-center gap-4">
              <Input formik={formik} label={'عنوان'} name="title" />
              <Input formik={formik} label={'  عنوان انگلیسی'} name="enTitle" />
            </div>
            <Textarea formik={formik} label={'توضیحات'} name="description" />
          </div>
        </BaseDialog>
      )}
    </div>
  );
};

export default Page;
