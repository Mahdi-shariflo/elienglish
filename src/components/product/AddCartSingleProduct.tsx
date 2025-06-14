'use client';
import React from 'react';
import { Toman_Icon } from '../common/icon';
import { Product } from '@/types/home';
import { discountCalculation } from '@/lib/utils';
import Counter from '../common/Counter';
type Props = {
  hideSendDes?: boolean;
  className?: string;
  product: Product;
};
const AddCartSingleProduct = ({ className, product }: Props) => {
  return (
    <>
      <div
        className={`drop_shadow_cart bottom-0 left-0 z-10 flex w-full flex-col lg:!z-0 lg:w-[288px] lg:min-w-[288px] lg:gap-3 ${className}`}
      >
        <div className="border-t border-[#F4F6FA] bg-white p-2 lg:rounded-lg lg:border">
          <div className="mt-2 flex w-full flex-row-reverse items-center justify-between px-[20px] lg:mt-5 lg:flex-col lg:px-0">
            {/* discount */}
            {product?.count < 1 ? null : (
              <div className="w-full">
                <div className="flex items-center justify-end gap-2">
                  {product?.discountPrice ? (
                    <>
                      <p className="text-left font-regular text-[14px] text-[#616A76] line-through">
                        {Number(product.price).toLocaleString()}
                      </p>
                      <span className="flex h-[20px] w-[39px] items-center justify-center rounded-md bg-main pt-px font-medium text-[10px] text-white lg:h-[24px] lg:w-[41px] lg:text-[12px]">
                        {discountCalculation(product?.discountPrice, product?.price)}%
                      </span>
                    </>
                  ) : null}
                </div>
                {/* price */}

                <div className="mt-[14px] items-center lg:flex lg:justify-between">
                  <p className="hidden font-medium text-[14px] text-[#616A76] lg:block">
                    قیمت کالا
                  </p>
                  <p className="flex items-center justify-end gap-1">
                    <span className="font-bold text-[20px] text-[#0C0C0C]">
                      {product?.discountPrice
                        ? product.discountPrice.toLocaleString()
                        : Number(product.price).toLocaleString()}
                    </span>
                    <Toman_Icon />
                  </p>
                </div>

                {product.count < 3 && product.count !== 0 ? (
                  <p className="hidden font-medium text-[12px] text-[#ED2E2E] lg:my-2 lg:block">
                    تنها {product.count} عدد موجود در انبار
                  </p>
                ) : null}
              </div>
            )}
            {/* btn add cart */}
            {product.count >= 1 ? (
              <Counter
                classCount="border-r border-l"
                container_Class="flex flex-col-reverse lg:flex-row items-center lg:justify-between w-full"
                classNameCounter="border mt-2 rounded-lg border w-[96px] h-[32px] justify-start lg:ml-auto"
                product={product}
                showCartLink
                showAddBasketDialog
              />
            ) : (
              <p className="mb-3 flex-1 text-center font-medium text-[#7D8793] text-opacity-70">
                ناموجود
              </p>
            )}

            {/* last update */}
            <div className="!mb-[10px] mt-4 hidden w-full items-center justify-start gap-2 lg:flex">
              <span>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3327 10.5C18.3327 15.1 14.5993 18.8333 9.99935 18.8333C5.39935 18.8333 2.59102 14.2 2.59102 14.2M2.59102 14.2H6.35768M2.59102 14.2V18.3666M1.66602 10.5C1.66602 5.89996 5.36602 2.16663 9.99935 2.16663C15.5577 2.16663 18.3327 6.79996 18.3327 6.79996M18.3327 6.79996V2.63329M18.3327 6.79996H14.6327"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="font-medium text-[12px] text-[#7D8793]">
                <span>آخرین بروز رسانی:</span>
                <span>
                  {new Date(product.updatedAt!).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCartSingleProduct;
