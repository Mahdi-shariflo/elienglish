import { Order } from '@/types/home';
import React from 'react';

const TransportOrder = ({ order }: { order: Order }) => {
  if (!order.postType) return null;
  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        حمل و نقل
      </p>
      <div className="mt-3 space-y-3">
        <p className="font-regular text-[14px] text-[#7D8793]">
          نوع ارسال: <span className="text-[#0C0C0C]">{order?.postType ?? '-----------'}</span>
        </p>
        <p className="font-regular text-[14px] text-[#7D8793]">
          هزینه ارسال:{' '}
          <span className="text-[#0C0C0C]">
            {Number(order?.postPrice).toLocaleString() ?? '-----------'} تومان
          </span>
        </p>
      </div>
    </div>
  );
};

export default TransportOrder;
