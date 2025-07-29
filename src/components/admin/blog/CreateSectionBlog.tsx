import SliderBlog from '@/components/blog/SliderBlog';
import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { converDatePer } from '@/lib/convert';
import { Home } from '@/store/types/home';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import SelectBlog from './SelectBlog';

type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const CreateSectionBlog = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const form = useFormik({
    initialValues: {
      title: '',
      cards: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setFieldValue('section2', { ...values });
      onClose();
    },
  });
  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: 'section2',
        ...(data._id ? { id: data._id } : null),
        ...(data.cards ? { cards: data?.cards } : null),
        ...(data.title ? { title: data.title } : null),
      });
    }
  }, [data]);

  const onOpen = () => {
    form.setValues({
      ...formik?.values?.section2,
    });
    setOpen(true);
  };
  return (
    <div className="mt-10">
      <SliderBlog
        delay={2000}
        typeCardBlog="long"
        blogs={formik?.values?.section2?.cards ?? []}
        title={formik.values?.section2?.title ? formik.values?.section2?.title : 'عنوان'}
      >
        <Button onClick={onOpen} className="bg-main px-4 text-white">
          ویرایش سکشن
        </Button>
      </SliderBlog>

      <BaseDialog
        onClose={onClose}
        title="ویرایش سکشن"
        isOpen={open}
        onClickFooter={() => form.handleSubmit()}
        classBody="!overflow-visible px-4"
      >
        <div className="grid grid-cols-1 gap-3">
          <Input
            label={'عنوان'}
            name="title"
            formik={form}
            classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
          />
          <SelectBlog
            className="col-span-2 w-full"
            title="انتخاب بلاگ"
            values={form.values.cards}
            onChange={(values) => form.setFieldValue('cards', values)}
          />
        </div>
      </BaseDialog>
    </div>
  );
};

export default CreateSectionBlog;
