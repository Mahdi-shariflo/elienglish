import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetTransportsAdmin = ({ page = '1', search = '', sort = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['transports-admin', page, search, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/transport/get-all?page=${page}&sort=${sort}&limit=${20}&search=${decodeURIComponent(search!)}`,
      }),
  });
};
