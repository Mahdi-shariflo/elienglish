import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import { ResultAttribute } from '@/lib/product';
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import FormVariableProduct from './FormVariableProduct';
import { Checkbox } from '@heroui/react';
import { Product } from '@/types/home';
import Image from '@/components/common/Image';
import useGlobalStore from '@/store/global-store';

type Props = {
  formik: FormikProps<{ [key: string]: ResultAttribute[] }>;
  idx: number;
  product?: Product;
};
const SelectAttVariableProduct = ({ formik, idx, product }: Props) => {
  const [showVariableForm, setShowVariableForm] = useState(false);
  const { setVerifyDelete } = useGlobalStore();

  const onRemove = () => {
    setVerifyDelete({
      open: true,
      title: 'حذف محصول متغیر',
      updateCache: 'single-product-admin',
      url: `/admin/products/remove/${product?._id}`,
    });

    // const updatedChildren = formik.values.children.filter((_, i) => i !== idx);
    // formik.setFieldValue('children', updatedChildren);
  };
  return (
    <>
      <div className="mt-5 rounded-lg border p-3">
        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center justify-between">
            <Checkbox
              isSelected={
                Array.isArray(formik.values.children[idx]?.variables)
                  ? formik.values.children[idx]?.variables[0].mainVariableProperty || false
                  : false
              }
              onValueChange={(value: boolean) => {
                if (value) {
                  // فقط idx انتخابی میشه true
                  const updated = formik.values.children.map((child, i) => {
                    if (i === idx) {
                      return {
                        ...child,
                        variables: child.variables.map((variable) => ({
                          ...variable,
                          mainVariableProperty: true,
                        })),
                      };
                    }
                    return {
                      ...child,
                      variables: child.variables.map((variable) => ({
                        ...variable,
                        mainVariableProperty: false,
                      })),
                    };
                  });
                  formik.setFieldValue('children', updated);
                } else {
                  // همه میشن false
                  const updated = formik.values.children.map((child) => ({
                    ...child,
                    mainVariableProperty: false,
                    variables: child.variables.map((variable) => ({
                      ...variable,
                      mainVariableProperty: false,
                    })),
                  }));
                  formik.setFieldValue('children', updated);
                }
              }}
              classNames={{
                label:
                  'pr-3 text-[14px] line-clamp-2 whitespace-nowrap !font-regular text-[#0C0C0C]',
                wrapper: 'after:!bg-main',
              }}
            >
              انتخاب به عنوان محصول پیش فرض برای نمایش
            </Checkbox>

            <Button
              onClick={() => onRemove()}
              className="!h-[35px] w-fit min-w-fit !rounded-lg border !px-4 text-gray-500"
            >
              حذف محصول
            </Button>
          </div>

          <div className="flex w-full items-center gap-5">
            <div className="flex w-full items-center gap-3">
              {formik?.values?.properties?.map((item, attrIdx) => {
                if (!item.isVariable) return null;
                const selected = formik.values.children[idx]?.variables?.find(
                  (v: { property: string }) => v.property === item._id
                )?.attribiute?.[0]; // فرض بر اینه که تک‌مقداریه، نه چندتایی

                return (
                  <Select
                    className="!w-full"
                    nameLabel="title"
                    nameValue="_id"
                    options={item.attribiute}
                    key={attrIdx}
                    label={item.title}
                    value={selected} // 👈 نمایش مقدار انتخاب‌شده
                    onChangeValue={(e) => {
                      const variables = [...(formik.values.children[idx]?.variables || [])];

                      // حذف ویژگی قبلی اگه وجود داشت
                      const filtered = variables.filter((v) => v.property !== item._id);

                      // افزودن مقدار جدید
                      const updated = [
                        ...filtered,
                        {
                          property: item._id,
                          attribiute: [e.target.value],
                          // @ts-expect-error idx
                          mainVariableProperty: formik.values.children[idx].mainVariableProperty
                            ? true
                            : false,
                        },
                      ];

                      formik.setFieldValue(`children[${idx}].variables`, updated);
                    }}
                  />
                );
              })}
            </div>
            <Button
              onClick={() => setShowVariableForm(true)}
              className="mt-7 w-[140px] bg-main text-white"
            >
              نمایش محصول
            </Button>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {product?.thumbnailImage?.url && (
              <Image
                alt=""
                className="h-[100px] w-[100px] rounded-lg border"
                src={product?.thumbnailImage.url!}
              />
            )}
            <div className="space-y-3">
              {product?.price && (
                <p className="font-medium">قیمت: {product?.price.toLocaleString()} تومان</p>
              )}
              {product?.discountPrice && (
                <p className="font-light">
                  قیمت ویژه: {product?.discountPrice.toLocaleString()} تومان
                </p>
              )}
            </div>
          </div>
          {product?.count || product?.gtin ? (
            <div className="space-y-3">
              <p className="font-light"> تعداد محصول: {product?.count}</p>
              <p className="font-light"> GTIN: {product?.gtin}</p>
            </div>
          ) : null}
        </div>
      </div>

      {showVariableForm && (
        <FormVariableProduct
          idx={idx}
          formik={formik}
          open={showVariableForm}
          setOpen={setShowVariableForm}
        />
      )}
    </>
  );
};

export default SelectAttVariableProduct;
