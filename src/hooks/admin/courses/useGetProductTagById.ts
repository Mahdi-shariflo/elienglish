import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  id?: string;
};
export const useGetProductTagById = ({ id = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['product-tag-id-admin', id],
    enabled: Boolean(id),
    queryFn: async () => await safeRequest({ url: `/product/admin/tag/${id}` }),
  });
};
