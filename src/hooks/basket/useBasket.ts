'use client';
import { useEffect, useState } from 'react';
import { useGetBasket } from './useGetBasket';
import { useCheckoutStore } from '@/store/checkout-store';
import { freeShippingPrice } from '@/lib/variable';
import { BasketItem } from '@/types';

const useBasket = () => {
  const { checkout } = useCheckoutStore();
  const [discountPrice, setDiscountPrice] = useState<null | number>(null);
  const [total, setTotal] = useState(0);
  const { data, isLoading, isSuccess } = useGetBasket();

  const baskets: BasketItem[] = data?.data?.data?.items;

  const totalCountBasket = baskets?.reduce((total, basket) => {
    return total + (basket?.count ? basket?.count : 0);
  }, 0);

  const totalProductPriceWithoutDiscount = baskets?.reduce((sum, item) => {
    const price = item?.course?.price
      ? Number(item?.course?.price)
      : item?.product?.price
        ? Number(item?.product?.price)
        : 0;
    const count = Number(item?.count ?? 0);
    return sum + price * count;
  }, 0);

  const totalProductPriceWithDiscount = baskets?.reduce((sum, item) => {
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
      let finalTotal = totalProductPriceWithDiscount;

      // محاسبه تخفیف
      if (checkout?.discountCode) {
        if (checkout.discountCode.discountCodeType === 'fixed') {
          setDiscountPrice(Number(checkout.discountCode.discountCodePrice));
          finalTotal -= Number(checkout.discountCode.discountCodePrice);
        } else {
          const percent = Number(checkout.discountCode.discountCodePrice) / 100;
          const percentPrice = Number(percent * totalProductPriceWithDiscount).toFixed(0);
          setDiscountPrice(Number(percentPrice));
          finalTotal -= Number(percentPrice);
        }
      }

      // اضافه کردن هزینه حمل و نقل به مبلغ نهایی
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
  }, [isSuccess, totalProductPriceWithDiscount, checkout]);

  return {
    baskets,
    totalCountBasket,
    totalProductPriceWithoutDiscount,
    totalProductPriceWithDiscount,
    isPending: isLoading,
    total,
    discountPrice,
  };
};

export default useBasket;
