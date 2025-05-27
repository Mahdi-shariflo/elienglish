import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';

export const useGetIsIpIrann = () => {
  return useQuery({
    queryKey: ['ip'],
    queryFn: async () =>
      await safeRequest({
        url: `https://api.ipgeolocation.io/ipgeo?apiKey=5fb52b7fda22466cb99bfcb4f19de699`,
      }),
  });
};
