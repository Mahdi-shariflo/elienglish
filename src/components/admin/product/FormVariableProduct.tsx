import BaseDialog from '@/components/common/BaseDialog';
import React, { Dispatch } from 'react';
import Media from '../common/Media';
import { FormikProps } from 'formik';
import Input from '@/components/common/form/Input';
import { BASEURL } from '@/lib/variable';
import Select from '@/components/common/Select';
import { StatusOptionsAdmin } from '@/lib/data';
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
          <Select
            label="نوع محصول"
            options={[
              { label: 'فیزیکی', value: 'physical' },
              { label: 'دیجیتال', value: 'digital' },
            ]}
            nameLabel="label"
            nameValue="value"
            name={`${baseName}.type`}
            formik={formik}
            value={formik.values?.children?.[idx].type}
          />
          <Select
            label="وضعیت انتشار "
            options={StatusOptionsAdmin}
            nameLabel="label"
            nameValue="value"
            name={`${baseName}.published`}
            formik={formik}
            value={formik.values?.children?.[idx].published ? 'true' : 'false'}
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
            label={'قیمت  پیشنهادی'}
            name={`${baseName}.suggestedDiscount`}
            value={formik.values?.children?.[idx].suggestedDiscount}
          />
          <Input
            formik={formik}
            price
            classNameInput="!h-[48px] bg-[#f5f6f6]"
            label={'قیمت  تخفیف خورده'}
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
        </div>
      </div>
    </BaseDialog>
  );
};

export default FormVariableProduct;
