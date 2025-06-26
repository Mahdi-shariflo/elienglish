import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  id?: string;
};
export const useGetCategoryCourseByIdAdmin = ({ id = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['category-course-id-admin', id],
    enabled: Boolean(id),
    queryFn: async () => await safeRequest({ url: `/course/admin/category/${id}` }),
  });
};
