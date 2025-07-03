import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
  filter?: string;
};
export const useGetLpaAdmin = ({ page = '1', sort = '', search = '', filter }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['lpa-admin', page, sort, search],
    queryFn: async () =>
      await safeRequest({
        url: `/lpa/admin?${filter ? filter : ''}sort=${sort}&page=${page}&limit=${20}&${search ? `search=${decodeURIComponent(search!)}` : ''}`,
      }),
  });
};
