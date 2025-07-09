import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetAddressById = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ['addressbyId', id],
    enabled: Boolean(id !== 'new'),
    queryFn: async () => await safeRequest({ url: `/address/${id}` }),
    staleTime: 0,
    gcTime: 0,
  });
};
