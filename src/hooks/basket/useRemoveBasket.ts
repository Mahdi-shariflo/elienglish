import { useSession } from '@/lib/auth/useSession';
import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveBasket = () => {
  const user = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await safeRequest({
        url: `/user/basket/remove/${id}?${user?._id ? `userId=${user._id}` : `identifier=${user?.finger}`}`,
        method: 'DELETE',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['baskets'] });
      await queryClient.invalidateQueries({ queryKey: ['check-availability'] });
    },
    onError: (error) => {
      addToast({
        // @ts-expect-error errror
        title: error?.response?.data.errors.message,
        color: 'danger',
      });
    },
  });
};
