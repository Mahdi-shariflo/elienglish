import Link from 'next/link';
import React from 'react';
import Counter from './Counter';
import { Product } from '@/types/home';
import { Delete_icon, Toman_Icon } from './icon';
import Image from 'next/image';
import Button from './Button';
import { BASEURL } from '@/lib/variable';
import { useRemoveBasket } from '@/hooks/basket/useRemoveBasket';
import useBasket from '@/hooks/basket/useBasket';
type Props = {
  product: Product;
  className?: string;
  classImage?: string;
  availableCount?: number;
  container_left_class?: string;
  showOtherItem?: boolean;
  showTotal?: boolean;
  showAddBasketDialog?: boolean;
  showDeleteIcon?: boolean;
};
const CardBasket = ({
  product,
  className,
  classImage,
  showTotal = true,
  showDeleteIcon,
}: Props) => {
  const { baskets } = useBasket();
  const { mutate, isPending } = useRemoveBasket();
  const handleDelete = () => {
    // والد یا فرزند بودن رو تشخیص بده
    const isChild = !!product.parent; // اگر parent داره، یعنی فرزنده

    if (isChild) {
      // اینجا می‌تونی لیست سبد خرید رو چک کنی و بررسی کنی آیا فقط همین یک فرزند داره یا نه
      // باید `baskets` و `groupedItems` رو به این کامپوننت پاس بدی یا از استور بگیری

      // مثلاً:
      const parentId = product.parent;
      const siblings = baskets.filter((item) => item.product?.parent === parentId);

      if (siblings.length <= 1) {
        // یعنی این تنها بچه‌س، پس خودش و والد رو حذف کن
        mutate({ id: product._id });
        const parentItem = baskets.find((item) => item.product?._id === parentId);
        if (parentItem) mutate({ id: parentItem.product._id });
      } else {
        mutate({ id: product._id });
      }
    } else {
      // آیتم والد هست، پس باید خودش و childrenهاش حذف بشن
      mutate({ id: product._id });
      const children = baskets.filter((item) => item.product?.parent === product._id);
      children.forEach((child) => mutate({ id: child._id }));
    }
  };

  return (
    <Link
      href={'#'}
      // href={`/product/${product?.urlVar ? product?.urlVar : product.url}/`}
      className={`flex h-fit w-full items-center justify-between rounded-xl px-4 lg:p-4 ${className}`}
    >
      <div className="flex w-full flex-[4] items-center gap-3">
        <div className={`relative !h-[80px] min-h-[80px] !w-[80px] min-w-[80px] ${classImage}`}>
          {product?.thumbnailImage?.url && (
            <Image
              fill
              src={`${product?.thumbnailImage?.url ? `${BASEURL}/${product.thumbnailImage.url}` : product?.teacherProfile}`}
              alt=""
            />
          )}
        </div>
        <p className="line-clamp-2 font-medium text-[16px] dark:text-white">{product?.title}</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-between gap-5">
        <p className="font-medium text-[14px] text-[#8E98A8]">قیمت</p>
        <div className="flex items-center gap-1">
          <p className="font-bold dark:text-white">
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
          <p className="font-medium text-[14px] text-[#8E98A8] dark:text-white">
            {product?.count ? product.count : 1}
          </p>
        )}
      </div>
      {showTotal && (
        <div className="flex flex-1 flex-col items-center justify-between gap-5">
          <p className="font-medium text-[14px] text-[#8E98A8]">مجموع</p>
          <div className="flex items-center gap-1">
            <p className="font-bold dark:text-white">
              {Number(
                Number(product?.discountPrice ? product?.discountPrice : product?.price) *
                  (product?.count ? product.count : 1)
              ).toLocaleString()}
            </p>
            <Toman_Icon />
          </div>
        </div>
      )}
      {showDeleteIcon && (
        <div className="flex-1">
          <Button isPending={isPending} onClick={handleDelete}>
            <Delete_icon />
          </Button>
        </div>
      )}
    </Link>
  );
};

export default CardBasket;
