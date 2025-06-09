import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetBlogById = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['single-blog-admin', id],
    enabled: id === 'add' ? false : true,
    queryFn: async () => await safeRequest({ url: `/blog/admin/${id}` }),
    gcTime: 0,
  });
};
