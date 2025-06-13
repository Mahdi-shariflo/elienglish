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
export const useGetAttributeById = ({
  page = '1',
  sort = '',
  search = '',
  filter = '',
  freePlan,
  id = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    enabled: Boolean(id),
    queryKey: ['category-products-admin', page, sort, search, filter, id],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/attribiute/all??${
          filter ? filter : ''
        }&sort=${sort}&page=${page}&limit=${20}&propertyId=${id}&${
          freePlan ? 'freePlan=true' : ''
        }${search ? `search=${decodeURIComponent(search!)}` : ''}`,
      }),
  });
};
