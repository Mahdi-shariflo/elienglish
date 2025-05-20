import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Datepicker from '@/components/common/Datepicker';
import Input from '@/components/common/form/Input';
import Discouts from '@/components/home/Discouts';
import { converDateGre, converDatePer, convertDatePer } from '@/lib/convert';
import { Home } from '@/types/home';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import ProductsSelect from '../product/ProductsSelect';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const SectionDiscountAdmin = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const form = useFormik({
    initialValues: {
      productSliderTitle: '',
      timer: '',
      link: '',
      products: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setValues({
        ...values,
        timer: converDateGre(values.timer),
      });
      onClose();
    },
  });
  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: data.title,
        ...(data._id ? { id: data._id } : null),
        ...(data.products ? { products: data?.products } : null),
        ...(data.timer ? { timer: data?.timer } : null),
        ...(data.link ? { link: data?.link } : null),
        ...(data.productSliderTitle ? { productSliderTitle: data.productSliderTitle } : null),
      });
    }
  }, [data]);

  const onOpen = () => {
    form.setValues({
      ...formik.values,
      timer: converDatePer(formik.values.timer),
    });
    setOpen(true);
  };

  return (
    <div>
      {formik?.values?.timer ? (
        <Discouts
          className="!w-full"
          products={formik.values?.products}
          timer={formik.values.timer}
          title={formik.values?.productSliderTitle}
          url={formik.values.link}
        >
          <Button onClick={onOpen} className="bg-white px-4 text-main">
            ویرایش سکشن
          </Button>
        </Discouts>
      ) : null}

      <BaseDialog
        onClose={onClose}
        title="ویرایش سکشن"
        isOpen={open}
        onClickFooter={() => form.handleSubmit()}
        classBody="!overflow-visible px-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <Input
            label={'عنوان'}
            name="productSliderTitle"
            formik={form}
            classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
          />
          <Input
            label={'لینک مشاهده بیشتر'}
            name="link"
            formik={form}
            classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
          />
          <Datepicker
            formik={form}
            name="timer"
            inputClass="!h-[45px]"
            timepicker
            label="تاریخ پایان تخفیف"
            calendarPosition="top"
            className="col-span-2"
            minDate={new Date()}
          />
          <ProductsSelect
            className="col-span-2 w-full"
            title="انتخاب محصول"
            values={form.values.products}
            onChange={(values) => form.setFieldValue('products', values)}
          />
        </div>
      </BaseDialog>
    </div>
  );
};

export default SectionDiscountAdmin;
