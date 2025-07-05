import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { createURL } from '@/lib/fun';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { TagType } from '@/types';
import Textarea from '@/components/common/form/Textarea';
import { useActionFaqCategories } from '@/hooks/admin/faq/useActionFaqCategories';
import SeoOptions from '../common/SeoOptions';
import Media from '../common/Media';
import { BASEURL } from '@/lib/variable';

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
      thumbnailImage: undefined,
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
        // @ts-expect-error error
        thumbnailImage: values.thumbnailImage._id,
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
        title={`${modal.info?._id ? 'ویرایش' : 'ایجاد'} دسته‌بندی سوالات متداول`}
        nameBtnFooter={modal.info?._id ? 'ویرایش' : 'ایجاد'}
        onClickFooter={() => formik.handleSubmit()}
        size="full"
        isLoadingFooterBtn={isPending}
      >
        <div className="mb-4 grid grid-cols-2 gap-4 space-y-2">
          <Media
            className="w-full"
            withModal
            onSelect={(img) => formik.setFieldValue('thumbnailImage', img)}
          >
            <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border">
              {typeof formik.values.thumbnailImage === 'object' ? (
                <img
                  className="h-full w-full object-contain"
                  // @ts-expect-error error
                  src={`${BASEURL}/${formik.values?.thumbnailImage?.url}`}
                  alt="thumbnail"
                />
              ) : (
                <p className="text-center font-regular text-lg">
                  انتخاب تصویر <span className="text-red-500">*</span>
                </p>
              )}
            </div>
          </Media>
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
          <SeoOptions formik={formik} />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionFaqCategories;
