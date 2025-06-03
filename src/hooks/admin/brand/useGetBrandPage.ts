import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetBrandPage = () => {
  // Debounce the search input
  return useQuery({
    queryKey: ['brand-page'],
    queryFn: async () => await safeRequest({ url: `/admin/edit-brandpage/get-all` }),
  });
};
