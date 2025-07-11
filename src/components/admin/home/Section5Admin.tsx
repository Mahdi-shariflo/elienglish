import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { Home } from '@/types/home';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import SelectCourse from '../courses/SelectCourse';
import Carousel from '@/components/common/Carousel';
import ProductsSelect from '../product/ProductsSelect';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const Section5Admin = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const form = useFormik({
    initialValues: {
      title: '',
      colorTitle: '',
      href: '',
      product: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setValues({
        sec: 'section5',
        id: formik.values._id,
        section5: {
          ...values,
        },
      });
      onClose();
    },
  });
  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: 'section5',
        _id: formik.values._id,
        section5: data,
      });
    }
  }, [data]);

  const onOpen = () => {
    form.setValues({
      ...formik.values?.section4,
    });
    setOpen(true);
  };
  return (
    <div>
      <Carousel
        classCard="!h-[380px] !w-[300px] lg:!h-[380px]"
        className="!w-full"
        title={formik?.values?.section5?.title}
        url={''}
        products={formik?.values?.section5?.product ?? []}
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
            name="tilte"
            formik={form}
            classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
          />
          <Input
            label={'عنوان رنگی'}
            name="colorTitle"
            formik={form}
            classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
          />
          <Input
            label={'لینک مشاهده بیشتر'}
            name="href"
            formik={form}
            classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
          />
          <ProductsSelect
            className="col-span-2 w-full"
            title="انتخاب دوره"
            values={form?.values?.product}
            onChange={(values) => form.setFieldValue('product', values)}
          />
        </div>
      </BaseDialog>
    </div>
  );
};

export default Section5Admin;
