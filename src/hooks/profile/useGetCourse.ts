import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetCourse = ({ page }: { page: string }) => {
  return useQuery({
    queryKey: ['courses-orders', page],
    queryFn: async () =>
      await safeRequest({
        url: `/order/course/?page=${page ?? 1}&limit=20&sort=createdAt_desc`,
      }),
  });
};
