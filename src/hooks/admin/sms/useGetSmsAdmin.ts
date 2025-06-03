import { safeRequest } from '@/lib/safeClient';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type Props = {
  page?: string;
  sort?: string;
  search?: string;
};

export const useGetSmsAdmin = ({ page = '1', search = '', sort = '' }: Props) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    if (search === debouncedSearch) return; // جلوگیری از درخواست اضافه

    const handler = setTimeout(() => {
      if (search !== '') {
        setDebouncedSearch(search);
      }
    }, 1000); // 1 ثانیه تأخیر

    return () => clearTimeout(handler);
  }, [search]);

  return useQuery({
    queryKey: ['sms-admin', page, debouncedSearch, sort],
    queryFn: async () =>
      await safeRequest({
        url: `/admin/smsdelivery?page=${page}&sort=${sort}&limit=${20}&search=${decodeURIComponent(debouncedSearch)}`,
      }),
  });
};
