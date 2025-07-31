'use client';
import SliderLogin from '@/components/admin/settings/SliderLogin';
import Select from '@/components/common/Select';
import { useFormik } from 'formik';
import React from 'react';

const Page = () => {
  const formik = useFormik({
    initialValues: {
      selectSec: '',
    },
    onSubmit: () => {},
  });
  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        تنظیمات
      </p>

      <Select
        options={[
          {
            label: 'اسلایدر لاگین',
            value: 'sliderLogin',
          },
        ]}
        label="انتخاب سکشن"
        value={formik.values.selectSec}
        name="selectSec"
        formik={formik}
        className="mt-10"
      />
      <div>{formik.values.selectSec === 'sliderLogin' ? <SliderLogin /> : null}</div>
    </div>
  );
};

export default Page;
