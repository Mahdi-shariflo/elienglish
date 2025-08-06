import BaseDialog from '@/components/common/BaseDialog';
import Input from '@/components/common/form/Input';
import { removeNumNumeric } from '@/lib/fun';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { TagType } from '@/store/types';
import Select from '@/components/common/Select';
import Media from '../common/Media';
import { BASEURL } from '@/lib/variable';
import Datepicker from '@/components/common/Datepicker';
import { useActionLpa } from '@/hooks/admin/lpa/useActionLpa';
import { converDateGre, converDatePer } from '@/lib/convert';

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
  const onClose = () => setModal({ info: null, open: false });
  const { mutate, isPending, isSuccess, reset } = useActionLpa();
  const formik = useFormik({
    initialValues: {
      teacherProfile: '',
      type: '',
      teacherName: '',
      date: '',
      price: '',
      discountPrice: '',
      status: '',
      weekday: '',
      title: '',
    },
    validationSchema: Yup.object({
      teacherProfile: Yup.string().required('فیلد اجباری است'),
      type: Yup.string().required('فیلد اجباری است'),
      teacherName: Yup.string().required('فیلد اجباری است'),
      date: Yup.string().required('فیلد اجباری است'),
      discountPrice: Yup.string().required('فیلد اجباری است'),
      status: Yup.string().required('فیلد اجباری است'),
      weekday: Yup.string().required('فیلد اجباری است'),
      title: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        price: Number(removeNumNumeric(values.price)),
        discountPrice: Number(removeNumNumeric(values.discountPrice)),
        date: converDateGre(values.date, 'YYYY-MM-DD'),
        time: converDateGre(values.date, 'HH:mm:ss'),
        status: values.status,
        weekday: values.weekday,
        title: values.title,
        type: values.type,
        teacherName: values.teacherName,
        teacherProfile: values.teacherProfile,
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
    }
  }, [modal.info]);

  return (
    <>
      <BaseDialog
        onClose={onClose}
        isOpen={modal.open}
        title={`${modal.info?._id ? 'ویرایش' : 'ایجاد'} تعین سطح `}
        nameBtnFooter={modal.info?._id ? 'ویرایش' : 'ایجاد'}
        onClickFooter={() => formik.handleSubmit()}
        size="4xl"
        isLoadingFooterBtn={isPending}
        classBody="!overflow-x-hidden px-10"
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
                  src={`${formik.values?.teacherProfile}`}
                  alt="thumbnail"
                />
              ) : (
                <span className="font-medium">عکس استاد</span>
              )}
            </div>
          </Media>
          <Input
            formik={formik}
            name="title"
            label={'عنوان'}
            classNameInput={'!h-[50px] !bg-[#f5f6f6]'}
          />
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
          <Datepicker
            calendarPosition="absoulte"
            name="date"
            label="زمان و تاریخ"
            formik={formik}
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
        </div>
      </BaseDialog>
    </>
  );
};

export default ActionLpa;
