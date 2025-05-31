import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/lib/auth/useSession';

export const useGetBasket = () => {
  const user = useSession();
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
