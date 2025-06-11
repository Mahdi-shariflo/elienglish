'use client';
import useGlobalStore from '@/store/global-store';
import { Pagination as ReactPagination } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';
type Props = {
  className?: string;
  total?: number;
  top?: number;
};
export default function Pagination({ className, total = 10, top = 220 }: Props) {
  const { setIsPendingCategory } = useGlobalStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onPage = (page: number) => {
    startTransition(() => {
      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);
      searchParams.set('page', page.toString());
      const newQueryString = searchParams.toString();
      router.push(`${pathname}/?${newQueryString}`, { scroll: false });
    });

    window.scrollTo({
      top: top,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setIsPendingCategory(isPending);
  }, [isPending]);
  return (
    <ReactPagination
      onChange={onPage}
      dir="rtl"
      showControls
      classNames={{
        item: 'active:bg-main !w-[40px] dark:bg-transparent  !h-[40px] !mx-1 border border-transparent !rounded-lg',
        cursor: 'bg-main !w-[40px] dark:shadow-showPagination dark:!border-transparent !h-[40px]',
        next: '!w-[40px] !h-[40px] dark:bg-transparent rotate-180',
        prev: '!w-[40px] !h-[40px] dark:bg-transparent rotate-180',
        // chevronNext: 'rotate-180',
      }}
      className={`m-auto flex !w-fit items-center justify-center overflow-hidden font-regular ${className}`}
      initialPage={Number(searchParams.get('page')) || 1}
      total={total}
    />
  );
}
