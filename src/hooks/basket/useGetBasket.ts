import { useSession } from '@/lib/auth/useSession';
import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetBasket = () => {
  const session = useSession();

  // Debounce the search input
  return useQuery({
    queryKey: ['baskets'],
    enabled: Boolean(session?.finger || session?._id),
    queryFn: async () => {
      const url = `/basket/${session?._id ? `${session._id}` : ``}?${session?._id ? `sessionId=${session._id}` : `identifier=${session?.finger}`}`;
      return await safeRequest({ url });
    },
    retry: 1,
    refetchOnMount: true,
    staleTime: 0,
  });
};
