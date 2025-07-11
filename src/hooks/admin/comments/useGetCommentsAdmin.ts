import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
  status?: string;
};
export const useGetCommentsAdmin = ({
  page = '1',
  search = '',
  sort = '',
  status = 'awaiting',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['comments-admin', page, search, sort, status],
    queryFn: async () =>
      await safeRequest({
        url: `/comment/admin?page=${page}&limit=20&published=${status}&sort=${sort}&serach=${encodeURIComponent(search)}`,
      }),
  });
};
