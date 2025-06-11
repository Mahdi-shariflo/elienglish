import Media from '@/components/admin/common/Media';
import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Category, Home } from '@/types/home';
import Button from '@/components/common/Button';
import { Plus_icon } from '@/components/common/icon';
import { generateRandomString } from '@/lib/fun';
import Categories from '@/components/blog/Categories';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const SectionCategoryBlog = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const form = useFormik({
    initialValues: {
      title: '',
      url: '',
      _id: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
      url: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const newCategory = {
        ...values,
        _id: values._id || generateRandomString(),
      };

      const existingIndex = formik.values?.section2?.cards?.findIndex(
        (item: Category) => item._id === newCategory._id
      );

      if (existingIndex !== -1) {
        // اگر وجود داشت، مقدار جدید جایگزین مقدار قبلی شود
        const updated = [...formik.values.section2.cards];
        updated[existingIndex] = newCategory;
        formik.setFieldValue('section2', { ...formik.values.section2, cards: updated });
      } else {
        // اگر وجود نداشت، اضافه شود
        formik.setFieldValue('section2', {
          ...formik.values.section2,
          cards: [...(formik.values?.section2?.cards || []), newCategory],
        });
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

  const onEdit = (category: Category) => {
    // @ts-expect-error error
    form.setValues({ ...category });
    setOpen(true);
  };

  const onDelete = (category: Category) => {
    const filtered = formik.values.productsCategories?.filter(
      (item: Category) => item._id !== category._id
    );
    formik.setFieldValue('productsCategories', filtered);
  };

  return (
    <div className="mt-10">
      <Input
        formik={formik}
        label={'عنوان '}
        classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
        name="sections2.title"
        className="mb-10"
      />
      <Categories
        // className="!w-fit"
        // onEdit={onEdit}
        // onDelete={onDelete}
        categories={formik?.values?.section2?.cards ?? []}
      >
        <button
          onClick={() => setOpen(true)}
          className="flex h-[158px] w-[183px] flex-col items-center justify-center gap-10 rounded-xl border-2 border-[#E5EAEF] bg-white"
        >
          <Plus_icon className="h-14 w-14 stroke-main" />
          <p className="font-bold text-main">دسته‌بندی جدید</p>
        </button>
      </Categories>

      <BaseDialog
        onClose={onClose}
        isOpen={open}
        title="ایجاد دسته‌بندی جدید"
        onClickFooter={() => form.handleSubmit()}
        size="lg"
      >
        <div className="mb-5 flex flex-col gap-3">
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

export default SectionCategoryBlog;
