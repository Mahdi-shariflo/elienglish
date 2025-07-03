import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetSupportsAdmin = ({ page = '1', search = '', sort = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['supports-admin', page, search, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/contactus/admin?page=${page}&sort=${sort}&search=${decodeURIComponent(search!)}`,
      }),
  });
};
