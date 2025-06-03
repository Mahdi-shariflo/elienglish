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
export const useGetProductTagsAdmin = ({
  page = '1',
  sort = '',
  search = '',
  filter = '',
  freePlan,
  id = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['product-tags-admin', page, sort, search, filter, id],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/product-tag/all?${filter ? filter : ''}&sort=${sort}&page=${page}&limit=${20}`,
      }),
  });
};
