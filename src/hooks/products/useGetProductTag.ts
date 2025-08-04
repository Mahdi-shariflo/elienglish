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
export const useGetProductTag = ({
  page = '1',
  sort = 'createdAt_desc',
  search = '',
  filter = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['product-tags-admin', page, sort, search, filter],
    queryFn: async () =>
      await safeRequest({
        url: `/product/admin/tag/all?${filter ? filter : ''}&sort=${sort}&page=${page}&limit=${20}&${search ? `search=${decodeURIComponent(search!)}` : ''}`,
      }),
  });
};
