'use client';
import React from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import { statusIcon } from '@/lib/data';
import { Order } from '@/types/profile';
import { BASEURL } from '@/lib/variable';
import Image from '../common/Image';

type Props = {
  order: Order;
};
const CardOrder = ({ order }: Props) => {
  const router = useRouter();
  const findItem = statusIcon.find((status) => status.status === order.orderStatus);
  const total = order.orderItems?.reduce((sum, item) => {
    const price =
      Number(item.productDiscountPrice) > 0
        ? item.productDiscountPrice * item.productCount
        : Number(item?.productPrice) * item.productCount;
    return sum + price;
  }, 0);

  return (
    <div className="rounded-xl border border-[#E4E7E9] px-4 lg:!w-full lg:bg-white">
      <div className="flex items-center justify-between">
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
      </div>
      <div className="flex flex-col gap-3 border-b border-[#E4E7E9] pb-4 lg:flex-1 lg:flex-row lg:items-center lg:gap-10">
        <p className="font-medium text-[14px] text-[#7D8793] lg:px-[16px]">
          {new Date(order.createdAt).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="flex gap-1 text-[14px]">
          <span className="font-medium text-[#7D8793]">کد سفارش:</span>
          <span className="font-medium text-[#232429]">{order.orderNumber}</span>
        </p>
        <p className="flex gap-1 text-[14px]">
          <span className="font-medium text-[#7D8793]">قیمت کل:</span>
          <span className="font-medium text-[#232429]">{Number(total).toLocaleString()} تومان</span>
        </p>
      </div>

      <div className="custom_scroll_gallery flex items-center gap-4 overflow-x-auto border-b border-[#E4E7E9] lg:py-4">
        {order?.orderItems?.map((image, idx) => (
          <div key={idx} className="relative h-[88px] w-[88px]">
            <Image
              className="h-[80px] w-[80px] object-contain"
              src={`${image?.thumbnailImage}`}
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="hidden justify-end py-2 lg:flex">
        <Button
          onClick={() => router.push(`/profile/orders/${order._id}/`)}
          className="!w-fit !min-w-fit font-medium text-main"
        >
          جزئیات سفارش
        </Button>
      </div>
    </div>
  );
};

export default CardOrder;
