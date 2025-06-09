import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';

export const useAddFavProduct = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await safeRequest({
        url: '/user/like-product/add',
        method: 'POST',
        data: { likeProducts: id },
      });
    },
    onSuccess: async () => {
      addToast({
        title: 'با موفقیت به لیست علاقه‌مندی شما اضافه شد.',
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
