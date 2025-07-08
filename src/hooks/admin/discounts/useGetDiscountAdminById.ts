import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  id?: string;
};

export const useGetDiscountAdminById = ({ id }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: [id],
    enabled: Boolean(id),
    queryFn: async () => await safeRequest({ url: `/disocuntcode/admin/${id}` }),
    gcTime: 0,
    staleTime: 0,
  });
};
