import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useGetBasket = () => {
  const session = useSession();
  const user: any = session.data;
  // Debounce the search input
  return useQuery({
    queryKey: ['baskets'],
    enabled: Boolean(user?.finger || user?._id),
    queryFn: async () => {
      const url = `/user/basket/?${user?._id ? `userId=${user._id}` : `identifier=${user?.finger}`}`;
      return await safeRequest({ url });
    },
    retry: 1,
    refetchOnMount: true,
    staleTime: 0,
  });
};
