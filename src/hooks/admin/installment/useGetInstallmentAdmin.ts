import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

type Props = {
  page?: string;
  sort?: string;
  search?: string;
  endDate?: string;
  startDate?: string;
  orderStatus?: string;
  nameStatus?: string;
  userId?: string;
  courseId?: string;
};
export const useGetInstallmentAdmin = ({
  page = '1',
  search = '',
  sort = '',
  endDate,
  startDate = '',
  orderStatus = '',
  nameStatus,
  userId,
  courseId,
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: [
      'course-orders-admin',
      page,
      search,
      endDate,
      startDate,
      orderStatus,
      sort,
      userId,
      courseId,
    ],
    queryFn: async () =>
      await safeRequest({
        url: `/installment/admin?page=${page}&limit=${20}&sort=${sort}&search=${decodeURIComponent(search!)}&${orderStatus ? `installmentStatus=${orderStatus}` : ''}${userId ? `&userId=${userId}` : ''}${courseId ? `courseId=${courseId}` : ''}`,
      }),
  });
};
