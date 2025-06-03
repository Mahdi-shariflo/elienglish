import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetMenusAdmin = () => {
  // Debounce the search input
  return useQuery({
    queryKey: ['menus-admin'],
    queryFn: async () => await safeRequest({ url: `/admin/menu/get-all` }),
  });
};
