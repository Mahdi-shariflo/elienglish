import Link from 'next/link';
import React from 'react';
import Counter from './Counter';
import { Product } from '@/store/types/home';
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
      className={`grid h-fit w-full grid-cols-2 items-center justify-between gap-4 rounded-xl p-3 lg:flex lg:p-4 ${className}`}
    >
      <div className="col-span-2 flex w-full flex-[4] items-center gap-3 border-b border-gray-200 pb-2 dark:border-[#263248] lg:border-none lg:pb-0">
        <div
          className={`relative !h-[80px] min-h-[80px] !w-[80px] min-w-[80px] overflow-hidden rounded-lg ${classImage}`}
        >
          {product?.thumbnailImage?.url && (
            <Image
              fill
              src={`${product?.thumbnailImage?.url ? `${BASEURL}/${product.thumbnailImage.url}` : product?.teacherProfile}`}
              alt=""
            />
          )}
        </div>
        <p className="line-clamp-2 font-medium text-[14px] dark:text-white lg:text-[16px]">
          {product?.title}
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-between gap-3 border-b border-gray-200 pb-2 dark:border-[#263248] lg:border-none lg:pb-0">
        <p className="font-medium text-[14px] text-[#8E98A8]">قیمت</p>
        <div className="flex items-center gap-1">
          <p className="font-demibold dark:text-white">
            {Number(
              product?.discountPrice ? product?.discountPrice : product?.price
            ).toLocaleString()}
          </p>
          <Toman_Icon />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 border-b border-gray-200 pb-2 dark:border-[#263248] lg:border-none lg:pb-0">
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
        <div className="flex flex-1 flex-col items-center justify-between gap-3 border-b border-gray-200 pb-2 dark:border-[#263248] lg:border-none lg:pb-0">
          <p className="font-medium text-[14px] text-[#8E98A8]">مجموع</p>
          <div className="flex items-center gap-1">
            <p className="font-demibold dark:text-white">
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
        <div className="col-span-2 flex-1">
          <Button
            className="w-full bg-main bg-opacity-20 lg:w-fit lg:bg-transparent"
            isPending={isPending}
            onClick={handleDelete}
          >
            <Delete_icon />
            <span>حذف</span>
          </Button>
        </div>
      )}
    </Link>
  );
};

export default CardBasket;
