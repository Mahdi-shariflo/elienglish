import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import { useActionCategoryBlog } from '@/hooks/admin/blogs/useActionCategoryBlog';
import { createURL } from '@/lib/fun';
import { Category } from '@/store/types/home';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Media from '../common/Media';
import { ThumbnailImage } from '@/store/types';
import { BASEURL } from '@/lib/variable';
import { useGetCategoryByBlog } from '@/hooks/admin/blogs/useGetCategoryByBlog';

type Props = {
  modal: {
    open: boolean;
    info: null | Category;
    parent: boolean;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: null | Category;
      parent: boolean;
    }>
  >;
};
const ActionCategoryBlog = ({ modal, setModal }: Props) => {
  const onClose = () => setModal({ info: null, open: false, parent: false });
  const { data: singleCategory } = useGetCategoryByBlog({ id: modal.info?._id });
  const { mutate, isPending, isSuccess, reset } = useActionCategoryBlog();
  const formik = useFormik<{
    url: null | string;
    title: string;
    description: string;
    thumbnailImage: undefined | ThumbnailImage;
  }>({
    initialValues: {
      title: '',
      url: null,
      description: '',
      thumbnailImage: undefined,
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
        ...(values.thumbnailImage ? { thumbnailImage: values.thumbnailImage._id } : null),
        url: values?.url ? values?.url : createURL(values.title),
        ...(modal.info?._id && modal.parent ? { parent: modal.info._id } : null),
      };
      mutate({ data, id: modal.parent ? '' : modal.info?._id! });
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
    if (singleCategory && !modal.parent) {
      const blog = singleCategory?.data?.data;
      formik.setValues({
        title: blog?.title!,
        url: modal?.info?.url!,
        description: blog?.description!,
        thumbnailImage: blog?.thumbnailImage,
      });
    }
  }, [singleCategory]);
  return (
    <>
      <BaseDialog
        onClose={onClose}
        isOpen={modal.open}
        title={`${modal.parent ? 'ایجاد زیر' : modal.info?._id ? 'ویرایش' : 'ایجاد'} دسته بندی`}
        nameBtnFooter={modal.parent ? 'ایجاد زیر دسته' : modal.info?._id ? 'ویرایش' : 'ایجاد'}
        onClickFooter={() => formik.handleSubmit()}
        size="xl"
        isLoadingFooterBtn={isPending}
      >
        <div className="mb-4 space-y-2">
          <Media
            className="w-full"
            withModal
            onSelect={(img) => formik.setFieldValue('thumbnailImage', img)}
          >
            <div className="mx-auto flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-xl border px-3">
              {typeof formik.values.thumbnailImage === 'object' ? (
                <img
                  className="h-full w-full object-contain"
                  src={`${BASEURL}/${formik.values?.thumbnailImage?.url}`}
                  alt="thumbnail"
                />
              ) : (
                <p className="text-center font-regular text-lg">
                  انتخاب پوستر <span className="text-red-500">*</span>
                </p>
              )}
            </div>
          </Media>
          <Input
            helperText={
              modal.info?.url && !modal.parent ? modal.info.url : createURL(formik.values.title)
            }
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

export default ActionCategoryBlog;
