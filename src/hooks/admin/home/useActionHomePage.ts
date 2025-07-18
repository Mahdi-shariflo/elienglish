import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { updateCache } from '@/actions/update';

export const useActionHomePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      return id
        ? await safeRequest({ url: `/mainpage/admin`, method: 'PATCH', data })
        : await safeRequest({ url: `/mainpage/admin`, method: 'POST', data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['home-page'] });
      updateCache('home-page');
      addToast({
        title: 'بروز رسانی شد',
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
