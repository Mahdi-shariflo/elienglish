'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import CardDiscount from '@/components/profile/CardDiscount';
import EmptyDiscount from '@/components/profile/EmptyDiscount';
import { useGetDiscount } from '@/hooks/discount/useGetDiscount';
import { Spinner } from '@heroui/react';
import React from 'react';

const Page = () => {
  const { data, isPending } = useGetDiscount({ page: '1' });
  const discounts: [] = data?.data.data.discountCode;
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] pt-4 lg:mb-10 lg:mt-5 lg:!w-full lg:border lg:bg-white lg:p-[16px] lg:pt-0">
      <BackPrevPage title="تخفیف‌های من" />
      <p className="hidden font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        تخفیف‌های من
      </p>
      <div className="container_page lg:!w-full">
        {isPending ? (
          <Spinner
            size="lg"
            classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
            className="mt-10 flex items-center justify-center lg:mt-20"
          />
        ) : discounts.length >= 1 ? (
          <div className="space-y-3">
            {discounts?.map((discount, idx) => <CardDiscount discount={discount} key={idx} />)}
          </div>
        ) : (
          <EmptyDiscount />
        )}
      </div>
    </div>
  );
};

export default Page;
