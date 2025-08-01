import { useMutation } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { apiFavorite } from '@/app/actions/apis/favorites';

export function useAddFavorite() {
  const { mutate, isPending } = useMutation({
    mutationFn: apiFavorite.add,
    onSuccess: ({ data }) => {
      const { message } = data?.data || {};
      addToast({
        title: message,

        color: 'success',
      });
    },
  });
  return { mutate, isPending };
}
