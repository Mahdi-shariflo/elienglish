import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';

export const useSendMessageTicket = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) => {
      return await safeRequest({
        url: '/ticketing/send-message',
        method: 'POST',
        data,

        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async (data) => {
      const user = data?.data?.data?.user;
      addToast({
        title: 'با موفقیت انجام شد',
        color: 'success',
      });
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
