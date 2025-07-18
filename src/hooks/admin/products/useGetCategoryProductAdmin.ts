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
export const useGetCategoryProductAdmin = ({
  page = '1',
  sort = '',
  search = '',
  filter = '',
  freePlan,
  id = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['category-products-admin', page, sort, search, filter, id],
    queryFn: async () =>
      await safeRequest({
        url: `/product/admin/category/nested?${filter ? filter : ''}&page=${page}&limit=${20}&id=${id}&${freePlan ? 'freePlan=true' : ''}${search ? `search=${decodeURIComponent(search!)}` : ''}`,
      }),
  });
};
