import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetCategoriesBlog = ({ page = '1', sort = '', search = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['categories-blog-admin', page, search, sort],
    queryFn: async () => await safeRequest({ url: `/admin/mag-category/all` }),
  });
};
