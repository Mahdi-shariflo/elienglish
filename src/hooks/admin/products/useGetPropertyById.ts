import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  id?: string;
  page?: string;
  sort?: string;
  search?: string;
  filter?: string;
};
export const useGetPropertyById = ({
  id = '',
  page = '1',
  sort = '',
  search = '',
  filter = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['propertybyid-admin', id, page, sort, search, filter],
    enabled: Boolean(id),
    queryFn: async () =>
      await safeRequest({
        url: `/admin/property/${id}?${
          filter ? filter : ''
        }&sort=${sort}&page=${page}&limit=${20}&search=${search}`,
      }),
  });
};
