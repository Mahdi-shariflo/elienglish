'use client';
import DetailOrder from '@/components/admin/orders/DetailOrder';
import DiscountOrder from '@/components/admin/orders/DiscountOrder';
import FactorOrder from '@/components/admin/orders/FactorOrder';
import ProductsOrder from '@/components/admin/orders/ProductsOrder';
import StatusOrder from '@/components/admin/orders/StatusOrder';
import TransportOrder from '@/components/admin/orders/TransportOrder';
import TypeTransaction from '@/components/admin/orders/TypeTransaction';
import { useGetCourseOrderByIdAdmin } from '@/hooks/admin/orders/course/useGetCourseOrderByIdAdmin';
import { Order } from '@/store/types/home';
import { Spinner } from '@heroui/react';
import React from 'react';

const Page = () => {
  const { data: orderData, isLoading } = useGetCourseOrderByIdAdmin();
  const order = orderData?.data?.data ? orderData.data?.data : null;
  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        جزئیات سفارش
      </p>

      {isLoading ? (
        <Spinner
          className="mt-6 flex items-center justify-center"
          classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
        />
      ) : (
        <div className="flex items-start gap-3">
          <div className="w-full">
            <TypeTransaction order={order} />
            <DetailOrder order={order} />

            <ProductsOrder name="courseItems" order={order} />
            <DiscountOrder
              code={order?.courseItems?.courseDiscountCode}
              price={order?.courseItems?.courseDiscountPrice}
              type={order?.courseItems?.courseDiscountType}
            />
            <TransportOrder order={order} />
          </div>
          <div className="min-w-[400px]">
            <FactorOrder
              discountPrice={order?.courseItems?.price}
              price={order?.courseItems?.price}
              total={order?.courseItems?.courseTotalAmount}
              order={order}
            />
            <StatusOrder order={order} />
            {/* 
            <PrintOrder order={order} />
            <Note order={order} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
