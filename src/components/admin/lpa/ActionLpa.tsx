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
import { useGetCategoriesFaqAdmin } from '@/hooks/admin/faq/useGetCategoriesFaqAdmin';
import Select from '@/components/common/Select';
import { StatusOptionsAdmin } from '@/lib/data';
import { useActionFaq } from '@/hooks/admin/faq/useActionFaq';
import Media from '../common/Media';
import { BASEURL } from '@/lib/variable';
import Datepicker from '@/components/common/Datepicker';

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
const ActionLpa = ({ modal, setModal }: Props) => {
  const {
    isSuccess: isSuccessCategoryUrl,
    data,
    isLoading,
  } = useGetProductTagById({ id: modal.info?._id! });
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
      redirecturltype: '',
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
        ...(values.metaTitle ? { metaTitle: values.metaTitle } : null),
        ...(values.metaDescription ? { metaDescription: values.metaDescription } : null),
        ...(values.redirecturltype ? { redirecturltype: values?.redirecturltype } : null),
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
    if (isSuccessCategoryUrl) {
      const tags = data?.data?.data;
      formik.setValues({
        ...tags,
        keyWords: tags?.keyWords?.join(', '),
      });
    } else {
      formik.resetForm();
    }
  }, [isSuccessCategoryUrl]);
  const categories = faqCategories?.data?.data;
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
          <Media
            className="mx-auto flex w-full items-center justify-center"
            withModal
            // @ts-expect-error error
            onSelect={(img) => formik.setFieldValue('teacherProfile', `${BASEURL}/${img.url}`)}
          >
            <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border">
              {formik.values?.teacherProfile ? (
                <img
                  className="h-full w-full object-contain"
                  // @ts-expect-error error
                  src={`${formik.values?.teacherProfile}`}
                  alt="thumbnail"
                />
              ) : (
                <span className="font-medium">عکس استاد</span>
              )}
            </div>
          </Media>
          <Select
            options={[
              { label: 'تعین سطح', value: 'LEVEL_TEST' },
              { label: 'تعین سطح+مشاوره', value: 'LEVEL_TEST_WITH_COUNSELING' },
            ]}
            nameLabel="label"
            nameValue="value"
            formik={formik}
            name="type"
            label="نوع"
          />
          <Input
            formik={formik}
            name="teacherName"
            label={'نام استاد'}
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />
          <Datepicker name="date" label="تاریخ" formik={formik} />
          <Datepicker name="time" label="زمان" timepicker formik={formik} />
          <Input
            formik={formik}
            name="price"
            price
            label={'مبلغ'}
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />
          <Input
            formik={formik}
            name="discountPrice"
            price
            label={'مبلغ تخفیف'}
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />

          <Select
            label="وضعیت  "
            options={[
              { label: 'موجود', value: 'AVAILABLE' },
              { label: 'رزرو شده', value: 'RESERVED' },
            ]}
            nameLabel="label"
            nameValue="value"
            name="status"
            formik={formik}
          />
          <Select
            label="روز"
            options={[
              { label: 'شنبه', value: 'SATURDAY' },
              { label: 'یک‌شنبه', value: 'SUNDAY' },
              { label: 'دوشنبه', value: 'MONDAY' },
              { label: 'سه‌شنبه', value: 'TUESDAY' },
              { label: 'چهارشنبه', value: 'WEDNESDAY' },
              { label: 'پنج‌شنبه', value: 'THURSDAY' },
              { label: 'جمعه', value: 'FRIDAY' },
            ]}
            nameLabel="label"
            nameValue="value"
            name="weekday"
            formik={formik}
          />
          <SeoOptions formik={formik} />
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionLpa;
