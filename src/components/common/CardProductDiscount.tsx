import React from 'react';
import { Toman_Icon } from './icon';
import Link from 'next/link';
import { Product } from '@/types/home';
import { discountCalculation } from '@/lib/utils';
import Image from './Image';
type Props = {
  product: Product;
};
const CardProductDiscount = ({ product }: Props) => {
  if (product.count < 1) return null;
  return (
    <Link
      href={`/product/${product.url}/`}
      className="flex h-[199px] w-full flex-col justify-between rounded-lg border border-gray-100 bg-white px-3 pb-2 shadow-md lg:h-[262px]"
    >
      <Image
        src={`${product.thumbnailImage.url}`}
        alt=""
        className="relative mx-auto h-[103px] w-[106px] lg:mt-4 lg:h-[146px] lg:w-[160px]"
      />
      <div className="lg:mt-[12px]">
        <p className="line-clamp-2 font-medium text-[12px] leading-5 text-[#232429]">
          {product.title.replaceAll('&#038;', '')}
        </p>
        <div className="mt-3 flex items-center justify-between">
          {product.discountPrice && (
            <span className="-mt-6 flex h-[20px] w-[41px] items-center justify-center rounded-md bg-main pt-px font-medium text-[12px] text-white lg:mt-0 lg:h-[24px]">
              {discountCalculation(product.discountPrice, product.price)}%
            </span>
          )}
          <div>
            <p className="whitespace-nowrap text-nowrap text-left font-regular text-[12px] text-[#A8AFB8] line-through">
              {Number(product.price).toLocaleString()}
            </p>
            <p className="flex flex-nowrap items-center gap-1">
              <span className="whitespace-nowrap text-nowrap font-bold text-[12px] text-[#0C0C0C]">
                {product.discountPrice
                  ? Number(product.discountPrice).toLocaleString()
                  : product.price.toLocaleString()}
              </span>
              <Toman_Icon />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProductDiscount;
