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
import { useGetCategoryProductWithChildrenAdmin } from '@/hooks/admin/products/useGetCategoryProductWithChildrenAdmin';
import UsersSelect from './UsersSelect';
import * as Yup from 'yup';
import Button from '../common/Button';
import { TbReload } from 'react-icons/tb';
import { generateRandomString } from '@/lib/fun';
import { useActionDiscount } from '@/hooks/admin/discounts/useActionDiscount';
import { converDateGre, removeNumNumeric } from '@/lib/convert';
import { User } from '@/types';
import { useGetDiscountAdminById } from '@/hooks/admin/discounts/useGetDiscountAdminById';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';

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
  const { data } = useGetCategoryProductWithChildrenAdmin({});
  const onClose = () => setModal({ open: false, id: '' });
  const formik = useFormik({
    initialValues: {
      discountCode: null,
      description: null,
      discountCodeType: 'fixed',
      discountCodeItemType: '',
      freeShipping: false,
      generalDiscount: false,
      published: false,
      minimumCost: null,
      maximumCost: null,
      IndividualUse: true,
      withOutSpecialProduct: [],
      withOutProducts: [],
      withOutProductCategori: [],
      products: [],
      productCategori: [],
      userLimit: null,
      installmentPaymentLimit: false,
      restrictionsOnUse: null,
      limitForEachUser: null,
      epirationDate: null,
      discountCodePrice: null,
    },
    validationSchema: Yup.object({
      discountCode: Yup.string().required('فیلد اجباری است'),
      discountCodePrice: Yup.string().required('فیلد اجباری است'),
      epirationDate: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        ...(Array.from(values.withOutProductCategori).length >= 1
          ? {
              withOutProductCategori: Array.from(values.withOutProductCategori).join(','),
            }
          : null),
        ...(values.withOutProducts.length >= 1
          ? {
              withOutProducts: values.withOutProducts.map((item: any) => item._id).join(','),
            }
          : null),
        ...(values.products.length >= 1
          ? { products: values.products.map((item: any) => item._id).join(',') }
          : null),
        ...(Array.from(values.productCategori).length >= 1
          ? {
              productCategori: Array.from(values.productCategori).join(','),
            }
          : null),
        ...(values.userLimit
          ? {
              // @ts-expect-error error
              userLimit: values.userLimit._id,
            }
          : null),
        ...(values.discountCodeType ? { discountCodeType: values.discountCodeType } : null),
        ...(values.epirationDate ? { epirationDate: converDateGre(values.epirationDate) } : null),
        ...(values.discountCode ? { discountCode: values.discountCode } : null),
        ...(values.description ? { description: values.description } : null),
        ...(values.freeShipping !== undefined ? { freeShipping: values.freeShipping } : null),
        ...(values.generalDiscount !== undefined
          ? { generalDiscount: values.generalDiscount }
          : null),
        ...(values.published !== undefined ? { published: values.published } : null),
        ...(values.minimumCost ? { minimumCost: removeNumNumeric(values.minimumCost) } : null),
        ...(values.maximumCost ? { maximumCost: removeNumNumeric(values.maximumCost) } : null),
        ...(values.IndividualUse !== undefined ? { IndividualUse: values.IndividualUse } : null),
        ...(values.withOutSpecialProduct !== undefined
          ? { withOutSpecialProduct: values.withOutSpecialProduct }
          : null),
        ...(values.restrictionsOnUse
          ? { restrictionsOnUse: Number(values.restrictionsOnUse) }
          : null),
        ...(values.limitForEachUser ? { limitForEachUser: Number(values.limitForEachUser) } : null),
        ...(values.installmentPaymentLimit !== undefined
          ? { installmentPaymentLimit: values.installmentPaymentLimit }
          : null),
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
      const discount = singleDiscount.data.data.discountCode[0];
      formik.setValues({
        ...formik.values,
        ...discount,
        withOutProductCategori: new Set(
          discount.withOutProductCategori.map((item: { _id: string }) => item._id)
        ),
        productCategori: new Set(discount.productCategori.map((item: { _id: string }) => item._id)),
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
            { label: 'درصد', value: 'percent' },
            { label: 'ثابت', value: 'fixed' },
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
            { label: 'ثابت', value: 'fixed' },
          ]}
        />
        <Input
          classNameInput={'bg-[#f5f6f6] !h-[48px]'}
          name="minimumCost"
          label={'حداقل هزینه'}
          formik={formik}
          price
          disabled={formik.values.maximumCost ? true : false}
        />
        <Input
          classNameInput={'bg-[#f5f6f6] !h-[48px]'}
          name="maximumCost"
          label={'حداکثر هزینه'}
          formik={formik}
          price
          disabled={formik.values.minimumCost ? true : false}
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
          label={`${formik.values.discountCodeType === 'fixed' ? 'مبلغ' : 'درصد'} کد تخفیف`}
          formik={formik}
          isRequired
          price={formik.values.discountCodeType === 'fixed' ? true : false}
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
        <div className="col-span-3 flex items-center gap-10">
          <ProductsSelect
            onChange={(value) => formik.setFieldValue('products', value)}
            values={formik.values.products}
            title="انتخاب محصولات"
          />
          <ProductsSelect
            onChange={(value) => formik.setFieldValue('withOutProducts', value)}
            values={formik.values.withOutProducts}
            title="به جز این محصولات"
          />
        </div>
        <div className="col-span-3 flex items-center gap-10">
          <ReactSelect
            label="دسته‌‌های محصولات"
            className="w-full"
            options={data?.data.data.categories}
            nameLabel="title"
            nameValue="_id"
            // @ts-expect-error error
            formik={formik}
            selectionMode="multiple"
            triggerClass="!h-[48px]"
            name="productCategori"
          />
          <ReactSelect
            label="به جز این دسته‌بندی ها"
            className="w-full"
            options={data?.data.data.categories}
            nameLabel="title"
            nameValue="_id"
            // @ts-expect-error error
            formik={formik}
            selectionMode="multiple"
            triggerClass="!h-[48px]"
            name="withOutProductCategori"
          />
        </div>

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
          label="ارسال رایگان"
          // @ts-expect-error error
          formik={formik}
          name="freeShipping"
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
        <Checkbox
          label="محدوده‌ی استفاده ار درگاه پرداخت قسطی"
          name="installmentPaymentLimit"
          // @ts-expect-error error
          formik={formik}
        />
        <Checkbox
          label="جز محصولات فروش ویژه"
          name="withOutSpecialProduct"
          // @ts-expect-error error
          formik={formik}
        />
      </div>
    </BaseDialog>
  );
};

export default ActionDiscountCode;
