import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetOrders = ({ sort, page }: { sort: string; page: string }) => {
  return useQuery({
    queryKey: ['orders', page, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/user/order/?page=${page ?? 1}&limit=20&status=${sort}&sort=createdAt_desc`,
      }),
  });
};
