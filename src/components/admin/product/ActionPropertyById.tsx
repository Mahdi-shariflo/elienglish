import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { createURL, removeEmptyFields } from '@/lib/fun';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import SeoOptions from '../common/SeoOptions';
import Editor from '../common/Editor';
import { TagType } from '@/types';
import { useActionPropertyById } from '@/hooks/admin/products/useActionPropertyById';
import { useGetPropertyDetailId } from '@/hooks/admin/products/useGetPropertyDetailId';
import { useParams, useSearchParams } from 'next/navigation';

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
const ActionPropertyById = ({ modal, setModal }: Props) => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('displayType');
  const {
    isSuccess: isSuccessCategoryUrl,
    data,
    isLoading,
  } = useGetPropertyDetailId({ id: modal.info?._id! });
  const editorRef = useRef<HTMLInputElement | null>(null);
  const onClose = () => setModal({ info: null, open: false });
  const { mutate, isPending, isSuccess, reset } = useActionPropertyById();
  const formik = useFormik({
    initialValues: {
      robots: '',
      canonicalurl: '',
      metaDescription: '',
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
      const data = removeEmptyFields({
        ...values,
        property: id,
        // @ts-expect-error error
        description: editorRef.current.getContent(),
      });
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
      const attribiute = data?.data?.data.attribiute[0];
      formik.setValues({
        ...attribiute,
        keyWords: attribiute?.keyWords?.join(', '),
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
        title={`${modal.info?._id ? 'ویرایش' : 'ایجاد'}  مشخصه `}
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
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />
          {type === 'color' ? (
            <Input
              formik={formik}
              name="color"
              type="color"
              label={'انتخاب رنگ'}
              classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
            />
          ) : null}

          <SeoOptions formik={formik} />
          {/* @ts-expect-error error */}
          <Editor editorRef={editorRef} value={formik.values.description} />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionPropertyById;
