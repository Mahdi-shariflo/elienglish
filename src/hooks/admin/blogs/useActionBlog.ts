import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { addToast } from '@heroui/react';

export const useActionMag = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) => {
      return id !== 'add'
        ? await safeRequest({ url: `/blog/admin/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: `/blog/admin`, method: 'POST', data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['blogs-admin-page'] });
      addToast({
        title: 'با موفقیت انجام شد',
        color: 'success',
      });
      router.push('/admin/blogs/');
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
