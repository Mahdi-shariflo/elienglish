import { useMutation } from '@tanstack/react-query';

export function useEditFavorite() {
  const { mutate, isPending } = useMutation({
    mutationFn: (productId: string) => apis.editFavorite(productId),
  });
  return { mutate, isPending };
}

const apis: any = {};
