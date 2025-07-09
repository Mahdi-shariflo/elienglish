import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

type Props = {
  page?: string;
  sort?: string;
  search?: string;
};
export const useGetUsersAdmin = ({ page = '1', search = '', sort = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['users-admin', page, search, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/users/admin?page=${page}&sort=${sort}&limit=${20}&search=${decodeURIComponent(search!)}`,
      }),
  });
};
