'use client';
import React, { useEffect } from 'react';
import BaseDialog from '../common/BaseDialog';
import Input from '../common/form/Input';
import Textarea from '../common/form/Textarea';
import Checkbox from '../common/form/Checkbox';
import ReactSelect from '../common/form/ReactSelect';
import ProductsSelect from './product/ProductsSelect';
import { useFormik } from 'formik';
import Datepicker from '../common/Datepicker';
import UsersSelect from './UsersSelect';
import * as Yup from 'yup';
import Button from '../common/Button';
import { TbReload } from 'react-icons/tb';
import { generateRandomString } from '@/lib/fun';
import { useActionDiscount } from '@/hooks/admin/discounts/useActionDiscount';
import { converDateGre, removeNumNumeric } from '@/lib/convert';
import { useGetDiscountAdminById } from '@/hooks/admin/discounts/useGetDiscountAdminById';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import SelectCourse from './courses/SelectCourse';
import SelectLpa from './lpa/SelectLpa';

type Props = {
  modal: {
    open: boolean;
    id?: string;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: string;
    }>
  >;
};
const ActionDiscountCode = ({ modal, setModal }: Props) => {
  const {
    data: singleDiscount,
    isSuccess: isSuccessSingle,
    isLoading,
  } = useGetDiscountAdminById({ id: modal.id });
  const { mutate, isPending, isSuccess } = useActionDiscount();
  const onClose = () => setModal({ open: false, id: '' });
  const formik = useFormik({
    initialValues: {
      discountCode: null,
      description: null,
      discountCodeType: 'FIXED',
      discountCodeItemType: '',
      freeShipping: false,
      generalDiscount: false,
      published: false,
      IndividualUse: true,
      products: [],
      courses: [],
      lpas: [],
      userLimit: null,
      restrictionsOnUse: null,
      limitForEachUser: null,
      epirationDate: null,
      discountCodePrice: null,
    },
    validationSchema: Yup.object({
      discountCode: Yup.string().required('فیلد اجباری است'),
      discountCodePrice: Yup.string().required('فیلد اجباری است'),
      epirationDate: Yup.string().required('فیلد اجباری است'),
      discountCodeItemType: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        ...(values.products.length >= 1
          ? { products: values.products.map((item: any) => item._id) }
          : null),
        ...(values.courses.length >= 1
          ? { courses: values.courses.map((item: any) => item._id) }
          : null),
        ...(values.lpas.length >= 1 ? { lpas: values.lpas.map((item: any) => item._id) } : null),
        ...(values.userLimit
          ? {
              // @ts-expect-error error
              userLimit: values.userLimit._id,
            }
          : null),
        ...(values.discountCodeType ? { discountCodeType: values.discountCodeType } : null),
        ...(values.discountCodeItemType
          ? { discountCodeItemType: values.discountCodeItemType }
          : null),
        ...(values.epirationDate ? { epirationDate: converDateGre(values.epirationDate) } : null),
        ...(values.discountCode ? { discountCode: values.discountCode } : null),
        ...(values.description ? { description: values.description } : null),
        ...(values.freeShipping !== undefined ? { freeShipping: values.freeShipping } : null),
        ...(values.generalDiscount !== undefined
          ? { generalDiscount: values.generalDiscount }
          : null),
        ...(values.published !== undefined ? { published: values.published } : null),
        ...(values.IndividualUse !== undefined ? { IndividualUse: values.IndividualUse } : null),
        ...(values.restrictionsOnUse
          ? { restrictionsOnUse: Number(values.restrictionsOnUse) }
          : null),
        ...(values.limitForEachUser ? { limitForEachUser: Number(values.limitForEachUser) } : null),
        ...(values.discountCodePrice
          ? {
              discountCodePrice: Number(removeNumNumeric(values.discountCodePrice)),
            }
          : null),
      };

      mutate({ data, id: modal.id! });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onClose();
      formik.resetForm();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessSingle) {
      const discount = singleDiscount.data.data;
      formik.setValues({
        ...formik.values,
        ...discount,
      });
    }
  }, [isSuccessSingle]);
  return (
    <BaseDialog
      isLoading={isLoading}
      isOpen={modal.open}
      title={'ایجاد کد تخفیف'}
      size="full"
      onClickFooter={() => formik.handleSubmit()}
      onClose={onClose}
      isLoadingFooterBtn={isPending}
    >
      <div className="grid grid-cols-3 gap-4 px-4 pb-10">
        <Input
          classNameInput={'bg-[#f5f6f6] !h-[48px]'}
          label={'کد تخفیف'}
          formik={formik}
          name="discountCode"
          isRequired
          startContent={
            <Button
              // @ts-expect-error error
              onClick={() => formik.setFieldValue('discountCode', generateRandomString())}
              className="w-fit min-w-fit"
            >
              <TbReload className="text-[#0c0c0c]" size={23} />
            </Button>
          }
        />
        <ReactSelect
          label={'نوع کد تخفیف'}
          // @ts-expect-error error
          formik={formik}
          name="discountCodeType"
          triggerClass="!h-[48px]"
          options={[
            { label: 'درصد', value: 'PERCENT' },
            { label: 'ثابت', value: 'FIXED' },
          ]}
        />
        <ReactSelect
          label={'نوع کد تخفیف محصولات'}
          // @ts-expect-error error
          formik={formik}
          name="discountCodeItemType"
          triggerClass="!h-[48px]"
          options={[
            { label: 'محصولات فیزیکی', value: 'PRODUCT_PHYSICAL' },
            { label: 'محصولات دیجیتال', value: 'PRODUCT_DIGITAL' },
            { label: 'دوره', value: 'COURSE' },
            { label: 'تعین سطح', value: 'LEVEL' },
          ]}
        />
        <Input
          classNameInput={'bg-[#f5f6f6] !h-[48px]'}
          name="limitForEachUser"
          formik={formik}
          label={'محدودیت استفاده برای هر کاربر'}
        />
        <Input
          classNameInput={'bg-[#f5f6f6] !h-[48px]'}
          name="restrictionsOnUse"
          formik={formik}
          label={'محدودیت استفاده از کد تخفیف'}
        />
        <Input
          classNameInput={'bg-[#f5f6f6] !h-[48px]'}
          name="discountCodePrice"
          label={`${formik.values.discountCodeType === 'FIXED' ? 'مبلغ' : 'درصد'} کد تخفیف`}
          formik={formik}
          isRequired
          price={formik.values.discountCodeType === 'FIXED' ? true : false}
        />
        <Datepicker
          formik={formik}
          name="epirationDate"
          inputClass="!h-[48px]"
          calendarPosition="bottom"
          minDate={new DateObject({ calendar: persian })}
          isRequired
          label="تاریخ انقضا"
        />
        <ProductsSelect
          onChange={(value) => formik.setFieldValue('products', value)}
          values={formik.values.products}
          title="انتخاب محصولات"
        />
        <SelectCourse
          onChange={(value) => formik.setFieldValue('courses', value)}
          values={formik.values.courses}
          title="انتخاب دوره"
        />
        <SelectLpa
          onChange={(value) => formik.setFieldValue('lpas', value)}
          values={formik.values.lpas}
          title="انتخاب تعین سطح"
        />

        <UsersSelect
          isMulti={false}
          onChange={(values) => formik.setFieldValue('userLimit', values)}
          values={formik.values.userLimit || undefined}
          className="col-span-3"
        />
        <Textarea
          label={'توضیح مختصر درباری کد تخفیف'}
          className="col-span-3"
          name="description"
          formik={formik}
        />

        <Checkbox
          label="عمومی شود"
          name="generalDiscount"
          // @ts-expect-error error
          formik={formik}
        />
        <Checkbox
          label="انتشار"
          name="published"
          // @ts-expect-error error
          formik={formik}
        />
        <Checkbox
          label="استفاده فردی"
          name="IndividualUse"
          // @ts-expect-error error
          formik={formik}
        />
      </div>
    </BaseDialog>
  );
};

export default ActionDiscountCode;
