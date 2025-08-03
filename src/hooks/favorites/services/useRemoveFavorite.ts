import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { apiFavorite } from '@/app/actions/apis/favorites';

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: apiFavorite.remove,
    onSuccess: async ({ data }) => {
      const { message } = data?.data || {};
      addToast({
        title: 'با موفقیت حذف شد',
        color: 'success',
      });
      await queryClient.invalidateQueries({ queryKey: ['favs'] });
    },
    onError: (error: any) => {
      addToast({
        title: 'پیدا نشد',
        color: 'danger',
      });
    },
  });
  return { mutate, isPending };
}
