import { safeRequest } from '@/lib/safeClient';
import { User } from '@/store/types';
import { addToast } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useUpdateUser = () => {
  const session = useSession();
  const userData = session.data as User;
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) => {
      return await safeRequest({ url: '/users', method: 'PATCH', data });
    },
    onSuccess: async (data) => {
      const user = data?.data?.data?.user;
      // userData?.setSessionManually({ ...userData, ...user });
      addToast({
        title: 'اطلاعات کاربری با موفقیت اپدیت شد',
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
