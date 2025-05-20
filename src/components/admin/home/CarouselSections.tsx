import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { converDatePer } from '@/lib/convert';
import { Home } from '@/types/home';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import ProductsSelect from '../product/ProductsSelect';
import Carousel from '@/components/home/Carousel';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const CarouselSections = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const form = useFormik({
    initialValues: {
      productSliderTitle: '',
      link: '',
      products: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setValues({
        ...values,
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
      <Carousel
        className="!w-full"
        url={formik.values.link}
        products={formik?.values?.products ?? []}
        title={formik.values?.productSliderTitle}
      >
        <Button onClick={onOpen} className="bg-main px-4 text-white">
          ویرایش سکشن
        </Button>
      </Carousel>

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

export default CarouselSections;
