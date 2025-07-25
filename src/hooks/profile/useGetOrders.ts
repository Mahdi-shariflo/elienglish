import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetOrders = ({ page }: { page: string }) => {
  return useQuery({
    queryKey: ['orders', page],
    queryFn: async () =>
      await safeRequest({
        url: `/order/product-physical/?page=${page ?? 1}&limit=20&sort=createdAt_desc`,
      }),
  });
};
