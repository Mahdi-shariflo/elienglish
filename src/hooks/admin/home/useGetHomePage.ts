import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetHomePage = () => {
  // Debounce the search input
  return useQuery({
    queryKey: ['home-page'],
    queryFn: async () => await safeRequest({ url: `/admin/edit-mainpage/get-all` }),
  });
};
