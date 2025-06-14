import { Favorites } from '@/hooks/favorites/favorites.type';
import { safeRequest } from '@/lib/safeClient';

const url = '/user/favorite-product';

export const apiFavorite = {
  add: (favoriteProduct: string) =>
    safeRequest({
      url: `${url}/add`,
      method: 'POST',
      data: { favoriteProduct },
    }),
  edit: (productId: string, params: Favorites) =>
    safeRequest({
      url,
      method: 'PATCH',
      params: {
        productId,
        ...params,
      },
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
      url: `${url}/remove/${productId}`,
      method: 'DELETE',
      params: {
        productId,
      },
    }),
};
