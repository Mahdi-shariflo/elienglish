// useBasket.ts
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useGetBasket } from './useGetBasket';
import { useCheckoutStore } from '@/store/checkout-store';
import { freeShippingPrice } from '@/lib/variable';
import { BasketItem } from '@/store/types';

const useBasket = () => {
  const { checkout } = useCheckoutStore();
  const [discountPrice, setDiscountPrice] = useState<null | number>(null);
  const [total, setTotal] = useState(0);
  const { data, isLoading, isSuccess } = useGetBasket();

  const baskets: BasketItem[] = useMemo(() => {
    return data?.data?.data?.items ?? [];
  }, [data?.data?.data?.items]);

  const installmentCourses = baskets.filter(
    (item) => item.type === 'COURSE' && item.course?.isInstallment
  );
  const isCartPhycial = baskets?.find((item) => item.type === 'PRODUCT_PHYSICAL');

  const nonInstallmentItems = baskets.filter(
    (item) => !(item.type === 'COURSE' && item.course?.isInstallment)
  );

  const nonInstallmentTotal = nonInstallmentItems.reduce((sum, item) => {
    const price = item?.course?.discountPrice
      ? Number(item.course.discountPrice)
      : item?.product?.discountPrice
        ? Number(item.product.discountPrice)
        : item?.course?.price
          ? Number(item.course.price)
          : item?.product?.price
            ? Number(item.product.price)
            : 0;
    const count = Number(item?.count ?? 0);
    return sum + price * count;
  }, 0);

  const installmentFirstPayments = installmentCourses.reduce((sum, item) => {
    const totalInstallment = Number(item.course?.installmentPrice ?? 0);
    const count = Number(item.course?.installmentCount ?? 1);
    const perInstallment = count > 0 ? totalInstallment / count : 0;
    return sum + perInstallment;
  }, 0);

  const totalCountBasket = baskets.reduce((total, basket) => {
    return total + (basket?.count ? basket?.count : 0);
  }, 0);

  const totalProductPriceWithoutDiscount = baskets.reduce((sum, item) => {
    const price = item?.course?.price
      ? Number(item?.course?.price)
      : item?.product?.price
        ? Number(item?.product?.price)
        : 0;
    const count = Number(item?.count ?? 0);
    return sum + price * count;
  }, 0);
  const totalDiscount = baskets.reduce((sum, item) => {
    const price = Number(item?.product?.price ?? item?.course?.price ?? 0);
    const discountPrice = Number(
      item?.product?.discountPrice ?? item?.course?.discountPrice ?? price
    );
    const suggestedDiscount = Number(item?.product?.suggestedDiscount ?? 0);

    // مقدار تخفیف برای یک آیتم
    const discountAmount = price - discountPrice + suggestedDiscount;

    // ضرب در تعداد
    return sum + discountAmount * Number(item?.count ?? 1);
  }, 0);

  const totalProductPriceWithDiscount = data?.data?.data?.totalPrice + (isCartPhycial ? 65000 : 0);

  useEffect(() => {
    if (checkout) {
      let finalTotal = 0;

      if (checkout.selectInstallment === 'installment') {
        finalTotal = nonInstallmentTotal + installmentFirstPayments;
      } else {
        finalTotal = totalProductPriceWithDiscount;
      }

      if (checkout?.discountCode) {
        if (checkout.discountCode.discountCodeType === 'FIXED') {
          setDiscountPrice(Number(checkout.discountCode.discountCodePrice));
          finalTotal -= Number(checkout.discountCode.discountCodePrice);
        } else {
          const percent = Number(checkout.discountCode.discountCodePrice) / 100;
          const percentPrice = Number(percent * finalTotal).toFixed(0);
          setDiscountPrice(Number(percentPrice));
          finalTotal -= Number(percentPrice);
        }
      }

      if (
        Number(checkout?.transport?.shippingPrice) > 0 &&
        freeShippingPrice > totalProductPriceWithoutDiscount
      ) {
        finalTotal += Number(checkout?.transport?.shippingPrice);
      }

      setTotal(finalTotal);
    } else {
      setTotal(totalProductPriceWithDiscount);
    }
  }, [
    isSuccess,
    checkout,
    totalProductPriceWithDiscount,
    totalProductPriceWithoutDiscount,
    nonInstallmentTotal,
    installmentFirstPayments,
    totalDiscount,
  ]);

  return {
    baskets,
    totalCountBasket,
    totalProductPriceWithoutDiscount,
    totalProductPriceWithDiscount,
    isPending: isLoading,
    total,
    discountPrice,
    installmentCourses,
    nonInstallmentItems,
    totalDiscount,
  };
};

export default useBasket;
