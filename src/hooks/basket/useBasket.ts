'use client';
import { useEffect, useState } from 'react';
import { useGetBasket } from './useGetBasket';
import { Product } from '@/types/home';
import { useCheckoutStore } from '@/store/checkout-store';
import { freeShippingPrice } from '@/lib/variable';

const useBasket = () => {
  const { checkout } = useCheckoutStore();
  const [discountPrice, setDiscountPrice] = useState<null | number>(null);
  const [total, setTotal] = useState(0);
  const { data, isLoading, isSuccess } = useGetBasket();

  const baskets: { product: Product; total: number; count: number }[] = data?.data?.data?.basket;

  const totalCountBasket = baskets?.reduce((total, basket) => {
    return total + (basket?.count ? basket?.count : 0);
  }, 0);

  const totalProductPriceWithoutDiscount = baskets?.reduce((sum, item) => {
    const price = Number(item?.product.price) * Number(item?.count ? item?.count : 0);
    return sum + price;
  }, 0);

  const totalProductPriceWithDiscount = baskets?.reduce((sum, item) => {
    const price = item?.product.discountPrice
      ? Number(item?.product.discountPrice) * Number(item?.count ?? 0)
      : Number(item?.product.price) * Number(item?.count ?? 0);
    return sum + price;
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
