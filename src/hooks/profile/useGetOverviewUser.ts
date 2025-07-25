import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetOverviewUser = () => {
  return useQuery({
    queryKey: ['overview'],
    queryFn: async () =>
      await safeRequest({
        url: `/order/overview`,
      }),
  });
};
