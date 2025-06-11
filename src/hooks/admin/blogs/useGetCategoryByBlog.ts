import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetCategoryByBlog = ({ id }: { id?: string }) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['single-category-blog-admin', id],
    enabled: Boolean(id),
    queryFn: async () => await safeRequest({ url: `/blog/admin/category/${id}` }),
    gcTime: 0,
  });
};
