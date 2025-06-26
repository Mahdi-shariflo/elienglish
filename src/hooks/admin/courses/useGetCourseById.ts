import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetCourseById = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['single-course-admin', id],
    enabled: id === 'new' ? false : true,
    queryFn: async () => await safeRequest({ url: `/course/admin/${id}` }),
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });
};
