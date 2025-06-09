import { apiFavorite } from '@/actions/apis/favorites';
import { useQuery } from '@tanstack/react-query';

export const useGetFavProduct = () => {
  const { data, isPending } = useQuery({
    queryKey: ['favs'],
    // queryFn: async () => await safeRequest({ url: '/user/like-product' }),
    queryFn: apiFavorite.getAll,
  });

  return { data, isPending };
};
