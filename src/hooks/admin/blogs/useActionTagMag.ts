import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useActionTagMag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { title: string; url: string; description: string };
    }) => {
      return id
        ? await safeRequest({ url: `/blog/admin/tag/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: `/blog/admin/tag`, method: 'POST', data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tags-mag-admin'] });
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
