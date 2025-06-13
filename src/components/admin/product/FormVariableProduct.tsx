import BaseDialog from '@/components/common/BaseDialog';
import React, { Dispatch } from 'react';
import Media from '../common/Media';
import { FormikProps } from 'formik';
import Input from '@/components/common/form/Input';
import Datepicker from '@/components/common/Datepicker';
import Checkbox from '@/components/common/form/Checkbox';
import { BASEURL } from '@/lib/variable';
type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<any>;
  idx?: number;
};
const FormVariableProduct = ({ open, setOpen, formik, idx }: Props) => {
  const onClose = () => setOpen(!open);

  if (idx === undefined) return null; // اگر idx پاس داده نشده بود، کامپوننت رندر نشه

  const baseName = `children.${idx}`;
  return (
    <BaseDialog
      classBody="!overflow-x-hidden px-4"
      onClickFooter={onClose}
      onClose={onClose}
      isOpen={open}
      title="محصول متغیر"
    >
      <div>
        <Media
          onSelect={(media) => formik.setFieldValue(`${baseName}.thumbnailImage`, media)}
          className="mt-5 flex w-full items-center justify-center"
          withModal
        >
          <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
            {typeof formik.values?.children?.[idx]?.thumbnailImage === 'object' ? (
              <img
                className="h-full w-full object-contain"
                src={`${BASEURL}/${formik.values.children[idx].thumbnailImage.url}`}
                alt="thumbnail"
              />
            ) : (
              <p className="text-center font-regular text-lg">
                انتخاب تصویر محصول <span className="text-red-500">*</span>
              </p>
            )}
          </div>
        </Media>

        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-5">
          <Input
            formik={formik}
            type="tel"
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'gtin'}
            name={`${baseName}.gtin`}
            dir="rtl"
            value={formik.values?.children?.[idx].gtin}
          />
          <Input
            formik={formik}
            type="tel"
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'wooid'}
            name={`${baseName}.wooid`}
            dir="rtl"
            value={formik.values?.children?.[idx].wooid}
          />
          <Input
            formik={formik}
            type="tel"
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'skuId'}
            name={`${baseName}.skuId`}
            dir="rtl"
            value={formik.values?.children?.[idx].skuId}
          />
          <Input
            formik={formik}
            price
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'قیمت عادی (تومان)'}
            name={`${baseName}.price`}
            value={formik.values?.children?.[idx].price}
          />
          <Input
            formik={formik}
            price
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'قیمت ویژه (تومان)'}
            name={`${baseName}.discountPrice`}
            value={formik.values?.children?.[idx].discountPrice}
          />
          <Input
            formik={formik}
            type="tel"
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'تعداد محصول'}
            name={`${baseName}.count`}
            dir="rtl"
            value={formik.values?.children?.[idx].count}
          />
          <Input
            formik={formik}
            price
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'حداقل مقدار سبد خرید (تومان)'}
            name={`${baseName}.minCart`}
            value={formik.values?.children?.[idx].minCart}
          />
          <Datepicker
            minDate={new Date()}
            calendarPosition="top"
            timepicker
            inputClass="!h-[45px]"
            formik={formik}
            name={`${baseName}.discountTime`}
            label="زمان بندی فروش"
            className="col-span-2"
            value={formik.values.children[idx].discountTime}
          />

          <div className="col-span-2 flex w-full items-center justify-between">
            <Checkbox
              isSelected={formik.values.children[idx].singleSale}
              formik={formik}
              name={`${baseName}.singleSale`}
              label="فروش تکی دارد؟"
            />
            <Checkbox
              formik={formik}
              name={`${baseName}.towWorkingDays`}
              label="ارسال تا دو روز کاری دیگر؟"
              isSelected={formik.values.children[idx].towWorkingDays}
            />
            <Checkbox
              isSelected={formik.values.children[idx].freedelivery}
              formik={formik}
              name={`${baseName}.freedelivery`}
              label="این محصول شامل پلن هدیه میشود؟"
            />
          </div>
        </div>
      </div>
    </BaseDialog>
  );
};

export default FormVariableProduct;
