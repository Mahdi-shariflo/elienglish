import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { createURL } from '@/lib/fun';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import SeoOptions from '../common/SeoOptions';
import Editor from '../common/Editor';
import { TagType } from '@/store/types';
import { useActionProductTags } from '@/hooks/admin/products/useActionProductTags';
import { useGetProductTagById } from '@/hooks/admin/products/useGetProductTagById';
import { useGetCategoriesFaqAdmin } from '@/hooks/admin/faq/useGetCategoriesFaqAdmin';
import Select from '@/components/common/Select';
import { StatusOptionsAdmin } from '@/lib/data';
import { useActionFaq } from '@/hooks/admin/faq/useActionFaq';

type Props = {
  modal: {
    open: boolean;
    info: null | TagType;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: null | TagType;
    }>
  >;
};
const ActionFaq = ({ modal, setModal }: Props) => {
  const onClose = () => setModal({ info: null, open: false });
  const { mutate, isPending, isSuccess, reset } = useActionFaq();
  const { data: faqCategories } = useGetCategoriesFaqAdmin({});
  const formik = useFormik({
    initialValues: {
      robots: '',
      question: '',
      answer: '',
      order: '',
      published: '',
      canonicalurl: '',
      metaDescription: '',
      title: '',
      redirecturl: '',
      metaTitle: '',
      rebots: '',
      url: '',
      keyWords: '',
      redirectType: '',
    },
    validationSchema: Yup.object({
      question: Yup.string().required('فیلد اجباری است'),
      answer: Yup.string().required('فیلد اجباری است'),
      order: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        question: values.question,
        answer: values.answer,
        order: values.order,
        published: values.published === 'true' ? true : false,
        ...(values.metaTitle ? { metaTitle: values.metaTitle } : null),
        ...(values.metaDescription ? { metaDescription: values.metaDescription } : null),
        ...(values.redirectType ? { redirectType: values?.redirectType } : null),
        ...(values.redirecturl ? { redirecturl: values.redirecturl } : null),
        ...(values.rebots ? { robots: values.robots } : null),
        ...(values.keyWords ? { keyWords: values.keyWords } : null),
        ...(values.canonicalurl ? { canonicalurl: values.canonicalurl } : null),
      };
      mutate({ data, id: modal.info?._id! });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      onClose();
      formik.resetForm();
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (modal.info) {
      formik.setValues({
        ...formik.values,
        ...modal.info,
        published: modal.info.published ? 'true' : 'false',
      });
    } else {
      formik.resetForm();
    }
  }, [modal.info]);
  const categories = faqCategories?.data?.data;
  return (
    <>
      <BaseDialog
        onClose={onClose}
        isOpen={modal.open}
        title={`${modal.info?._id ? 'ویرایش' : 'ایجاد'} تگ محصول`}
        nameBtnFooter={modal.info?._id ? 'ویرایش' : 'ایجاد'}
        onClickFooter={() => formik.handleSubmit()}
        size="full"
        isLoadingFooterBtn={isPending}
      >
        <div className="mb-4 grid grid-cols-2 gap-4 space-y-2">
          <Input
            formik={formik}
            name="question"
            label={'سوال'}
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />
          <Input
            formik={formik}
            name="answer"
            label={'جواب'}
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />
          <Input
            formik={formik}
            name="order"
            label={'شماره گذاری'}
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />
          <Select
            options={categories?.category}
            nameLabel="title"
            nameValue="_id"
            formik={formik}
            name="category"
            label="انتخاب دسته‌بندی"
          />
          <Select
            label="وضعیت انتشار "
            options={StatusOptionsAdmin}
            nameLabel="label"
            nameValue="value"
            name="published"
            formik={formik}
          />
          <SeoOptions formik={formik} />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionFaq;
