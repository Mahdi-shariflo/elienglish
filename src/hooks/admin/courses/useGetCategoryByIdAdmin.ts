import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  id?: string;
};
export const useGetCategoryByIdAdmin = ({ id = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['category-id-admin', id],
    enabled: Boolean(id),
    queryFn: async () => await safeRequest({ url: `/admin/category/${id}` }),
  });
};
