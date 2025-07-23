import { safeRequest } from '@/lib/safeClient';
import { useMutation } from '@tanstack/react-query';

export const useUpdateWatchVideo = () => {
  return useMutation({
    mutationFn: async ({ data }: { data: unknown }) => {
      return await safeRequest({ url: '/watchedvideo', method: 'post', data });
    },
  });
};
