import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetDiscountsAdmin = ({ page = '1', search = '', sort = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['discount-admin', page, search, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/discount-code?page=${page}&sort=${sort}&limit=${20}&search=${decodeURIComponent(search!)}`,
      }),
  });
};
