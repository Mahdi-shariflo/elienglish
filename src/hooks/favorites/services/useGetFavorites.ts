import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetFavorites = () => {
  return useQuery({
    queryKey: ['favs'],
    queryFn: async () => await safeRequest({ url: `/favoriteitem` }),
  });
};
