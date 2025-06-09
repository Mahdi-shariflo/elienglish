import { useQuery } from '@tanstack/react-query';
import { Favorites } from '../favorites.type';

export function useGetFavorites() {
  const queryKeys = ['GET_FAVORITES'];

  const { data, isPending } = useQuery<Favorites>({
    queryKey: [...queryKeys],
    queryFn: apis.fetchUserMe,
  });

  return { data, isPending };
}

const apis: any = {};
