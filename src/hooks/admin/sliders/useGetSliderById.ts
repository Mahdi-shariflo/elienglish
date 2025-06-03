import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useGetSliderById = () => {
  const { id } = useParams();
  // Debounce the search input
  return useQuery({
    queryKey: ['single-slider-admin', id],
    enabled: id === 'add' ? false : true,
    queryFn: async () => await safeRequest({ url: `/admin/pic-slider/${id}` }),
  });
};
