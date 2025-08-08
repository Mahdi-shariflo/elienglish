'use client';
import DetailOrder from '@/components/admin/orders/DetailOrder';
import DiscountOrder from '@/components/admin/orders/DiscountOrder';
import FactorOrder from '@/components/admin/orders/FactorOrder';
import PhsicalStatusOrder from '@/components/admin/orders/PhsicalStatusOrder';
import ProductsOrder from '@/components/admin/orders/ProductsOrder';
import StatusOrder from '@/components/admin/orders/StatusOrder';
import TransportOrder from '@/components/admin/orders/TransportOrder';
import TypeTransaction from '@/components/admin/orders/TypeTransaction';
import { useGetPhysicalOrderByIdAdmin } from '@/hooks/admin/orders/physical/useGetPhysicalOrderByIdAdmin';
import { Product } from '@/store/types/home';
import { Spinner } from '@heroui/react';
import React from 'react';

const Page = () => {
  const { data: orderData, isLoading } = useGetPhysicalOrderByIdAdmin();
  const order = orderData?.data?.data ? orderData.data?.data : null;

  const total = order?.productPhysicalItems?.products?.reduce((acc: any, product: Product) => {
    const unitPrice = product.discountPrice || product.price;
    const productTotal = unitPrice * product.count;
    return acc + productTotal;
  }, 0);
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

            <ProductsOrder
              products={order?.productPhysicalItems?.products}
              name="productPhysicalItems"
              order={order}
            />
            <DiscountOrder code="" price="" type="" />
            <TransportOrder order={order} />
          </div>
          <div className="min-w-[400px]">
            <FactorOrder
              price={total}
              total={order?.productPhysicalItems?.productPhysicalTotalAmount}
              discountPrice={order?.productPhysicalItems?.discountPrice}
              order={order}
            />
            <PhsicalStatusOrder order={order} />
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
