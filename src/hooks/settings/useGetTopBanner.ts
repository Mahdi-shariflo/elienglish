import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetTopBanner = () => {
  return useQuery({
    queryKey: ['top-banner'],
    queryFn: async () =>
      await safeRequest({
        url: `/setting/banner-up-header`,
      }),
  });
};
