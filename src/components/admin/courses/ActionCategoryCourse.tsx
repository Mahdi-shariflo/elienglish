import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { createURL } from '@/lib/fun';
import { Category } from '@/store/types/home';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import SeoOptions from '../common/SeoOptions';
import Editor from '../common/Editor';
import Media from '../common/Media';
import { useGetCategoryByIdAdmin } from '@/hooks/admin/products/useGetCategoryByIdAdmin';
import { BASEURL } from '@/lib/variable';
import { ActionCategoryProductAdmin } from '@/hooks/admin/products/ActionCategoryProductAdmin';
import { ActionCategoryCourseAdmin } from '@/hooks/admin/courses/ActionCategoryCourseAdmin';
import { useGetCategoryCourseByIdAdmin } from '@/hooks/admin/courses/useGetCategoryCourseByIdAdmin';

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
const ActionCategoryCourse = ({ modal, setModal }: Props) => {
  const {
    isSuccess: isSuccessCategoryUrl,
    data,
    isLoading,
  } = useGetCategoryCourseByIdAdmin({ id: modal.info?._id! });
  const editorRef = useRef<HTMLInputElement | null>(null);
  const onClose = () => setModal({ info: null, open: false, parent: false });
  const { mutate, isPending, isSuccess, reset } = ActionCategoryCourseAdmin();
  const formik = useFormik({
    initialValues: {
      robots: '',
      canonicalurl: '',
      search: '',
      metaDescription: '',
      title: '',
      redirecturl: '',
      metaTitle: '',
      parent: '',
      rebots: '',
      url: '',
      keyWords: '',
      thumbnailimage: null,
      redirectType: '',
      properties: [],
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
        ...(values.redirectType ? { redirectType: values?.redirectType } : null),
        ...(values.redirecturl ? { redirecturl: values.redirecturl } : null),
        ...(values.rebots ? { robots: values.robots } : null),
        ...(values.keyWords ? { keyWords: values.keyWords } : null),
        // @ts-expect-error error
        ...(editorRef?.current?.getContent()
          ? // @ts-expect-error error
            { description: editorRef.current.getContent() }
          : null),
        ...(values.canonicalurl ? { canonicalurl: values.canonicalurl } : null),
        // @ts-expect-error error
        ...(values.thumbnailimage ? { thumbnailimage: values.thumbnailimage._id } : null),
        ...(modal.info?._id && modal.parent ? { parent: modal.info._id } : null),
        ...(Array.isArray(values?.properties)
          ? { properties: values.properties.map((option: any) => option._id) }
          : null),
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
    if (isSuccessCategoryUrl && !modal.parent) {
      const category = data?.data?.data;
      formik.setValues({
        ...category,
        keyWords: category?.keyWords?.join(', '),
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
        title={`${modal.parent ? 'ایجاد زیر' : modal.info?._id ? 'ویرایش' : 'ایجاد'} دسته بندی`}
        nameBtnFooter={modal.parent ? 'ایجاد زیر دسته' : modal.info?._id ? 'ویرایش' : 'ایجاد'}
        onClickFooter={() => formik.handleSubmit()}
        size="full"
        isLoadingFooterBtn={isPending}
      >
        <div className="mb-4 grid grid-cols-2 gap-4 space-y-2">
          <Input
            helperText={
              modal.info?.url && !modal.parent ? modal.info.url : createURL(formik.values.title)
            }
            isAvailable={modal.info?.url ? true : false}
            formik={formik}
            name="title"
            url
            label={'عنوان'}
            className="col-span-2"
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />

          <Media
            withModal
            onSelect={(media) => formik.setFieldValue('thumbnailimage', media)}
            title="انتخاب عکس "
            className="block h-[50px] w-full rounded-lg border bg-[#f5f6f6]"
          >
            <div className="mr-3 flex items-center gap-2">
              {formik.values.thumbnailimage && (
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  // @ts-expect-error error
                  src={`${BASEURL}/${formik?.values?.thumbnailimage?.url}`}
                />
              )}
              <p className="text-right font-regular text-[13px] text-blue-500 underline">
                انتخاب عکس (50px * 50px)
              </p>
            </div>
          </Media>
          <SeoOptions formik={formik} />
          {/* @ts-expect-error error */}
          <Editor editorRef={editorRef} value={formik.values.description} />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionCategoryCourse;
