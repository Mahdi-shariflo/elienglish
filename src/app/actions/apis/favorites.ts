import { Favorites } from '@/hooks/favorites/favorites.type';
import { safeRequest } from '@/lib/safeClient';

const url = '/user/favorite-product';

export const apiFavorite = {
  add: (data: unknown) =>
    safeRequest({
      url: `/favoriteitem`,
      method: 'POST',
      data,
    }),
  edit: (productId: string, params: Favorites) =>
    safeRequest({
      url,
      method: 'PATCH',
    }),
  get: (productId: string) =>
    safeRequest({
      url,
      method: 'GET',
      params: {
        productId,
      },
    }),
  getAll: () =>
    safeRequest({
      url,
      method: 'GET',
    }),
  remove: (productId: string) =>
    safeRequest({
      url: `/favoriteitem/${productId}`,
      method: 'DELETE',
    }),
};
