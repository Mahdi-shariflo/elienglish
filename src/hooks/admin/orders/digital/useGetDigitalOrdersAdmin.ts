import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

type Props = {
  page?: string;
  sort?: string;
  search?: string;
  endDate?: string;
  startDate?: string;
  orderStatus?: string;
};
export const useGetDigitalOrdersAdmin = ({
  page = '1',
  search = '',
  sort = '',
  endDate,
  startDate = '',
  orderStatus = '',
}: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['digital-orders-admin', page, search, endDate, startDate, orderStatus],
    queryFn: async () =>
      await safeRequest({
        url: `/order/admin/product-digital?page=${page}&limit=${20}&sort=${sort}&endDate=${endDate}&startDate=${startDate}&search=${decodeURIComponent(search!)}&${orderStatus ? `orderStatus=${orderStatus}` : null}`,
      }),
  });
};
