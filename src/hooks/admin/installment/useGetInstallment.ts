import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetInstallment = () => {
  // Debounce the search input
  return useQuery({
    queryKey: ['installment-admin'],
    queryFn: async () =>
      await safeRequest({
        url: `/installment`,
      }),
  });
};
