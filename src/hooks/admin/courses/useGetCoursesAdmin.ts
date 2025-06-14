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
export const useGetCoursesAdmin = ({
  page = '1',
  sort = '',
  search = '',
  filter = '',
  freePlan,
  id = '',
  available,
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['course-admin', page, sort, search, filter, id],
    queryFn: async () =>
      await safeRequest({
        url: `/course/admin?${filter ? filter : ''}&sort=${sort}&page=${page}&limit=${20}&id=${id}&${available ? `available=${available}&` : null}${freePlan ? 'freePlan=true' : ''}${search ? `search=${decodeURIComponent(search!)}` : ''}`,
      }),
  });
};
