import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
  filter?: string;
  id?: string;
};
export const useGetFaqAdmin = ({
  page = '1',
  sort = '',
  search = '',
  filter = '',
  id = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['faq-admin', page, sort, search, filter, id],
    queryFn: async () =>
      await safeRequest({
        url: `/faq/admin/?${filter ? filter : ''}&page=${page}&limit=${20}`,
      }),
  });
};
