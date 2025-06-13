import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetCommentById = (id?: string, isAdmin?: boolean) => {
  return useQuery({
    queryKey: ['comments-products', id],
    enabled: Boolean(id),
    queryFn: async () =>
      await safeRequest({
        url: isAdmin
          ? `/comment/admin/${id}`
          : `/comment/comment-page?pageLocation=${encodeURIComponent(id!)}`,
      }),
  });
};
