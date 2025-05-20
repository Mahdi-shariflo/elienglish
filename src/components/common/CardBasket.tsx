import Link from 'next/link';
import React from 'react';
import Counter from './Counter';
import { Product } from '@/types/home';
import { Toman_Icon } from './icon';
import { discountCalculation } from '@/lib/utils';
import Image from './Image';
type Props = {
  product: Product;
  className?: string;
  classImage?: string;
  availableCount?: number;
  container_left_class?: string;
  showOtherItem?: boolean;
  is_in_stock?: boolean;
  showAddBasketDialog?: boolean;
};
const CardBasket = ({
  showOtherItem,
  showAddBasketDialog,
  product,
  className,
  classImage,
  container_left_class,
  is_in_stock,
  availableCount,
}: Props) => {
  return (
    <Link
      href={`/product/${product?.urlVar ? product?.urlVar : product.url}/`}
      className={`flex h-fit w-full rounded-xl border border-gray-100 px-4 shadow-md lg:p-4 ${className}`}
    >
      <Image
        className={`flex h-[88px] w-[100px] items-center justify-center lg:h-[120px] lg:w-[154px] ${classImage}`}
        src={product?.thumbnailImage?.url}
        alt=""
      />
      <div className={`w-full py-4 lg:py-0 ${container_left_class}`}>
        <p className="line-clamp-2 font-medium text-[14px]">
          {product.title.replaceAll('&#038;', '')}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Counter
              classCount="border-r border-l"
              container_Class="flex items-center justify-between w-full"
              classNameCounter="border mt-2 rounded-lg border w-[96px] h-[32px] justify-start ml-auto"
              product={product}
              showAddBasketDialog={showAddBasketDialog}
            />
            {is_in_stock && (
              <div className="flex flex-col gap-2">
                <span className="w-fit whitespace-nowrap rounded-lg bg-main px-2 py-1 text-center font-regular text-[12px] text-white">
                  ناموجود شد
                </span>
                <span className="whitespace-nowrap font-regular text-[12px] text-main">
                  موجودی محصول {availableCount} عدد
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            {showOtherItem && Number(product?.discountPrice) > 0 && (
              <span className="flex h-[20px] w-[39px] items-center justify-center rounded-md bg-main pt-px font-medium text-[10px] text-white lg:h-[24px] lg:w-[41px] lg:text-[12px]">
                {discountCalculation(product.discountPrice, product.price)}%
              </span>
            )}
            <div>
              {product?.discountPrice ? (
                <p className="text-left font-regular text-[12px] text-[#A8AFB8] line-through">
                  {Number(product.price).toLocaleString()}
                </p>
              ) : null}
              <p className="flex items-center gap-1">
                <span className="block whitespace-nowrap font-bold text-[14px] text-[#0C0C0C]">
                  {product?.discountPrice
                    ? product?.discountPrice.toLocaleString()
                    : product.price.toLocaleString()}
                </span>
                <Toman_Icon />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBasket;
