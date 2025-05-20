import React, { ReactNode } from 'react';
import { Toman_Icon } from './icon';
import Link from 'next/link';
import { Product } from '@/types/home';
import { discountCalculation } from '@/lib/utils';
import Image from './Image';
import { filterLowProduct } from '@/lib/fun';
type Props = {
  className?: string;
  classNameImage?: string;
  showAddCartBtn?: ReactNode;
  product: Product;
  showTotalProduct?: boolean;
};
const CardProduct = ({
  product: pro,
  className,
  classNameImage,
  showAddCartBtn,
  showTotalProduct,
}: Props) => {
  const product: any = pro?.children?.length > 0 ? filterLowProduct(pro.children) : pro;
  console.log(product, 'ffffffffffffffff');
  return (
    <Link
      href={`/product/${pro.url}/`}
      className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-gray-100 px-2 pb-3 shadow-product transition-all duration-300 hover:scale-[1.01] hover:shadow-hover_product lg:px-[16px] ${className}`}
    >
      {product.count === 0 || product?.price === 0 ? (
        <span className="absolute left-2 top-2 z-20 flex w-fit rounded bg-[#7D8793] bg-opacity-70 px-1 py-px font-regular text-[12px] text-white lg:text-[14px]">
          ناموجود
        </span>
      ) : null}

      <Image
        className={`relative z-10 mx-auto flex h-[103px] w-[106px] items-center justify-center object-contain lg:h-[202px] lg:w-[202px] ${classNameImage}`}
        src={pro?.thumbnailImage?.url}
        alt={pro.thumbnailImage?.altpic ? pro.thumbnailImage?.altpic : pro.title}
      />
      <div>
        <p
          className={`line-clamp-2 font-regular text-[#232429] lg:font-medium ${showTotalProduct ? 'text-[12px] lg:text-[12px]' : 'text-[12px] lg:text-[14px]'}`}
        >
          {product.title.replaceAll('&#038;', '')}
        </p>
        {showTotalProduct ? (
          product?.count < 3 && product.count !== 0 ? (
            <p className="pt-5 font-medium text-[10px] text-[#ED2E2E] lg:hidden lg:text-[12px]">
              تنها {product?.count} عدد موجود در انبار
            </p>
          ) : null
        ) : null}
        {product.count < 1 || product?.price === 0 ? null : (
          <div className="mt-1 flex items-center justify-between lg:mt-4">
            <div className="">
              <div className={`space-y-1 pb-3`}>
                {Boolean(product.discountPrice) && (
                  <span className="absolute top-5 z-30 flex h-[20px] w-[39px] items-center justify-center rounded-md bg-main pt-px font-medium text-[10px] text-white lg:static lg:h-[24px] lg:w-[41px] lg:text-[12px]">
                    {discountCalculation(product.discountPrice, product.price)}%
                  </span>
                )}
                {showTotalProduct ? (
                  product?.count < 3 && product.count !== 0 ? (
                    <p className="hidden pt-1 font-medium text-[10px] text-[#ED2E2E] lg:block lg:text-[12px]">
                      تنها {product?.count} عدد موجود در انبار
                    </p>
                  ) : null
                ) : null}
              </div>
            </div>
            <div>
              {Boolean(product?.discountPrice) && (
                <p className="whitespace-nowrap text-nowrap text-left !font-regular text-[12px] text-[#A8AFB8] line-through">
                  {Number(product.price).toLocaleString()}
                </p>
              )}
              <p className="flex items-center gap-1">
                <span className="whitespace-nowrap font-bold text-[12px] text-[#0C0C0C]">
                  {product?.discountPrice
                    ? product?.discountPrice.toLocaleString()
                    : product.price.toLocaleString()}
                </span>
                <Toman_Icon />
              </p>
            </div>
          </div>
        )}
        {showAddCartBtn}
      </div>
    </Link>
  );
};

export default CardProduct;
