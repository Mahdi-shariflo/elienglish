import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetPayment = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: async () => await safeRequest({ url: '/payment/getway' }),
    gcTime: 0,
    staleTime: 0,
  });
};
