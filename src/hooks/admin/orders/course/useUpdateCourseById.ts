'use client';
import { safeRequest } from '@/lib/safeClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

export const useUpdateCourseById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: unknown; id: string }) =>
      await safeRequest({ url: `/order/admin/course/${id}`, method: 'PATCH', data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['single-course-order-admin', 'course-orders-admin'],
      });
      addToast({
        title: 'سفارش با موفقیت به روز رسانی شد',
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
