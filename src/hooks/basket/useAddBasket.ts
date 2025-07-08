import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useAddBasket = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, type }: { itemId: string; type: string }) => {
      // const dataBasket = {
      //   identifier: user?.finger,
      //   basket: [
      //     {
      //       product: id,
      //       count: 1,
      //     },
      //   ],
      // };
      return await safeRequest({
        url: '/basket',
        method: 'POST',
        data: { itemId, type },
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
