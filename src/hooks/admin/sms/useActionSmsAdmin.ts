'use client';
import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useActionSmsAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: unknown; id?: string }) =>
      id
        ? await safeRequest({ url: `/admin/smsdelivery/update/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: '/admin/smsdelivery/add', method: 'POST', data }),
    onSuccess: async () => {
      addToast({
        title: 'با موفقیت انجام شد',
        color: 'success',
      });
      await queryClient.invalidateQueries({ queryKey: ['sms-admin'] });
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
