import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetTransactionsAdmin = ({ page = '1', search = '', sort = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['transactions-admin', page, search, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/payment/get-all?page=${page}&limit=${20}&sort=${sort}&search=${decodeURIComponent(search!)}`,
      }),
  });
};
