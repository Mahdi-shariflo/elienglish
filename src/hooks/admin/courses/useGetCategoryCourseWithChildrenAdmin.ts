import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
  filter?: string;
  id?: string;
  freePlan?: boolean;
};
export const useGetCategoryCourseWithChildrenAdmin = ({
  page = '1',
  sort = '',
  search = '',
  filter = '',
  freePlan,
  id = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['category-with-children-course-admin', page, sort, search, filter, id],
    queryFn: async () =>
      await safeRequest({
        url: `/course/admin/category/nested?${filter ? filter : ''}&sort=${sort}&page=${page}&limit=${20}&id=${id}&${freePlan ? 'freePlan=true' : ''}${search ? `search=${decodeURIComponent(search!)}` : ''}`,
      }),
  });
};
