import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetSetting = () => {
  // Debounce the search input
  return useQuery({
    queryKey: ['setting-admin'],
    queryFn: async () =>
      await safeRequest({
        url: `/setting/admin`,
      }),
  });
};
