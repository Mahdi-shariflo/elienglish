import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useRemoveBasket = () => {
  const session = useSession();
  const user: any = session.data;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await safeRequest({
        url: `/basket/${id}?${user?._id ? `userId=${user._id}` : `identifier=${user?.finger}`}`,
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
        title: error?.response?.data.message[0],
        color: 'danger',
      });
    },
  });
};
