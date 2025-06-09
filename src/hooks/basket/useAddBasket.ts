import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useAddBasket = () => {
  const session = useSession();
  const user: any = session.data;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const dataBasket = {
        identifier: user?.finger,
        basket: [
          {
            product: id,
            count: 1,
          },
        ],
      };
      return await safeRequest({
        url: user?.Role ? '/user/basket/add-with-id' : '/user/basket/add-with-identifier',
        method: 'POST',
        data: dataBasket,
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
