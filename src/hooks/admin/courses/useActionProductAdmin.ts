import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';

export const useActionProductAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      return id !== 'new'
        ? await safeRequest({ url: `/product/admin/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: `/product/admin`, method: 'POST', data });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['products-admin'] });
      router.push('/admin/products');
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
