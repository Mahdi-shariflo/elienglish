'use client';
import useOrderStore from '@/store/order-store';
import { Order } from '@/types/home';
import React, { useEffect, useState } from 'react';

const FactorOrder = ({ order }: { order: Order }) => {
  const { orderItems } = useOrderStore();
  const [discountPrice, setDiscountPrice] = useState(0);
  if (!order) return null;
  const totalProductPrice = orderItems?.reduce((sum, item) => {
    const price = Number(item?.productPrice) * Number(item?.productCount);
    return sum + price;
  }, 0);

  const totalBasketPrice = orderItems?.reduce((sum, item) => {
    const price = item?.productDiscountPrice
      ? Number(item?.productDiscountPrice) * Number(item?.productCount)
      : Number(item?.productPrice) * Number(item?.productCount ?? 0);
    return sum + price;
  }, 0);

  useEffect(() => {
    if (order?.orderDiscountCode) {
      if (order.orderDiscountType === 'fixed') {
        setDiscountPrice(Number(order.orderDiscountPrice));
      } else {
        const percent = Number(order.orderDiscountPrice) / 100;
        const percentPrice = percent * (totalBasketPrice + order.postPrice);
        setDiscountPrice(percentPrice);
      }
    }
  }, [order, totalBasketPrice]);

  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        فاکتور
      </p>
      <div className="mt-3 space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-regular text-[16px] text-[#616A76]">
            قیمت محصولات بدون تخفیف({totalProductPrice.toLocaleString()})
          </p>
          <p className="font-medium text-[16px] text-[#0C0C0C]">
            {totalProductPrice.toLocaleString()} تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-regular text-[16px] text-[#616A76]">جمع سبد خرید</p>
          <p className="font-medium text-[16px] text-[#0C0C0C]">
            {totalBasketPrice.toLocaleString()} تومان
          </p>
        </div>
        {order?.orderDiscountCode ? (
          <div className="flex items-center justify-between">
            <p className="font-regular text-[16px] text-red-500">مبلغ کد تخفیف</p>
            <p className="font-medium text-[16px] text-red-500">
              {discountPrice.toLocaleString()} تومان
            </p>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <p className="font-regular text-[16px] text-[#616A76]">هزینه حمل و نقل</p>
          <p className="font-medium text-[16px] text-[#0C0C0C]">
            {order.postPrice.toLocaleString()} تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-regular text-[16px] text-[#0C0C0C]">مجموع پرداختی</p>
          <p className="font-medium text-[16px] text-[#0C0C0C]">
            {Number(
              Number(totalBasketPrice + order.postPrice) - Number(discountPrice ?? 0)
            ).toLocaleString()}{' '}
            تومان
          </p>
        </div>
      </div>
    </div>
  );
};

export default FactorOrder;
