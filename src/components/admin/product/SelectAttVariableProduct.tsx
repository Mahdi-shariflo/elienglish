import Button from '@/components/common/Button';
import { ResultAttribute } from '@/lib/product';
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import FormVariableProduct from './FormVariableProduct';
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
    if (product?._id) {
      setVerifyDelete({
        open: true,
        title: 'حذف محصول متغیر',
        updateCache: 'single-product-admin',
        url: `/admin/products/remove/${product?._id}`,
      });
    }
    const updatedChildren = formik.values.children.filter((_, i) => i !== idx);
    formik.setFieldValue('children', updatedChildren);
  };
  return (
    <>
      <div className="mt-5 rounded-lg border p-3">
        <div className="flex w-full justify-between gap-5">
          <Button
            onClick={() => onRemove()}
            className="!h-[35px] w-fit min-w-fit !rounded-lg border !px-4 text-gray-500"
          >
            حذف محصول
          </Button>
          <Button
            onClick={() => setShowVariableForm(true)}
            className="w-[140px] bg-main text-white"
          >
            نمایش محصول
          </Button>
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
