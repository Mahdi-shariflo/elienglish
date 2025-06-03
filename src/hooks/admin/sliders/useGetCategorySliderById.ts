import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  id?: string;
};
export const useGetCategorySliderById = ({ id }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: [id],
    enabled: Boolean(id),
    queryFn: async () => await safeRequest({ url: `/admin/pic-slider-category/${id}` }),
    staleTime: 0,
    gcTime: 0,
  });
};
