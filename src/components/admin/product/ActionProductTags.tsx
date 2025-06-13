import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { createURL } from '@/lib/fun';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import SeoOptions from '../common/SeoOptions';
import Editor from '../common/Editor';
import { TagType } from '@/types';
import { useActionProductTags } from '@/hooks/admin/products/useActionProductTags';
import { useGetProductTagById } from '@/hooks/admin/products/useGetProductTagById';

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
const ActionProductTags = ({ modal, setModal }: Props) => {
  const {
    isSuccess: isSuccessCategoryUrl,
    data,
    isLoading,
  } = useGetProductTagById({ id: modal.info?._id! });
  const editorRef = useRef<HTMLInputElement | null>(null);
  const onClose = () => setModal({ info: null, open: false });
  const { mutate, isPending, isSuccess, reset } = useActionProductTags();
  const formik = useFormik({
    initialValues: {
      robots: '',
      canonicalurl: '',
      metaDescription: '',
      description: '',
      title: '',
      redirecturl: '',
      metaTitle: '',
      rebots: '',
      url: '',
      keyWords: '',
      redirecturltype: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        title: values.title,
        url: values?.url,
        ...(values.metaTitle ? { metaTitle: values.metaTitle } : null),
        ...(values.metaDescription ? { metaDescription: values.metaDescription } : null),
        ...(values.redirecturltype ? { redirecturltype: values?.redirecturltype } : null),
        ...(values.redirecturl ? { redirecturl: values.redirecturl } : null),
        ...(values.rebots ? { robots: values.robots } : null),
        ...(values.keyWords ? { keyWords: values.keyWords } : null),
        // @ts-expect-error error
        ...(editorRef?.current?.getContent()
          ? // @ts-expect-error error
            { description: editorRef.current.getContent() }
          : null),
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
    if (isSuccessCategoryUrl) {
      const tags = data?.data?.data.ProductTag[0];
      formik.setValues({
        ...tags,
        keyWords: tags?.keyWords?.join(', '),
      });
    } else {
      formik.resetForm();
    }
  }, [isSuccessCategoryUrl]);

  return (
    <>
      <BaseDialog
        isLoading={isLoading}
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
            helperText={modal.info?.url ? modal.info.url : createURL(formik.values.title)}
            isAvailable={modal.info?.url ? true : false}
            formik={formik}
            name="title"
            url
            label={'عنوان'}
            className="col-span-2"
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />

          <SeoOptions formik={formik} />
          {/* @ts-expect-error error */}
          <Editor editorRef={editorRef} value={formik.values.description} />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionProductTags;
