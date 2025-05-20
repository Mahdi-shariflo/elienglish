import Media from '@/components/admin/common/Media';
import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Home } from '@/types/home';
import Categories from '@/components/home/Categories';
import Button from '@/components/common/Button';
import { Plus_icon } from '@/components/common/icon';
import Image from '@/components/common/Image';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const SectionCategory = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const form = useFormik({
    initialValues: {
      thumbnailimage: null,
      title: '',
      url: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
      url: Yup.string().required('فیلد اجباری است'),
      thumbnailimage: Yup.object().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        ...values,
        thumbnailimage: values?.thumbnailimage,
      };
      if (Array.isArray(formik?.values?.productsCategories)) {
        formik.setFieldValue('productsCategories', [...formik?.values?.productsCategories, data]);
      } else {
        formik?.setFieldValue('productsCategories', [data]);
      }
      onClose();
    },
  });

  useEffect(() => {
    if (data) {
      formik?.setValues({
        sec: data.title,
        ...(data._id ? { id: data._id } : null),
        ...(data.productsCategories
          ? {
              productsCategories:
                typeof data.productsCategories === 'string'
                  ? JSON.parse(data.productsCategories)
                  : data.productsCategories,
            }
          : []),
      });
    }
  }, [data]);

  return (
    <div>
      <Categories
        className="!w-fit"
        productsCategories={JSON.stringify(formik?.values?.productsCategories)}
      >
        <div className="flex h-[160px] w-[132px] flex-col items-center">
          <Button
            onClick={() => setOpen(true)}
            className="-20 h-[85px] w-[85px] rounded-full border bg-white object-cover"
          >
            <Plus_icon className="h-20 w-20 stroke-gray-500" />
          </Button>
          <div className="-mt-9 flex h-[105px] w-[132px] items-center justify-center rounded-lg bg-[#FCE7F5]">
            <p className="mt-5 w-[100px] text-center font-medium text-[16px] text-[#0C0C0C]">
              دسته بندی جدید
            </p>
          </div>
        </div>
      </Categories>

      <BaseDialog
        onClose={onClose}
        isOpen={open}
        title="ایجاد دسته‌بندی جدید"
        onClickFooter={() => form.handleSubmit()}
        size="lg"
      >
        <div className="mb-5 flex flex-col gap-3">
          <Media
            withModal
            onSelect={(media) => form.setFieldValue('thumbnailimage', media)}
            className="mx-auto mb-2 mt-4 !h-[80px] !w-[80px] rounded-full"
          >
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border font-regular text-[12px]">
              {form.values.thumbnailimage ? (
                // @ts-expect-error error
                <Image
                  src={`${form.values.thumbnailimage.url}`}
                  alt={form.values.thumbnailimage.title}
                  className="z-20 h-[70px] w-[70px] rounded-full bg-white object-cover"
                />
              ) : (
                <p>آپلود تصویر</p>
              )}
            </div>
          </Media>
          <Input
            formik={form}
            label={'عنوان صفحه'}
            classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
            name="title"
          />
          <Input
            formik={form}
            label={'لینک'}
            classNameInput={'!h-[45px] bg-[#f5f6f6]'}
            name="url"
          />
        </div>
      </BaseDialog>
    </div>
  );
};

export default SectionCategory;
