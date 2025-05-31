import { useSession } from '@/lib/auth/useSession';
import { safeRequest } from '@/lib/safeClient';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddBasket = () => {
  const user = useSession();
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
        title: error?.response?.data.errors.message,
        color: 'danger',
      });
    },
  });
};
