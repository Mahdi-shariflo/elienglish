import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  page?: string;
  sort?: string;
  search?: string;
};

export const useGetMediaAdmin = ({ page = '1', sort = '', search = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['media-admin', page, sort, search],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/media/get-all?page=${page}&limit=${50}&sort=${sort}&search=${decodeURIComponent(search!)}`,
      }),
  });
};
