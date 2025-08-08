'use client';
import React from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import { Order } from '@/store/types/profile';
import Image from '../common/Image';

type Props = {
  order: Order;
  name: 'productPhysicalItems' | 'productDigitalItems';
};
const CardOrder = ({ order, name }: Props) => {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7E9] dark:border-[#263248] lg:!w-full">
      <div className="border-b border-[#E4E7E9] bg-[#EDE8FC] px-3 py-3 dark:border-[#263248] dark:bg-[#0b1524] lg:py-8">
        {/* <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2 lg:p-[16px]">
          <span>{findItem?.icon}</span>
          <span className="font-regular text-[14px] text-[#393B40]">{findItem?.name}</span>
        </div>
        <Button
          onClick={() => router.push(`/profile/orders/${order._id}/`)}
          className="!w-fit !min-w-fit px-0 font-medium text-main lg:hidden"
        >
          جزئیات سفارش
        </Button>
      </div> */}
        <div className="flex justify-between gap-3 lg:flex-1 lg:flex-row lg:items-center lg:justify-start lg:gap-10">
          <p className="font-medium text-[14px] text-[#7D8793] lg:px-[16px]">
            {new Date(order.createdAt).toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="flex gap-1 text-[14px]">
            <span className="font-medium text-[#7D8793]">کد سفارش:</span>
            <span className="font-medium text-[#232429] dark:text-white">{order?.orderNumber}</span>
          </p>
          <p className="flex gap-1 text-[14px]">
            <span className="font-medium text-[#7D8793]">قیمت کل:</span>
            <span className="font-medium text-[#232429] dark:text-white">
              {Number(order.totalAmount).toLocaleString()} تومان
            </span>
          </p>
        </div>
      </div>

      <div className="custom_scroll_gallery flex items-center gap-4 overflow-x-auto p-3 lg:py-4">
        {order[name].products?.map((image, idx) => (
          <div key={idx} className="relative h-[131pxpx] w-[131pxpx]">
            <Image
              className="h-[80px] w-[80px] object-contain lg:h-[115px] lg:w-[115px]"
              src={`${image?.thumbnailImage?.url}`}
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="hidden justify-end px-3 py-2 lg:flex">
        <Button
          onClick={() => router.push(`/profile/orders/${order._id}/`)}
          className="!w-fit !min-w-fit font-medium text-main"
        >
          مشاهده سفارش
        </Button>
      </div>
    </div>
  );
};

export default CardOrder;
