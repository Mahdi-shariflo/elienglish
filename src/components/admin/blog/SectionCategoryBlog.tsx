import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Category } from '@/store/types/home';
import { Plus_icon } from '@/components/common/icon';
import { generateRandomString } from '@/lib/fun';
import Categories from '@/components/blog/Categories';
type Props = {
  formik: FormikProps<any>;
  data?: {
    cardTitle: string;
    cardLink: string;
  }[];
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
        cardTitle: values.title,
        cardLink: values.url,
        _id: values._id || generateRandomString(),
      };

      const existingIndex = formik.values?.section2?.cards?.findIndex(
        (item: Category) => item._id === newCategory._id
      );

      if (existingIndex !== -1) {
        const updated = [...formik.values.section2.cards];
        updated[existingIndex] = newCategory;
        formik.setFieldValue('section2', {
          ...formik.values.section2,
          cards: updated,
        });
      } else {
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
        value={formik.values?.section2?.title}
        formik={formik}
        label={'عنوان '}
        classNameInput={'!h-[45px] !bg-[#f5f6f6]'}
        name="section2.title"
        className="mb-10"
      />
      <Categories
        // className="!w-fit"
        // onEdit={onEdit}
        // onDelete={onDelete}
        categories={
          formik?.values?.section2?.cards.map((item: any) => {
            return { title: item?.cardTitle, url: item?.cardLink };
          }) ?? []
        }
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
