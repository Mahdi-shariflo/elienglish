import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetNotfication = () => {
  return useQuery({
    queryKey: ['notification'],
    queryFn: async () => await safeRequest({ url: '/user/notification/inventory' }),
  });
};
