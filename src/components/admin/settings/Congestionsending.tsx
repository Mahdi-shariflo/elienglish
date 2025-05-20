'use client';
import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { TiWarningOutline } from 'react-icons/ti';
import { useCongestionsending } from '@/hooks/admin/settings/useCongestionsending';

const Congestionsending = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useCongestionsending();
  const formik = useFormik({
    initialValues: {
      congestionsending: '',
    },
    validationSchema: Yup.object({
      congestionsending: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        congestionsending: values.congestionsending === 'true' ? true : false,
      };
      mutate({ data });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);
  return (
    <>
      <Button
        className="!w-[150px] bg-main bg-opacity-65 text-white"
        onClick={() => setOpen(!open)}
      >
        تغیر ازدحام ارسال
      </Button>
      <BaseDialog
        isLoadingFooterBtn={isPending}
        size="lg"
        onClickFooter={() => formik.handleSubmit()}
        nameBtnFooter="تغیر"
        onClose={() => setOpen(!open)}
        isOpen={open}
        title="ازدحام ارسال"
      >
        <div>
          <p className="mb-8 flex items-center justify-center gap-3 font-medium">
            <TiWarningOutline size={28} className="text-yellow-500" />
            <span className="text-[14px] text-gray-600">
              با تائید ازدحام ارسال برای محصولا، پیام تاخیر ارسال برای کاربر نمایش داده خواهد شد
            </span>
          </p>
          <Select
            formik={formik}
            name="congestionsending"
            options={[
              { label: 'محصولات با تاخبر فرستاده میشوند', value: 'true' },
              { label: 'محصولات با تاخیر فرستاده نمی شوند', value: 'false' },
            ]}
            label="انتخاب کنید"
          />
        </div>
      </BaseDialog>
    </>
  );
};

export default Congestionsending;
