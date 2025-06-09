import { useAddFavorite } from './services/useAddFavorite';
import { useRemoveFavorite } from './services/useRemoveFavorite';

/**
 * Custom hook for managing favorite status of a product
 * Provides functionality to add or remove a product from favorites
 * and returns the current pending state
 *
 * @returns {Object} An object containing:
 *   - updateFavorite: Function to update favorite status
 *   - isPending: Boolean indicating if either operation is in progress
 */
export function useUpdateFavorite() {
  const { mutate: addFavorite, isPending: addPending } = useAddFavorite();
  const { mutate: removeFavorite, isPending: removePending } = useRemoveFavorite();

  /**
   * Updates the favorite status of a product
   * @param {string} productId - ID of the product to update
   * @param {boolean} isFavorite - New favorite status (true = add, false = remove)
   */
  const updateFavorite = (productId: string, isFavorite: boolean) => {
    if (isFavorite) addFavorite(productId);
    else removeFavorite(productId);
  };
  return {
    updateFavorite,
    isPending: addPending || removePending,
  };
}
