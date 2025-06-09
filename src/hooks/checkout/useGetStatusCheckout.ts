import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetStatusCheckout = ({ url }: { url: string }) => {
  return useQuery({
    enabled: Boolean(url),
    queryKey: ['checkout-status'],
    queryFn: async () => await safeRequest({ url }),
    gcTime: 0,
    staleTime: 0,
  });
};
