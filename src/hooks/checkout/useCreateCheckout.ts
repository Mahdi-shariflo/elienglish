import { safeRequest } from '@/lib/safeClient';
import { useCheckoutStore } from '@/store/checkout-store';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';

export const useCreateCheckout = () => {
  const { setCheckout } = useCheckoutStore();
  return useMutation({
    mutationFn: async ({ url, data }: { url: string; data: unknown }) => {
      return await safeRequest({ url, method: 'POST', data });
    },
    onSuccess: async (data, variables) => {
      if (data?.data?.data.gatewayURL) {
        location.href = data?.data?.data.gatewayURL;
        setTimeout(() => {
          setCheckout({
            address: null,
            discountCode: null,
            payment: null,
            transport: null,
          });
        }, 2000);
      }
      if (variables.url === '/snapppayment/snappgetway') {
        location.href = data.data.data.Request.response.paymentPageUrl;
        setTimeout(() => {
          setCheckout({
            address: null,
            discountCode: null,
            payment: null,
            transport: null,
          });
        }, 2000);
      }
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
