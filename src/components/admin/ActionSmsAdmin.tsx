import React, { useEffect } from 'react';
import BaseDialog from '../common/BaseDialog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../common/form/Input';
import Textarea from '../common/form/Textarea';
import { useActionSmsAdmin } from '@/hooks/admin/sms/useActionSmsAdmin';
type Props = {
  modal: {
    open: boolean;
    info?: {
      postTitle: string;
      postDescription: string;
      _id?: string;
    } | null;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: {
        postTitle: string;
        postDescription: string;
      } | null;
    }>
  >;
};
const ActionSmsAdmin = ({ modal, setModal }: Props) => {
  const { mutate, isPending, isSuccess } = useActionSmsAdmin();
  const onClose = () => setModal({ open: false, info: null });
  const formik = useFormik({
    initialValues: {
      postTitle: '',
      postDescription: '',
    },
    validationSchema: Yup.object({
      postTitle: Yup.string().required('فیلد اجباری است'),
      postDescription: Yup.string()
        .min(30, 'توضیحات نباید کمتر از 30 کارکتر باشد')
        .required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      mutate({ data: values, id: modal?.info?._id! });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      onClose();
      formik.resetForm();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (modal.info) {
      formik.setValues({
        postTitle: modal.info.postTitle,
        postDescription: modal.info.postDescription,
      });
    }
  }, [modal.info]);
  return (
    <BaseDialog
      isOpen={modal.open}
      title={modal.info ? 'ویرایش پیام' : 'ایجاد پیام جدید'}
      onClose={onClose}
      onClickFooter={() => formik.handleSubmit()}
      isLoadingFooterBtn={isPending}
      nameBtnFooter={modal.info ? 'ویرایش پیام' : 'ایجاد پیام '}
    >
      <div className="mb-4 space-y-2">
        <Input formik={formik} name="postTitle" label={'عنوان'} classNameInput={'!h-[45px]'} />
        <Textarea label={'توضیحات'} formik={formik} name="postDescription" />
      </div>
    </BaseDialog>
  );
};

export default ActionSmsAdmin;
