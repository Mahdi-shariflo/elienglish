import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { createURL } from '@/lib/fun';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { TagType } from '@/types';
import { useGetProductTagById } from '@/hooks/admin/products/useGetProductTagById';
import Textarea from '@/components/common/form/Textarea';
import { useActionFaq } from '@/hooks/admin/faq/useActionFaq';
import { useActionFaqCategories } from '@/hooks/admin/faq/useActionFaqCategories';

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
const ActionFaqCategories = ({ modal, setModal }: Props) => {
  const onClose = () => setModal({ info: null, open: false });
  const { mutate, isPending, isSuccess, reset } = useActionFaqCategories();
  const formik = useFormik({
    initialValues: {
      description: '',
      title: '',

      url: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        title: values.title,
        url: values?.url,
        description: values.description,
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
      });
    } else {
      formik.resetForm();
    }
  }, [modal.info]);

  return (
    <>
      <BaseDialog
        onClose={onClose}
        isOpen={modal.open}
        title={`${modal.info?._id ? 'ویرایش' : 'ایجاد'} دسته‌بندی محصول`}
        nameBtnFooter={modal.info?._id ? 'ویرایش' : 'ایجاد'}
        onClickFooter={() => formik.handleSubmit()}
        size="lg"
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
          <Textarea formik={formik} name="description" label={'توضیحات'} className="col-span-2" />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionFaqCategories;
