import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetAddress = () => {
  return useQuery({
    queryKey: ['address'],
    queryFn: async () => await safeRequest({ url: `/address` }),
    gcTime: 0,
    staleTime: 0,
  });
};
