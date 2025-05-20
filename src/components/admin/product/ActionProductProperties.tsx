import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { createURL } from '@/lib/fun';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { TagType } from '@/types';
import { useGetProductTagById } from '@/hooks/admin/products/useGetProductTagById';
import Select from '@/components/common/Select';
import Checkbox from '@/components/common/form/Checkbox';
import { useActionProductProperties } from '@/hooks/admin/products/useActionProductProperties';

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
const ActionProductProperties = ({ modal, setModal }: Props) => {
  const onClose = () => setModal({ info: null, open: false });
  const { mutate, isPending, isSuccess, reset } = useActionProductProperties();
  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
      archive: false,
      displayName: '',
      displayType: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('فیلد اجباری است'),
      displayName: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        title: values.title,
        url: values?.url,
        archive: values.archive,
        displayName: values.displayName,
        displayType: values.displayType,
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
        title={`${modal.info?._id ? 'ویرایش' : 'ایجاد'} ویژگی محصول`}
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
          <Input
            formik={formik}
            name="displayName"
            label={'برچسب نمایش'}
            className="col-span-2"
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />

          <Select
            className="col-span-2"
            formik={formik}
            name="displayType"
            label="نوع نمایش"
            options={[
              { label: 'رنگ', value: 'color' },
              { label: 'متن', value: 'text' },
              { label: 'عکس', value: 'image' },
            ]}
          />

          {/* @ts-expect-error error */}
          <Checkbox formik={formik} name="archive" label="آیا بایگانی شود؟" />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionProductProperties;
