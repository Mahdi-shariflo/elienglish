import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useComments = () => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: async () => await safeRequest({ url: `/comment` }),
  });
};
