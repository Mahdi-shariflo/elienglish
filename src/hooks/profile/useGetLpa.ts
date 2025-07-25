import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetLpa = ({ page }: { page: string }) => {
  return useQuery({
    queryKey: ['lpa', page],
    queryFn: async () =>
      await safeRequest({
        url: `/order/lpa/?page=${page ?? 1}&limit=20&sort=createdAt_desc`,
      }),
  });
};
