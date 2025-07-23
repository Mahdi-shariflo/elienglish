'use client';
import DetailOrder from '@/components/admin/orders/DetailOrder';
import DiscountOrder from '@/components/admin/orders/DiscountOrder';
import FactorOrder from '@/components/admin/orders/FactorOrder';
import Note from '@/components/admin/orders/Note';
import PrintOrder from '@/components/admin/orders/PrintOrder';
import ProductsOrder from '@/components/admin/orders/ProductsOrder';
import StatusOrder from '@/components/admin/orders/StatusOrder';
import TransportOrder from '@/components/admin/orders/TransportOrder';
import TypeTransaction from '@/components/admin/orders/TypeTransaction';
import { useGetOrderByIdAdmin } from '@/hooks/admin/orders/useGetOrderByIdAdmin';
import { Spinner } from '@heroui/react';
import React from 'react';

const Page = () => {
  const { data: orderData, isLoading } = useGetOrderByIdAdmin();
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
            <DiscountOrder order={order} />
            <TransportOrder order={order} />
          </div>
          <div className="min-w-[400px]">
            <FactorOrder order={order} />
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
