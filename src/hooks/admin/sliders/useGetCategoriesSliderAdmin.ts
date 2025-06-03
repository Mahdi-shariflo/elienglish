import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetCategoriesSliderAdmin = ({ page, search, sort }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['slider-categories-admin', search, sort, page],
    queryFn: async () => await safeRequest({ url: `/admin/pic-slider-category/list-of-all` }),
  });
};
