import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/lib/auth/useSession';

export const useCheckAvailability = () => {
  const user = useSession();
  // Debounce the search input
  return useQuery({
    queryKey: ['check-availability'],
    enabled: Boolean(user?._id), // Only query when the debounced value is at least 3 characters
    queryFn: async () =>
      await safeRequest({ url: `/user/basket/check-availability?userId=${user?._id}` }),
    retry: 1,
    refetchOnMount: true,
    gcTime: 0,
    staleTime: 0,
  });
};
