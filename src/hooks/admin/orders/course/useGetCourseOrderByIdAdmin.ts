import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetCourseOrderByIdAdmin = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['single-course-order-admin', id],
    enabled: id === 'add' ? false : true,
    queryFn: async () => await safeRequest({ url: `/order/admin/course/${id}` }),
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });
};
