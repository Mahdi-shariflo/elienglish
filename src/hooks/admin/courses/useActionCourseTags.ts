import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useActionCourseTags = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      return id
        ? await safeRequest({ url: `/course/admin/tag/${id}`, method: 'PATCH', data })
        : await safeRequest({ url: `/course/admin/tag`, method: 'POST', data });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['course-tags-admin'] });
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
