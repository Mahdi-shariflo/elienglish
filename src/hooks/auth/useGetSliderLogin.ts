import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetSliderLogin = () => {
  return useQuery({
    queryKey: ['login-slider'],
    queryFn: async () => await safeRequest({ url: `/setting/login-page-slider` }),
    gcTime: 0,
    staleTime: 0,
  });
};
