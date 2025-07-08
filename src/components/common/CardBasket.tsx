import Link from 'next/link';
import React from 'react';
import Counter from './Counter';
import { Product } from '@/types/home';
import { Delete_icon, Toman_Icon } from './icon';
import { discountCalculation } from '@/lib/utils';
// import Image from './Image';
import ImageProfile from '@/../public/images/profile.jpg';
import Image from 'next/image';
import Button from './Button';
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
      href={'#'}
      // href={`/product/${product?.urlVar ? product?.urlVar : product.url}/`}
      className={`flex h-fit w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-4 shadow-md lg:p-4 ${className}`}
    >
      <Image src={ImageProfile} alt="" className="h-[80px] w-[80px] rounded-lg" />
      <p className="font-bold text-[16px]">{product.title}</p>
      <div className="flex flex-col items-center justify-between gap-5">
        <p className="font-medium text-[14px] text-[#8E98A8]">قیمت</p>
        <div className="flex items-center gap-1">
          <p className="font-bold">24,234,234</p>
          <Toman_Icon />
        </div>
      </div>

      <div>
        <p className="font-medium text-[14px] text-[#8E98A8]">تعداد</p>
        {/* <Counter product={{}}/> */}
      </div>
      <div className="flex flex-col items-center justify-between gap-5">
        <p className="font-medium text-[14px] text-[#8E98A8]">مجموع</p>
        <div className="flex items-center gap-1">
          <p className="font-bold">24,234,234</p>
          <Toman_Icon />
        </div>
      </div>
      <div>
        <Button>
          <Delete_icon />
        </Button>
      </div>
    </Link>
  );
};

export default CardBasket;
