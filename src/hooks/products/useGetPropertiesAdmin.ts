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
export const useGetPropertiesAdmin = ({
  page = '1',
  sort = '',
  search = '',
  filter = '',
  id = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['property-admin', page, sort, search, filter, id],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/property/all?${filter ? filter : ''}&sort=${sort}&page=${page}&limit=${20}&search=${search}`,
      }),
  });
};
