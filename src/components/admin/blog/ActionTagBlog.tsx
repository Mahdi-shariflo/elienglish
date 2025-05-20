import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import { useActionTagMag } from '@/hooks/admin/blogs/useActionTagMag';
import { createURL } from '@/lib/fun';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
type Tag = {
  _id?: string;
  title: string;
  url: string;
  description: string;
};
type Props = {
  modal: {
    open: boolean;
    info: null | Tag;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: null | Tag;
    }>
  >;
};
const ActionTagBlog = ({ modal, setModal }: Props) => {
  const onClose = () => setModal({ info: null, open: false });
  const { mutate, isPending, isSuccess, reset } = useActionTagMag();
  const formik = useFormik<{ url: null | string; title: string; description: string }>({
    initialValues: {
      title: '',
      url: null,
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
      description: Yup.string()
        .min(30, 'توضیحات نباید کمتر از 30 کارکتر باشد')
        .required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        ...values,
        url: values?.url ? values?.url : createURL(values.title),
      };
      mutate({ data, id: modal.info?._id! });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      onClose();
      setModal({ info: null, open: false });
      formik.resetForm();
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (modal.info) {
      formik.setValues({
        title: modal.info?.title,
        url: modal?.info?.url!,
        description: modal.info?.description,
      });
    }
  }, [modal.info]);
  return (
    <>
      <BaseDialog
        onClose={onClose}
        isOpen={modal.open}
        title={`${modal.info?._id ? 'ویرایش' : 'ایجاد'} تگ`}
        nameBtnFooter={modal.info?._id ? 'ویرایش' : 'ایجاد'}
        onClickFooter={() => formik.handleSubmit()}
        size="xl"
        isLoadingFooterBtn={isPending}
      >
        <div className="mb-4 space-y-2">
          <Input
            helperText={modal.info?.url ? modal.info.url : createURL(formik.values.title)}
            isAvailable={Boolean(modal.info?.url)}
            formik={formik}
            name="title"
            url
            label={'عنوان'}
          />
          <Textarea label={'توضیحات'} formik={formik} name="description" />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionTagBlog;
