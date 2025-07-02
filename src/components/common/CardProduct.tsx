import React, { ReactNode } from 'react';
import { Toman_Icon } from './icon';
import Link from 'next/link';
import { Course, Product } from '@/types/home';
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
  const product: any = pro?.children?.length > 0 ? filterLowProduct(pro.children) : pro;
  return (
    <Link
      href={url}
      className={`hover:shadow-hover_product group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-gray-100 pb-3 drop-shadow-sm transition-all duration-300 hover:scale-[1.01] ${className}`}
    >
      {product.count === 0 || product?.price === 0 ? (
        <span className="absolute left-2 top-2 z-20 flex w-fit rounded bg-[#7D8793] bg-opacity-70 px-1 py-px font-regular text-[12px] text-white lg:text-[14px]">
          ناموجود
        </span>
      ) : null}

      <Image
        classImg={classImage}
        className={`relative z-10 mx-auto flex h-[103px] w-[106px] items-center justify-center object-contain lg:h-[254px] lg:w-[231px] ${classNameImage}`}
        src={pro?.thumbnailImage?.url}
        alt={pro.thumbnailImage?.altText ? pro.thumbnailImage?.altText : pro.title}
      />
      <div className="px-2">
        <p
          className={`line-clamp-2 font-bold text-[#0B1524] lg:font-bold ${showTotalProduct ? 'text-[12px] lg:text-[12px]' : 'text-[12px] lg:text-[14px]'}`}
        >
          {product.title.replaceAll('&#038;', '')}
        </p>

        {product.count < 1 || product?.price === 0 ? null : (
          <div className="mt-1 flex items-center justify-between lg:mt-6">
            <div className="">
              <div className={`space-y-1 pb-3`}>
                {Boolean(product.discountPrice) && (
                  <span className="absolute top-5 z-30 flex h-[20px] w-[39px] items-center justify-center rounded-full border-2 border-[#FCEDE8] bg-[#F44336] pt-px font-medium text-[10px] text-white lg:static lg:h-[24px] lg:w-[41px] lg:text-[12px]">
                    {discountCalculation(product.discountPrice, product.price)}%
                  </span>
                )}
              </div>
            </div>
            <div>
              {Boolean(product?.discountPrice) && (
                <p className="whitespace-nowrap text-nowrap text-left !font-regular text-[14px] text-[#A8AFB8] line-through">
                  {Number(product.price).toLocaleString()}
                </p>
              )}
              <p className="flex items-center gap-1">
                <span className="whitespace-nowrap font-bold text-[14px] text-[#0C0C0C]">
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
