import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
type Props = {
  id?: string;
};
export const useGetAttributesByGroupPropertiesId = ({ id = '' }: Props) => {
  // Debounce the search input
  return useQuery({
    queryKey: ['attributesByGroupPropertiesId', id],
    enabled: false,
    queryFn: async () => await safeRequest({ url: `/admin/properties-groupe/${id}` }),
  });
};
