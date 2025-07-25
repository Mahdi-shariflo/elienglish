'use client';
import CardOrder from '@/components/profile/CardOrder';
import FilterOrders from '@/components/profile/FilterOrders';
import React, { Suspense } from 'react';
import Pagination from '@/components/common/Pagination';
import BackPrevPage from '@/components/common/BackPrevPage';
import { useGetOrders } from '@/hooks/profile/useGetOrders';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@heroui/react';
import { Order, STATUSCOUNTS } from '@/types/profile';
import EmptyOrder from '@/components/profile/EmptyOrder';

const Page = () => {
  const searchParams = useSearchParams();
  const { data, isPending } = useGetOrders({
    page: searchParams.get('page')!,
  });
  const orders: { order: Order[]; totalPages: number; totalItems: number } = data?.data?.data;
  const orderStatusCounts: STATUSCOUNTS = data?.data?.data?.statusCounts;
  const sortOrders = orders?.order?.filter(
    (item) => item.productPhysicalItems.status === (searchParams.get('sort') || 'AWAITING')
  );
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 dark:border-[#505B74] dark:bg-[#263248] lg:mb-10 lg:min-h-[90vh] lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile" title="تاریخچه سفارش‌ها" />
      {/* <div className='container_page lg:!w-full lg:flex-row  flex  flex-col items-center gap-6 lg:justify-between'>
                <p className='text-[#0C0C0C] hidden lg:block font-medium text-[14px] lg:text-[18px]'>تاریخچه سفارش‌های من</p>
                <Input className='lg:!w-[284px]' placeholder='جستجو ' classNameInput='!h-[48px] bg-[#F5F6F6]' startContent={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 22L20 20" stroke="#616A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                }
                />
            </div> */}
      <Suspense>
        <FilterOrders orderStatusCounts={orderStatusCounts} />
      </Suspense>

      <div>
        <p className="container_page !my-6 hidden font-medium text-[14px] text-[#0C0C0C] dark:text-white lg:block lg:!w-full lg:text-[18px]">
          آخرین سفارش‌ها
        </p>
        {isPending ? (
          <Spinner
            classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
            size="lg"
            className="!mt-20 flex items-center justify-center"
          />
        ) : sortOrders?.length >= 1 ? (
          <div className="container_page flex flex-col gap-5 lg:!w-full">
            {sortOrders.map((order, idx) => (
              <CardOrder name="productPhysicalItems" key={idx} order={order} />
            ))}
          </div>
        ) : (
          <EmptyOrder />
        )}
      </div>
      {orders?.totalPages > 1 && <Pagination top={0} total={data?.data?.data?.totalPages} />}
    </div>
  );
};

export default Page;
