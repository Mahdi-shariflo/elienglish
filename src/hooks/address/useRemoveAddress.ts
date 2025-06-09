import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id?: string }) => {
      return await safeRequest({ url: `/user/address/remove/${id}`, method: 'DELETE' });
    },
    onSuccess: async () => {
      addToast({
        title: 'آدرس با موفقیت حذف شد',
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
