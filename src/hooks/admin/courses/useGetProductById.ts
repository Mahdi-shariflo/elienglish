import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetProductById = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['single-product-admin', id],
    enabled: id === 'new' ? false : true,
    queryFn: async () => await safeRequest({ url: `/product/admin/${id}` }),
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });
};
