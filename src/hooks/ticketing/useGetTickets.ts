import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetTickets = () => {
  return useQuery({
    queryKey: ['tickting'],
    queryFn: async () =>
      await safeRequest({
        url: `/ticketing/?page=${1}&limit=40&sort=createdAt_desc`,
      }),
  });
};
