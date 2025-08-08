'use client';
import DetailOrder from '@/components/admin/orders/DetailOrder';
import DiscountOrder from '@/components/admin/orders/DiscountOrder';
import FactorOrder from '@/components/admin/orders/FactorOrder';
import LpaStatusOrder from '@/components/admin/orders/LpaStatusOrder';
import ProductsOrder from '@/components/admin/orders/ProductsOrder';
import ProductsOrderLpa from '@/components/admin/orders/ProductsOrderLpa';
import StatusOrder from '@/components/admin/orders/StatusOrder';
import TransportOrder from '@/components/admin/orders/TransportOrder';
import TypeTransaction from '@/components/admin/orders/TypeTransaction';
import { useGetLpaOrderAdmin } from '@/hooks/admin/orders/lpa/useGetLpaOrderAdmin';
import { Spinner } from '@heroui/react';
import React from 'react';

const Page = () => {
  const { data: orderData, isLoading } = useGetLpaOrderAdmin();
  const order = orderData?.data?.data ? orderData.data?.data : null;

  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        سفارشات تعین سطح
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

            <ProductsOrderLpa order={order} />
            <DiscountOrder code="" price="" type="" />
            <TransportOrder order={order} />
          </div>
          <div className="min-w-[400px]">
            <FactorOrder
              price={order?.levelItems?.price}
              total={order?.levelItems?.lpaTotalAmount}
              discountPrice={order?.levelItems?.discountPrice}
              order={order}
            />
            <LpaStatusOrder order={order} />
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
