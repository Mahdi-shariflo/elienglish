import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { Home } from '@/store/types/home';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import SelectCourse from '../courses/SelectCourse';
import Carousel from '@/components/common/Carousel';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const Section4Admin = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const form = useFormik({
    initialValues: {
      title: '',
      colorTitle: '',
      href: '',
      course: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setValues({
        sec: 'section4',
        id: formik.values._id,
        section4: {
          ...values,
        },
      });
      onClose();
    },
  });
  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: 'section4',
        _id: formik.values._id,
        section4: data,
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
        classCard="!h-[380px] !w-[300px] lg:!h-[400px]"
        className="!w-full"
        title={formik?.values?.section4?.title}
        colorTitle={formik?.values?.section4?.colorTitle}
        url={''}
        products={formik?.values?.section4?.course ?? []}
      >
        <Button onClick={onOpen} className="!w-fit bg-main px-4 text-white">
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
            name="title"
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
          <SelectCourse
            className="col-span-2 w-full"
            title="انتخاب دوره"
            values={form?.values?.course}
            onChange={(values) => form.setFieldValue('course', values)}
          />
        </div>
      </BaseDialog>
    </div>
  );
};

export default Section4Admin;
