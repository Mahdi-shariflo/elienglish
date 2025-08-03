import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { apiFavorite } from '@/app/actions/apis/favorites';

export function useAddFavorite() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: apiFavorite.add,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({ queryKey: ['favs'] });

      const { message } = data?.data || {};
      addToast({
        title: 'با موفقیت انجام شد',

        color: 'success',
      });
    },
  });
  return { mutate, isPending };
}
