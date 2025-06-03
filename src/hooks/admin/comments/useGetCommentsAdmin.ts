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
  status = 'Awaiting',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['comments-admin', page, search, sort, status],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/comment/all?page=${page}&limit=20&status=${status}&sort=${sort}&serach=${encodeURIComponent(search)}`,
      }),
  });
};
