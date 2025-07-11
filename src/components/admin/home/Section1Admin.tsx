'use client';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import Media from '../common/Media';
import { BASEURL } from '@/lib/variable';
import Section1CardList from './Section1CardList';

type Props = {
  formik: FormikProps<any>;
};

const Section1Admin = ({ formik }: Props) => {
  useEffect(() => {
    formik.setFieldValue('description', '');
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Input formik={formik} name="section1.colorTitle" label="عنوان رنگی" />
        <Input formik={formik} name="section1.title" label="عنوان" />
        <Textarea
          className="col-span-2"
          formik={formik}
          name="section1.description"
          label="توضیحات"
        />

        {/* دکمه فعال */}
        <div className="mt-4 rounded-lg border p-4">
          <p className="font-bold text-[14px]">دکمه فعال</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Input formik={formik} name="section1.activeBtn.title" label="عنوان" />
            <Input formik={formik} name="section1.activeBtn.href" label="لینک" />
          </div>
        </div>

        {/* دکمه دیگر */}
        <div className="mt-4 rounded-lg border p-4">
          <p className="font-bold text-[14px]">دکمه</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Input formik={formik} name="section1.btn.title" label="عنوان" />
            <Input formik={formik} name="section1.btn.href" label="لینک" />
          </div>
        </div>

        {/* شمارش‌گرها */}
        <Section1CardList formik={formik} />

        {/* تصویر و لینک تصویر */}
        <div className="col-span-2 mt-4 space-y-4 rounded-lg border p-3">
          <Input formik={formik} name="section1.picture.href" label="لینک تصویر" />
          <Media
            title="تصویر "
            className="w-full"
            withModal
            onSelect={(img: any) => {
              formik.setFieldValue('section1.picture.url', img.url);
            }}
          >
            <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
              {formik.values.section1?.picture?.url ? (
                <img
                  className="h-full w-full object-contain"
                  src={`${BASEURL}/${formik.values.section1?.picture?.url}`}
                  alt="thumbnail"
                />
              ) : (
                <p className="text-center font-regular text-lg">
                  انتخاب تصویر <span className="text-red-500">*</span>
                </p>
              )}
            </div>
          </Media>
        </div>
      </div>
    </div>
  );
};

export default Section1Admin;
