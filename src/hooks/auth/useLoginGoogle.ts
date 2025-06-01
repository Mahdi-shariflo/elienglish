'use client';
import { saveSession } from '@/lib/auth/storage';
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
      await saveSession(data.data);
      location.href = '/';
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
