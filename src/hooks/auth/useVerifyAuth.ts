'use client';
import { saveSession } from '@/lib/auth/storage';
import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useVerifyAuth = () => {
  const session = useSession();
  const user: any = session?.data;
  return useMutation({
    mutationFn: async (data: { mobile?: string | null; code?: string | null }) =>
      await safeRequest({
        url: '/auth/check-otp',
        method: 'POST',
        data: {
          ...data,
          identifier: user?.finger,
        },
      }),
    onSuccess: async (data) => {
      const user = data.data.data;
      const url = new URL(window.location.href);
      const hostname = url.hostname;

      if (
        hostname.includes('stage') &&
        user.userRole !== 'SUPERADMIN' &&
        user.userRole !== 'ADMIN'
      ) {
        return addToast({
          title: 'دسترسی محدود شد',
          color: 'danger',
        });
      }

      const session = {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        accessTokenExpires: user.tokenExpiresIn,
      };
      await saveSession(session);
      addToast({
        title: 'ورود با موفقت انجام شد',
        color: 'success',
      });

      location.href = '/';
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
