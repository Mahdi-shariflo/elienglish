import { safeRequest } from '@/lib/safeClient';
import { useCheckoutStore } from '@/store/checkout-store';
import { useMutation } from '@tanstack/react-query';

export const useDiscount = () => {
  const { setCheckout, checkout } = useCheckoutStore();
  return useMutation({
    mutationKey: ['discount'],
    mutationFn: async ({ code }: { code: string }) =>
      await safeRequest({ url: `/disocuntcode`, method: 'POST', data: { discountCode: code } }),
    onSuccess: (data, variables) => {
      const discountData = { code: variables.code, ...data?.data?.data };
      setCheckout({ ...checkout, discountCode: discountData });
    },
  });
};
