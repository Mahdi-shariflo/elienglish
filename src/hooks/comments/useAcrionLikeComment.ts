import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAcrionLikeComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      data,
    }: {
      data: { commentId: string; operation: string; loading?: string; productId?: string };
    }) => await safeRequest({ url: `/user/comment/likeordislike`, data, method: 'POST' }),

    onSuccess: async () => {
      addToast({
        title: 'عملیات با موفقیت انجام شد!',
        color: 'success',
      });

      // ریست کردن میوتیشن بعد از موفقیت
      mutation.reset();
      await queryClient.invalidateQueries({ queryKey: ['comments-products'] });
    },

    onError: (error) => {
      addToast({
        // @ts-expect-error errror
        title: error?.response?.data.message[0],
        color: 'danger',
      });
    },
  });

  return mutation;
};
