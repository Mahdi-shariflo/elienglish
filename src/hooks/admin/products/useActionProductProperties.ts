import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useActionProductProperties = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      return id
        ? await safeRequest({ url: `/admin/property/update/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: `/admin/property/add`, method: 'POST', data });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['property-admin'] });
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
