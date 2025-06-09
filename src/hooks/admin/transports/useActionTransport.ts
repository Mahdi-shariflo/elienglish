'use client';
import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useActionTransport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: unknown; id?: string }) =>
      id
        ? await safeRequest({ url: `/admin/transport/update/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: '/admin/transport/add', method: 'POST', data }),
    onSuccess: async () => {
      addToast({
        title: 'با موفقیت انجام شد',
        color: 'success',
      });
      await queryClient.invalidateQueries({ queryKey: ['transports-admin'] });
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
