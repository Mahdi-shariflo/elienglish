import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { updateCache } from '@/actions/update';

export const useActionBrandPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      return id
        ? await safeRequest({ url: `/admin/edit-brandpage/update/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: `/admin/edit-brandpage/add`, method: 'POST', data });
    },
    onSuccess: async () => {
      updateCache('brand-page');
      await queryClient.invalidateQueries({ queryKey: ['brand-page'] });
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
