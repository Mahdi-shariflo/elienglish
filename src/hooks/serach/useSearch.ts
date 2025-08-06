import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; // import useDebounce

export const useSerach = (search: string) => {
  // Debounce the search input
  const [debouncedSearch] = useDebounce(search, 500); // 500ms delay

  return useQuery({
    queryKey: ['serach', debouncedSearch],
    enabled: debouncedSearch.length >= 3, // Only query when the debounced value is at least 3 characters
    queryFn: async () =>
      await safeRequest({ url: `/search/?search=${encodeURIComponent(debouncedSearch)}` }),
  });
};
