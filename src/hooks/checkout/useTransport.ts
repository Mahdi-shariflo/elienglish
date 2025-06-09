import { safeRequest } from '@/lib/safeClient';
import { useMutation } from '@tanstack/react-query';
import useBasket from '../basket/useBasket';
import { useCheckoutStore } from '@/store/checkout-store';
import { addToast } from '@heroui/react';

export const useTransport = () => {
  const { total } = useBasket();
  const { setCheckout, checkout } = useCheckoutStore();

  return useMutation({
    mutationFn: async ({ city }: { city: string }) => {
      return await safeRequest({
        url: `/user/transport/use?city=${city}&basketAmount=${total}`,
        method: 'POST',
        data: {},
      });
    },
    onSuccess: async ({ data }) => {
      const transport = Array.isArray(data.data.response)
        ? data.data.response[0].shippingMethod[0]
        : null;
      setCheckout({ ...checkout, transport });
    },
    onError: (error) => {
      addToast({
        // @ts-expect-error errror
        title: error?.response?.data.errors.message,
        color: 'danger',
      });
    },
  });
};
