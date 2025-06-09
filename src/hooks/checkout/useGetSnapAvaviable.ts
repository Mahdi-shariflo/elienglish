import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import useBasket from '../basket/useBasket';
import { useGetPayment } from './useGetPayment';
import { Payment } from '@/types';

export const useGetSnapAvaviable = () => {
  const { total } = useBasket();
  const { data } = useGetPayment();
  const paymenyList: Payment[] = data?.data?.data?.paymentList;
  const findSnap = paymenyList?.find((pay) => pay.entitle === 'Snapppay');
  return useQuery({
    queryKey: ['check-snap'],
    enabled: findSnap && Number(total) ? true : false,
    queryFn: async () =>
      await safeRequest({
        url: `/snapppayment/checkeligible?totalamount=${Number(total) * 10}`,
      }),
    gcTime: 0,
    staleTime: 0,
  });
};
