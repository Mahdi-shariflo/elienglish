import { converDatePer } from '@/lib/convert';
import { Order } from '@/types/home';
import React from 'react';

const Note = ({ order }: { order: Order }) => {
  if (order?.orderNote?.length < 1) return null;
  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        یاداشت‌ها
      </p>
      <div className="max-h-[400px] overflow-auto">
        {order?.orderNote?.map((item, idx) => (
          <div className="space-y-2 border-b py-4" key={idx}>
            <p className="font-bold text-[12px] text-gray-700">
              یاداشت: <span className="font-medium text-gray-500">{item.text}</span>
            </p>
            <p className="font-bold text-[12px] text-gray-700">
              تاریخ:{' '}
              <span className="font-num font-medium text-gray-500">{converDatePer(item.date)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
