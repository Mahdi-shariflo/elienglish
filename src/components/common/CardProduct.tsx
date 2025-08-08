import React, { ReactNode } from 'react';
import { Toman_Icon } from './icon';
import Link from 'next/link';
import { Course, Product } from '@/store/types/home';
import { discountCalculation } from '@/lib/utils';
import Image from './Image';
import { filterLowProduct } from '@/lib/fun';
type Props = {
  url: string;
  className?: string;
  classNameImage?: string;
  classImage?: string;
  children?: ReactNode;
  product: Product | Course;
  showTotalProduct?: boolean;
};
const CardProduct = ({
  product: pro,
  classImage,
  className,
  classNameImage,
  children,
  showTotalProduct,
  url,
}: Props) => {
  if (!pro._id) return null;
  const product: any = pro?.children?.length > 0 ? filterLowProduct(pro.children) : pro;
  return (
    <Link
      href={url}
      className={`shadow-hover_product group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-md border-2 border-gray-100 pb-3 drop-shadow-sm transition-all duration-300 hover:scale-[1.01] light:bg-white dark:border-[#263248] lg:rounded-xl ${className}`}
    >
      <div>
        <Image
          classImg={`${classImage}`}
          className={`relative z-10 mx-auto flex h-[103px] w-[106px] items-center justify-center lg:h-[254px] lg:w-full ${classNameImage} !border-none`}
          src={pro?.thumbnailImage?.url}
          alt={pro.thumbnailImage?.altText ? pro.thumbnailImage?.altText : pro.title}
        />

        <p
          className={`line-clamp-2 px-4 pt-4 font-demibold text-[14px] text-[#0B1524] dark:text-white lg:px-6 lg:pt-4 lg:font-medium ${showTotalProduct ? 'text-[12px] lg:text-[16px]' : 'text-[12px] lg:text-[16px]'}`}
        >
          {product?.title?.replaceAll('&#038;', '')}
        </p>
      </div>

      <div className="px-4 lg:px-6">
        {product.count < 1 || product?.price === 0 ? null : (
          <div className="mt-1 flex items-center justify-between lg:mt-6">
            <div className="">
              <div className={`space-y-1 pb-3`}>
                {Boolean(product.discountPrice) && (
                  <span className="absolute top-5 z-30 flex h-[30px] w-[59px] items-center justify-center rounded-full border-2 border-[#FCEDE8] bg-[#F44336] pt-px font-medium text-[14px] text-white lg:static lg:h-[32px] lg:w-[54px] lg:text-[14px]">
                    {discountCalculation(product.discountPrice, product.price)}%
                  </span>
                )}
              </div>
            </div>
            <div>
              {Boolean(product?.discountPrice) && (
                <p className="whitespace-nowrap text-nowrap !pb-2 text-left !font-regular text-[16px] text-[#A8AFB8] line-through">
                  {Number(product.price).toLocaleString()}
                </p>
              )}
              <p className="flex items-center gap-1">
                <span className="whitespace-nowrap font-demibold text-[18px] text-[#0C0C0C] dark:text-white">
                  {product?.discountPrice
                    ? product?.discountPrice.toLocaleString()
                    : product.price.toLocaleString()}
                </span>
                <Toman_Icon />
              </p>
            </div>
          </div>
        )}
        {children}
      </div>
    </Link>
  );
};

export default CardProduct;
