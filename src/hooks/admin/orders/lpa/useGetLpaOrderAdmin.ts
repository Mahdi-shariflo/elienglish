import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetLpaOrderAdmin = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['single-lpa-order-admin', id],
    enabled: id === 'add' ? false : true,
    queryFn: async () => await safeRequest({ url: `/order/admin/lpa/${id}` }),
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });
};
