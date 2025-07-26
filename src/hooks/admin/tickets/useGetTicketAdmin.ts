import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetTicketAdmin = ({ page = '1', search = '', sort = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['tickets-admin', page, search, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/ticketing/admin/findall?page=${page}&sort=${sort}&search=${decodeURIComponent(search!)}`,
      }),
  });
};
