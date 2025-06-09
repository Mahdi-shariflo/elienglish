import { safeRequest } from '@/lib/safeClient';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { addToast } from '@heroui/react';

export const useActionComment = () => {
  const router = useRouter();
  const { id } = useParams();
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) => {
      return id !== 'add'
        ? await safeRequest({ url: `/comment/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: `/comment`, method: 'POST', data });
    },
    onSuccess: async () => {
      addToast({
        title: 'با موفقیت انجام شد',
        color: 'success',
      });
      router.push('/admin/blogs/');
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
