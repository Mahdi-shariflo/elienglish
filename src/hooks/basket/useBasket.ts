'use client';

import { useEffect, useState } from 'react';
import { useGetBasket } from './useGetBasket';
import { useCheckoutStore } from '@/store/checkout-store';
import { freeShippingPrice } from '@/lib/variable';
import { BasketItem } from '@/store/types';

const useBasket = () => {
  const { checkout } = useCheckoutStore();
  const [discountPrice, setDiscountPrice] = useState<null | number>(null);
  const [total, setTotal] = useState(0);
  const { data, isLoading, isSuccess } = useGetBasket();

  const baskets: BasketItem[] = data?.data?.data?.items ?? [];

  const installmentCourses = baskets.filter(
    (item) => item.type === 'COURSE' && item.course?.isInstallment
  );

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

  // مبلغ اولین قسط برای دوره‌های اقساطی: installmentPrice / installmentCount
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

  const totalProductPriceWithDiscount = baskets.reduce((sum, item) => {
    const price = item?.course?.discountPrice
      ? Number(item?.course.discountPrice)
      : item?.product?.discountPrice
        ? Number(item?.product.discountPrice)
        : item?.course?.price
          ? Number(item?.course.price)
          : item?.product?.price
            ? Number(item?.product.price)
            : 0;
    const count = Number(item?.count ?? 0);
    return sum + price * count;
  }, 0);

  useEffect(() => {
    if (checkout) {
      let finalTotal = 0;

      if (checkout.selectInstallment === 'installment') {
        // فقط اولین قسط + آیتم‌های غیر اقساطی
        finalTotal = nonInstallmentTotal + installmentFirstPayments;
      } else {
        // حالت نقدی: همه محصولات با تخفیف
        finalTotal = totalProductPriceWithDiscount;
      }

      // اعمال تخفیف
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

      // هزینه ارسال اگر مبلغ بدون تخفیف کمتر از حد مجاز باشد
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
  };
};

export default useBasket;
