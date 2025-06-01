'use client';
import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';

export const useLoginGoogle = () => {
  return useMutation({
    mutationFn: async (data: { idToken: string }) =>
      await safeRequest({
        url: '/auth/login-google',
        method: 'POST',
        data,
      }),
    onSuccess: async (data) => {
      console.log(data, 'jjjfjfjfjfjfjfjfjffjfjfjfjfjj');
      addToast({
        title: 'ورود با موفقت انجام شد',
        color: 'success',
      });
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
