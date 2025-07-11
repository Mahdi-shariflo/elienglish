import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { Home } from '@/types/home';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import SelectBlog from '../blog/SelectBlog';
import EliMag from '@/components/blog/EliMag';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const Section7Admin = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const form = useFormik({
    initialValues: {
      title: '',
      colorTitle: '',
      href: '',
      blog: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setValues({
        sec: 'section7',
        id: formik.values._id,
        section7: {
          ...values,
        },
      });
      onClose();
    },
  });
  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: 'section7',
        _id: formik.values._id,
        section7: data,
      });
    }
  }, [data]);

  const onOpen = () => {
    form.setValues({
      ...formik.values?.section7,
    });
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={onOpen} className="bg-main px-4 text-white">
        ویرایش سکشن
      </Button>
      <EliMag
        className="mt-10"
        delay={3200}
        title="الی مگ"
        blogs={Array.isArray(formik.values?.section7?.blog) ? formik.values?.section7?.blog : []}
      />

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
          <SelectBlog
            className="col-span-2 w-full"
            title="انتخاب بلاگ"
            values={form?.values?.blog}
            onChange={(values) => form.setFieldValue('blog', values)}
          />
        </div>
      </BaseDialog>
    </div>
  );
};

export default Section7Admin;
