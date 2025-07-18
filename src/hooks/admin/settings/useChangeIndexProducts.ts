import { safeRequest } from '@/lib/safeClient';
import { useMutation } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useChangeIndexProducts = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) => {
      return await safeRequest({ url: `/admin/option/shownoindex`, method: 'POST', data });
    },
    onSuccess: async () => {
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
