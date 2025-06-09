import { safeRequest } from '@/lib/safeClient';
import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useCheckAvailability = () => {
  const session = useSession();
  const user = session.data as User;
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
