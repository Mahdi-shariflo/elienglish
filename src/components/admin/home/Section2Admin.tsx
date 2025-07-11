import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Media from '../common/Media';
import { BASEURL } from '@/lib/variable';
import Slider from '@/components/common/Slider';

type Props = {
  formik: FormikProps<any>;
  data?: any;
};

const Section2Admin = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useFormik({
    initialValues: {
      title: '',
      href: '',
      url: '',
      order: '',
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      formik.setValues({
        sec: 'section2',
        id: formik.values._id,
        section2: [
          ...(Array.isArray(formik?.values?.section2) ? formik?.values?.section2 : []),
          { ...values, order: Number(values.order) },
        ],
      });
      resetForm();
      setOpen(false);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: 'section2',
        _id: formik.values._id,
        section2: data,
      });
    }
  }, [data]);
  console.log(formik.values);
  const onOpen = () => {
    // form.setValues({
    //   productSliderTitle: formik.values.section2Title || '',
    //   link: formik.values.section2Link || '',
    //   products: formik.values.section2Products || [],
    // });
    setOpen(true);
  };

  return (
    <>
      <Button onClick={onOpen}>ویرایش سکشن ۲</Button>
      <Slider
        onDelete={(index) => {
          const updated = [...formik.values.section2];
          updated.splice(index, 1);
          formik.setFieldValue('section2', updated);
        }}
        className="!w-full"
        sliders={formik.values?.section2}
      />

      <BaseDialog
        onClose={() => setOpen(false)}
        title="ویرایش سکشن ۲"
        isOpen={open}
        onClickFooter={() => form.handleSubmit()}
        classBody="!overflow-visible px-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="عنوان"
            name="title"
            formik={form}
            classNameInput="!h-[45px] !bg-[#f5f6f6]"
          />
          <Input
            label="شماره گذازی"
            name="order"
            formik={form}
            classNameInput="!h-[45px] !bg-[#f5f6f6]"
          />
          <Input label="لینک" name="href" formik={form} classNameInput="!h-[45px] !bg-[#f5f6f6]" />
          <Media
            title="تصویر"
            className="w-full"
            withModal
            onSelect={(img: any) => {
              form.setFieldValue('url', img.url);
            }}
          >
            <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
              {form.values.url ? (
                <img
                  className="h-full w-full object-contain"
                  src={`${BASEURL}/${form.values.url}`}
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
      </BaseDialog>
    </>
  );
};

export default Section2Admin;
