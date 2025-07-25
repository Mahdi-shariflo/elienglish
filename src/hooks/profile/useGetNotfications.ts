import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetNotfications = () => {
  return useQuery({
    queryKey: ['notification'],
    queryFn: async () => await safeRequest({ url: '/notification' }),
  });
};
