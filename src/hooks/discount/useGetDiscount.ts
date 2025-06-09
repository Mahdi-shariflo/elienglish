import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetDiscount = ({ page }: { page: string }) => {
  return useQuery({
    queryKey: ['discounts', page],
    queryFn: async () =>
      await safeRequest({ url: `/user/discount-code/all?limit=10&page=${page ?? 1}` }),
  });
};
