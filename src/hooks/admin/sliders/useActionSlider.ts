'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { safeRequest } from '@/lib/safeClient';
import { useRouter } from 'next/navigation';

export const useActionSlider = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ data, id }: { data: unknown; id: string }) => {
      return id
        ? await safeRequest({
            url: `/admin/pic-slider/update/${id}`,
            method: 'PATCH',
            data,
          })
        : await safeRequest({
            url: `/admin/pic-slider/add`,
            method: 'POST',
            data,
          });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sliders-admin-page'] });
      addToast({
        title: 'رسانه با موفقیت ایجاد شد',
        color: 'success',
      });
      router.push('/admin/sliders');
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
