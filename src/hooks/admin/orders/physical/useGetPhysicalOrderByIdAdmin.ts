import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetPhysicalOrderByIdAdmin = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['single-physical-order-admin', id],
    enabled: id === 'add' ? false : true,
    queryFn: async () => await safeRequest({ url: `/order/product-physical/${id}` }),
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });
};
