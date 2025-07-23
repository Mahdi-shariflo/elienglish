import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetDigitalOrdersByIdAdmin = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['single-digital-order-admin', id],
    enabled: id === 'add' ? false : true,
    queryFn: async () => await safeRequest({ url: `/order/admin/product-digital/${id}` }),
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });
};
