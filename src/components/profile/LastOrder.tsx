'use client';
import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import { useGetOrders } from '@/hooks/profile/useGetOrders';
import { Order } from '@/store/types/profile';
import { Product } from '@/store/types/home';
import CardProduct from '../common/CardProduct';
import EmptyOrder from './EmptyOrder';
import { useRouter } from 'next/navigation';
import Counter from '../common/Counter';

const LastOrder = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isSuccess } = useGetOrders({ sort: '', page: '1' });
  const orders: Order[] = data?.data?.data?.orders;
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      // @ts-expect-error products
      const newProducts: Product[] = orders.flatMap((order) =>
        order.orderItems.map((item) => ({
          _id: item.productId,
          url: item.url,
          count: item.productCount,
          price: item.productPrice,
          discountPrice: item.productDiscountPrice,
          thumbnailImage: {
            url: item.thumbnailImage,
          },
          title: item.title,
        }))
      );
      setProducts(newProducts);
    }
  }, [isSuccess, orders]);

  return (
    <div className="mr-auto mt-5 w-[95%] rounded-2xl border-[#E4E7E9] lg:mr-0 lg:!w-full lg:border lg:bg-white lg:p-[16px]">
      <div className="flex items-center justify-between">
        <p className="font-medium text-[14px] text-[#0C0C0C] lg:text-[18px]">
          آخرین محصولات سفارش داده شده
        </p>
        <Button
          onClick={() => router.push('/profile/orders/')}
          className="!w-fit bg-transparent px-2 font-regular text-main"
        >
          <span>مشاهده همه</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99998 13.28L5.65331 8.9333C5.13998 8.41997 5.13998 7.57997 5.65331 7.06664L9.99998 2.71997"
              stroke="#DD338B"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      {products.length >= 1 ? (
        <div className="custom_scroll_gallery flex items-center gap-3 overflow-auto py-3 lg:overflow-hidden">
          {products
            ?.slice(0, 4)
            .map((product, idx) => (
              <CardProduct
                className="!min-w-[148px] bg-white lg:h-[300px]"
                classNameImage="lg:!h-[142px] !mx-auto"
                showAddCartBtn={
                  <Counter
                    product={product}
                    classNameCounter="mt-2"
                    showBasketIcon={false}
                    classAddBtn="!bg-transparent !text-[#000] text-[12px] mt-2 w-full  border !rounded-lg !h-[40px]"
                  />
                }
                key={idx}
                product={product}
              ></CardProduct>
            ))}
        </div>
      ) : (
        <EmptyOrder />
      )}
    </div>
  );
};

export default LastOrder;
