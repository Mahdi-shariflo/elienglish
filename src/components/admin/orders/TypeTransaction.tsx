import { Order } from '@/types/home';
import React from 'react';
type Props = {
  order: Order;
};
const TypeTransaction = ({ order }: Props) => {
  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        نوع تراکنش
      </p>
      <div className="mt-3 space-y-3">
        <p className="font-regular text-[14px] text-[#7D8793]">
          شماره تراکنش:{' '}
          <span className="text-[#0C0C0C]">{order?.paymentInvoiceNumber ?? '-----------'}</span>
        </p>
        {order?.transactionType === 'Online' ? (
          <p className="font-regular text-[14px] text-[#7D8793]">
            کد رهگیری زرین پال:{' '}
            <span className="text-[#0C0C0C]">{order?.authority ?? '-----------'}</span>
          </p>
        ) : (
          <>
            <p className="font-regular text-[14px] text-[#7D8793]">
              پیمینت توکن:{' '}
              <span className="text-[#0C0C0C]">{order?.paymentToken ?? '--------'}</span>
            </p>
            <p className="font-regular text-[14px] text-[#7D8793]">
              شماره سفارش اسنپ:{' '}
              <span className="text-[#0C0C0C]">{order?.snappOrderId ?? '--------'}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TypeTransaction;
