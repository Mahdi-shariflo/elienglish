'use client';
import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import { useChangeIndexProducts } from '@/hooks/admin/settings/useChangeIndexProducts';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { TiWarningOutline } from 'react-icons/ti';

const ChangeIndexProducts = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useChangeIndexProducts();
  const formik = useFormik({
    initialValues: {
      shownoindex: '',
    },
    validationSchema: Yup.object({
      shownoindex: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        shownoindex: values.shownoindex === 'true' ? true : false,
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
        تغیر ایندکس
      </Button>
      <BaseDialog
        isLoadingFooterBtn={isPending}
        size="lg"
        onClickFooter={() => formik.handleSubmit()}
        nameBtnFooter="تغیر"
        onClose={() => setOpen(!open)}
        isOpen={open}
        title="تغیر ایندکس محصولات"
      >
        <div>
          <p className="mb-8 flex items-center justify-center gap-3 font-medium">
            <TiWarningOutline size={28} className="text-yellow-500" />
            <span className="text-[14px] text-gray-600">
              با تغیر ایندکس برخی محصولات در سرچ و لندینگ نمایش داده نمیشود.
            </span>
          </p>
          <Select
            formik={formik}
            name="shownoindex"
            options={[
              { label: 'ایندکس شود', value: 'true' },
              { label: 'ایندکس نشود', value: 'false' },
            ]}
            label="انتخاب کنید"
          />
        </div>
      </BaseDialog>
    </>
  );
};

export default ChangeIndexProducts;
