import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';

export const usePayInstallment = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) => {
      return await safeRequest({ url: '/payment/installment-getway', method: 'POST', data });
    },
    onSuccess: async (data) => {
      location.href = data?.data?.data?.paymentLink;
    },
    onError: (error) => {
      addToast({
        // @ts-expect-error errror
        title: error?.response?.data.message[0],
        color: 'danger',
      });
    },
  });
};
