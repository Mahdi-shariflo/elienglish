import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetDownloads = ({ page }: { page: string }) => {
  return useQuery({
    queryKey: ['digital-orders', page],
    queryFn: async () =>
      await safeRequest({
        url: `/order/product-digital/?page=${page ?? 1}&limit=20&sort=createdAt_desc`,
      }),
  });
};
