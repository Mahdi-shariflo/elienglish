'use client';

import useOrderStore from '@/store/order-store';
import { Order } from '@/types/home';
import React, { useState } from 'react';

interface FactorOrderProps {
  order: Order | null | undefined;
}

const FactorOrder: React.FC<FactorOrderProps> = ({ order }) => {
  const [discountPrice, setDiscountPrice] = useState(0);

  if (!order) return null;

  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        فاکتور
      </p>
      <div className="mt-3 space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-regular text-[16px] text-[#616A76]">
            قیمت محصولات بدون تخفیف ({order?.courseItems.price?.toLocaleString()})
          </p>
          <p className="font-medium text-[14px] text-[#0C0C0C]">
            {order?.courseItems.price?.toLocaleString()} تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-regular text-[16px] text-[#616A76]">جمع سبد خرید</p>
          <p className="font-medium text-[16px] text-[#0C0C0C]">
            {order.totalAmount.toLocaleString()} تومان
          </p>
        </div>
        {order.orderDiscountCode && (
          <div className="flex items-center justify-between">
            <p className="font-regular text-[16px] text-red-500">مبلغ کد تخفیف</p>
            <p className="font-medium text-[16px] text-red-500">
              {discountPrice.toLocaleString()} تومان
            </p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <p className="font-regular text-[16px] text-[#616A76]">هزینه حمل و نقل</p>
          <p className="font-medium text-[16px] text-[#0C0C0C]">
            {(order.postPrice ?? 0).toLocaleString()} تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-regular text-[16px] text-[#0C0C0C]">مجموع پرداختی</p>
          <p className="font-medium text-[16px] text-[#0C0C0C]">
            {order.totalAmount.toLocaleString()} تومان
          </p>
        </div>
      </div>
    </div>
  );
};

export default FactorOrder;
