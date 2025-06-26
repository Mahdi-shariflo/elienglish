import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
  filter?: string;
  id?: string;
  freePlan?: boolean;
  available?: boolean;
};
export const useGetCourseTag = ({ page = '1', sort = '', search = '', filter = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['course-tags-admin', page, sort, search, filter],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/course-tag/all?${filter ? filter : ''}&sort=${sort}&page=${page}&limit=${20}&${search ? `search=${decodeURIComponent(search!)}` : ''}`,
      }),
  });
};
