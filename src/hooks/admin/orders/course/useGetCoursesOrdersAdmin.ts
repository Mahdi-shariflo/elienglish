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
};
export const useGetCoursesOrdersAdmin = ({
  page = '1',
  search = '',
  sort = '',
  endDate,
  startDate = '',
  orderStatus = '',
  nameStatus,
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['course-orders-admin', page, search, endDate, startDate, orderStatus, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/order/admin/course?page=${page}&limit=${20}&sort=${sort}&endDate=${endDate}&startDate=${startDate}&search=${decodeURIComponent(search!)}&${orderStatus ? `${nameStatus}=${orderStatus}` : null}`,
      }),
  });
};
