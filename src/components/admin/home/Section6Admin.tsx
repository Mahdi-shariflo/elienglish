'use client';
import React, { useEffect, useState } from 'react';
import { FormikProps, useFormik } from 'formik';
import Input from '@/components/common/form/Input';
import Button from '@/components/common/Button';
import BaseDialog from '@/components/common/BaseDialog';
import Media from '../common/Media';
import { BASEURL } from '@/lib/variable';
import Textarea from '@/components/common/form/Textarea';
import Datepicker from '@/components/common/Datepicker';
import CardComment from '../common/CardComment';
import { Home } from '@/store/types/home';

type Props = {
  formik: FormikProps<any>;
  data: Home;
};

const Section6Admin = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useFormik({
    initialValues: {
      fullName: '',
      item: '',
      profile: '',
      comment: '',
      date: '',
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      formik.setValues({
        sec: 'section6',
        id: formik.values._id,
        section6: {
          ...formik.values.section6,
          comments: [...(formik.values.section6?.comments || []), values],
        },
      });
      resetForm();
      setOpen(false);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: 'section6',
        _id: formik.values._id,
        section6: data,
      });
    }
  }, [data]);
  const handleDelete = (index: number) => {
    const updated = [...(formik.values.section6?.comments || [])];
    updated.splice(index, 1);
    formik.setFieldValue('section6.comments', updated);
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>افزودن نظر جدید</Button>

      <div className="grid grid-cols-4 gap-4">
        {(formik.values.section6?.comments || []).map((item: any, index: number) => (
          <CardComment comment={item} onDelete={() => handleDelete(index)} key={index} />
        ))}
      </div>

      <BaseDialog
        title="افزودن نظر جدید"
        isOpen={open}
        onClose={() => setOpen(false)}
        onClickFooter={() => form.handleSubmit()}
      >
        <div className="grid grid-cols-2 gap-3">
          <Input classNameInput={'!h-[48px]'} name="fullName" label="نام کامل" formik={form} />
          <Input classNameInput={'!h-[48px]'} name="item" label="توضیح کوتاه" formik={form} />
          <Datepicker calendarPosition="fixed" label="تاریخ ایجاد" name="date" formik={form} />
          <Media
            title="تصویر پروفایل"
            className="w-full"
            container_class="!col-span-1"
            withModal
            onSelect={(img: any) => form.setFieldValue('profile', `${BASEURL}/${img.url}`)}
          >
            <div className="flex h-[48px] w-full items-center justify-center overflow-hidden rounded-xl border">
              {form.values.profile ? (
                <img
                  src={form.values.profile}
                  alt="پروفایل"
                  className="h-full w-full rounded-full object-contain"
                />
              ) : (
                <p className="text-center font-medium text-sm">انتخاب تصویر پروفایل</p>
              )}
            </div>
          </Media>
          <Textarea name="comment" label="نظر" className="col-span-2" formik={form} />
        </div>
      </BaseDialog>
    </div>
  );
};

export default Section6Admin;
