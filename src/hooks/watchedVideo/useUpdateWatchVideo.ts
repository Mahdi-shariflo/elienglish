import { safeRequest } from '@/lib/safeClient';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useUpdateWatchVideo = () => {
  const session = useSession();
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) => {
      return await safeRequest({ url: '/watchedvideo', method: 'post', data });
    },
  });
};
