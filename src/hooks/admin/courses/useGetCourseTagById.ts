import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  id?: string;
};
export const useGetCourseTagById = ({ id = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['course-tag-id-admin', id],
    enabled: Boolean(id),
    queryFn: async () => await safeRequest({ url: `/course/admin/tag/${id}` }),
  });
};
