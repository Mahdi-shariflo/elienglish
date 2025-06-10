import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetCommentsProductById = (id?: string) => {
  return useQuery({
    queryKey: ['comments-products', id],
    enabled: Boolean(id),
    queryFn: async () =>
      await safeRequest({ url: `/comment/comment-page?pageLocation=${encodeURIComponent(id!)}` }),
  });
};
