import { safeRequest } from '@/lib/safeClient';
import { Address } from '@/types';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: Address }) => {
      return await safeRequest({ url: '/user/address/add', method: 'POST', data });
    },
    onSuccess: async () => {
      addToast({
        title: 'آدرس با موفقیت ثبت شد',
        color: 'success',
      });
      await queryClient.invalidateQueries({ queryKey: ['address'] });
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
