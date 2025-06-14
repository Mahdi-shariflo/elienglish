import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { apiFavorite } from '@/app/actions/apis/favorites';

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: apiFavorite.remove,
    onSuccess: ({ data }) => {
      const { message } = data?.data || {};
      addToast({
        title: message,
        color: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['favs'] });
    },
    onError: (error: any) => {
      addToast({
        title: error?.response?.data.message[0],
        color: 'danger',
      });
    },
  });
  return { mutate, isPending };
}
