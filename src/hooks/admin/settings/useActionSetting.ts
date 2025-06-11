'use client';
import { safeRequest } from '@/lib/safeClient';
import { useMutation } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useActionSetting = () => {
  return useMutation({
    mutationFn: async ({ data, id }: { data: unknown; id: string }) =>
      id
        ? await safeRequest({ url: `/setting/admin/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: '/setting/admin', method: 'POST', data }),
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
