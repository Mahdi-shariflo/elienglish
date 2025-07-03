import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
type Props = {
  data: unknown;
};

export const useCreateContactus = () => {
  return useMutation({
    mutationFn: async ({ data }: Props) => {
      return await safeRequest({
        url: '/contactus',
        method: 'POST',
        data,
      });
    },
    onSuccess: async () => {
      addToast({
        title: '  با موفقیت ثبت شد',
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
