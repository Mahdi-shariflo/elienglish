import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetDownloadFile = ({ src }: { src?: string }) => {
  const cleanedSrc =
    typeof src === 'string' && src.startsWith('/download/') ? src.replace('/download/', '') : src;

  console.log(src);
  return useQuery({
    queryKey: ['download-file', cleanedSrc],
    gcTime: 0,
    staleTime: 0,
    enabled: false,
    queryFn: async () =>
      await safeRequest({
        url: `/order/product-digital/${cleanedSrc}`,
      }),
  });
};
