import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetTagsBlogAdmin = ({ page = '1', search = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['tags-mag-admin'],
    queryFn: async () =>
      await safeRequest({
        url: `/blog/admin/tag/all?page=${page}&limit=${20}&search=${decodeURIComponent(search!)}`,
      }),
  });
};
