import useGlobalStore from '../../store/global-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { safeRequest } from '@/lib/safeClient';

const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  const { verifyDelete } = useGlobalStore();

  return useMutation({
    mutationFn: async () => await safeRequest({ url: verifyDelete.url, method: 'DELETE' }),
    onSuccess: async () => {
      addToast({
        title: 'با موفقیت حذف شد',
        color: 'success',
      });
      await queryClient.invalidateQueries({ queryKey: [verifyDelete.updateCache] });
    },
    onError: async function (error) {
      addToast({
        // @ts-expect-error errror
        title: error?.response?.data.message[0],
        color: 'danger',
      });
    },
  });
};

export default useDeleteMutation;
