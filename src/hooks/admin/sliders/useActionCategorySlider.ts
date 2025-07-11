import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useActionCategorySlider = () => {
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
        ? await safeRequest({
            url: `/admin/pic-slider-category/update/${id}`,
            method: 'PATCH',
            data,
          })
        : await safeRequest({ url: `/admin/pic-slider-category/add`, method: 'POST', data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['slider-categories-admin'] });
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
