import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetCode = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { mobile?: string }) =>
      await safeRequest({ url: '/auth/login', method: 'POST', data }),
    onSuccess: (data, variable) => {
      addToast({
        title: data.data.data.message,
        color: 'success',
      });
      router.push(`/auth/verify/?mobile=${variable.mobile}`);
    },
    onError: (error) => {
      addToast({
        // @ts-expect-error errror
        title: error?.response?.data.errors.message || error?.response?.data.message,
        color: 'danger',
      });
    },
  });
};
