import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetBlogsAdmin = ({ page = '1', sort = 'createdAt_desc', search = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['blogs-admin-page', page, search, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/blog/admin/?page=${page}&limit=${20}&sort=${sort}&search=${decodeURIComponent(search!)}`,
      }),
    refetchOnMount: true,
  });
};
