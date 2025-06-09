import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useActionCategoryBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      return id
        ? await safeRequest({ url: `/blog/admin/category/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: `/blog/admin/category`, method: 'POST', data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories-blog-admin'] });
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
