import Link from 'next/link';
import React from 'react';
import Counter from './Counter';
import { Product } from '@/types/home';
import { Delete_icon, Toman_Icon } from './icon';
import Image from 'next/image';
import Button from './Button';
import { BASEURL } from '@/lib/variable';
import { useRemoveBasket } from '@/hooks/basket/useRemoveBasket';
type Props = {
  product: Product;
  className?: string;
  classImage?: string;
  availableCount?: number;
  container_left_class?: string;
  showOtherItem?: boolean;
  showTotal?: boolean;
  showAddBasketDialog?: boolean;
};
const CardBasket = ({ product, className, classImage, showTotal = true }: Props) => {
  const { mutate, isPending } = useRemoveBasket();
  return (
    <Link
      href={'#'}
      // href={`/product/${product?.urlVar ? product?.urlVar : product.url}/`}
      className={`flex h-fit w-full items-center justify-between rounded-xl px-4 lg:p-4 ${className}`}
    >
      <div className="flex w-full flex-[4] items-center gap-3">
        <div className={`relative !h-[80px] min-h-[80px] !w-[80px] min-w-[80px] ${classImage}`}>
          <Image
            fill
            src={`${product?.thumbnailImage?.url ? `${BASEURL}/${product.thumbnailImage.url}` : product?.teacherProfile}`}
            alt=""
          />
        </div>
        <p className="line-clamp-2 font-medium text-[16px]">{product.title}</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-between gap-5">
        <p className="font-medium text-[14px] text-[#8E98A8]">قیمت</p>
        <div className="flex items-center gap-1">
          <p className="font-bold">
            {Number(
              product?.discountPrice ? product?.discountPrice : product?.price
            ).toLocaleString()}
          </p>
          <Toman_Icon />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <p className="font-medium text-[14px] text-[#8E98A8]">تعداد</p>
        {product?.type === 'physical' ? (
          <Counter product={product} typeCounter="product" typePayload="PRODUCT_PHYSICAL" />
        ) : (
          <p className="font-medium text-[14px] text-[#8E98A8]">
            {product?.count ? product.count : 1}
          </p>
        )}
      </div>
      {showTotal && (
        <div className="flex flex-1 flex-col items-center justify-between gap-5">
          <p className="font-medium text-[14px] text-[#8E98A8]">مجموع</p>
          <div className="flex items-center gap-1">
            <p className="font-bold">
              {Number(
                Number(product?.discountPrice ? product?.discountPrice : product?.price) *
                  (product?.count ? product.count : 1)
              ).toLocaleString()}
            </p>
            <Toman_Icon />
          </div>
        </div>
      )}
      <div className="flex-1">
        <Button isPending={isPending} onClick={() => mutate({ id: product._id })}>
          <Delete_icon />
        </Button>
      </div>
    </Link>
  );
};

export default CardBasket;
