import Datepicker from '@/components/common/Datepicker';
import Checkbox from '@/components/common/form/Checkbox';
import Input from '@/components/common/form/Input';
import { FormikProps } from 'formik';
import React, { ReactNode } from 'react';
type Props = {
  formik?: FormikProps<any>;
  children?: ReactNode;
};
const GeneralProduct = ({ formik, children }: Props) => {
  return (
    <>
      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-5">
        <Input
          formik={formik}
          price
          classNameInput="!h-[48px] bg-[#f5f6f6]"
          label={'قیمت عادی (تومان)'}
          name="price"
        />
        <Input
          formik={formik}
          price
          classNameInput="!h-[48px] bg-[#f5f6f6]"
          label={'قیمت ویژه (تومان)'}
          name="discountPrice"
        />
        <Input
          formik={formik}
          type="tel"
          classNameInput="!h-[48px] bg-[#f5f6f6]"
          label={'تعداد محصول'}
          name="count"
          dir="rtl"
        />

        <Datepicker
          minDate={new Date()}
          calendarPosition="top"
          timepicker
          inputClass="!h-[45px]"
          formik={formik}
          name="discountTime"
          label="زمان بندی فروش"
        />

        {children}
      </div>
    </>
  );
};

export default GeneralProduct;
