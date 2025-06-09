import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';

export const useAddNotficationProduct = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await safeRequest({
        url: '/user/notification/add-discount',
        method: 'POST',
        data: { discountNotification: id },
      });
    },
    onSuccess: async () => {
      addToast({
        title: 'با موفقیت به لیست اطلاع رسانی شما اضافه شد.',
        color: 'success',
      });
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
