'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { safeRequest } from '@/lib/safeClient';

export const useAddMediaAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) =>
      await safeRequest({
        url: '/media/admin',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['media-admin'] });
      addToast({
        title: 'رسانه با موفقیت ایجاد شد',
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
