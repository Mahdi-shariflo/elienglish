import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetTransportByIdAdmin = ({ id }: { id?: string }) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['single-transport-admin', id],
    enabled: Boolean(id),
    queryFn: async () => await safeRequest({ url: `/admin/transport/${id}` }),
  });
};
