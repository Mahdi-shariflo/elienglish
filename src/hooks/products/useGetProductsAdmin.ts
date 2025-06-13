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

export const useGetProductsAdmin = ({
  page = '1',
  sort = '',
  search = '',
  filter = '',
  freePlan = false,
  id = '',
  available,
}: Props) => {
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (filter) params.append('filter', filter);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('limit', '20');
    if (id) params.append('id', id);
    if (available !== undefined) params.append('available', String(available));
    if (freePlan) params.append('freePlan', 'true');
    if (search) params.append('search', decodeURIComponent(search));

    return params.toString();
  };

  return useQuery({
    queryKey: ['products-admin', page, sort, search, filter, id, available, freePlan],
    queryFn: async () => {
      const url = `/admin/products/get-all?${buildQueryParams()}`;
      return await safeRequest({ url });
    },
  });
};
