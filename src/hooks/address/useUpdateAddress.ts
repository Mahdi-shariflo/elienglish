import { safeRequest } from '@/lib/safeClient';
import { useCheckoutStore } from '@/store/checkout-store';
import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAddress = () => {
  const { checkout, setCheckout } = useCheckoutStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: unknown; id?: string }) => {
      return await safeRequest({ url: `/address/${id}`, method: 'PATCH', data });
    },
    onSuccess: async (_, variables) => {
      if (checkout.address?._id === variables.id) {
        setCheckout({ ...checkout, address: { ...variables.data!, _id: variables.id } });
      }
      addToast({
        title: 'آدرس با موفقیت ویرایش شد',
        color: 'success',
      });
      await queryClient.invalidateQueries({ queryKey: ['address'] });
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
