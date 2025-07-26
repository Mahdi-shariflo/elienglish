import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetTicketById = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['ticket-by-id', id],
    enabled: Boolean(id),
    queryFn: async () =>
      await safeRequest({
        url: `/ticketing/${id}`,
      }),
  });
};
