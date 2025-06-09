import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
type Props = {
  data: unknown;
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: async ({ data }: Props) => {
      return await safeRequest({
        url: '/user/comment/add',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: async () => {
      addToast({
        title: 'دیدگاه شما با موفقیت ثبت شد',
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
