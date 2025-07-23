import { Order } from '@/types/home';
import React from 'react';

const DiscountOrder = ({ order }: { order: Order }) => {
  if (!order?.courseItems.courseDiscountCode) return null;
  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        کد تخفیف
      </p>
      <div className="mt-3 space-y-3">
        <p className="font-regular text-[14px] text-[#7D8793]">
          کد تخفیف: <span className="text-[#0C0C0C]">{order?.courseItems.courseDiscountCode}</span>
        </p>
        <p className="font-regular text-[14px] text-[#7D8793]">
          نوع کد تخفیف:{' '}
          <span className="text-[#0C0C0C]">
            {order?.courseItems.courseDiscountType === 'FIXED' ? 'ثابت' : 'درصد'}
          </span>
        </p>
        <p className="font-regular text-[14px] text-[#7D8793]">
          مبلغ کد تخفیف:{' '}
          <span className="text-[#0C0C0C]">
            {Number(order?.courseItems.courseDiscountPrice).toLocaleString()} تومان
          </span>
        </p>
      </div>
    </div>
  );
};

export default DiscountOrder;
