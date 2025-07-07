'use client';
import useGlobalStore from '@/store/global-store';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useTransition } from 'react';

const Sort = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsPendingCategory } = useGlobalStore();

  const onSort = (sort: string) => {
    startTransition(() => {
      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);
      searchParams.set('sort', sort.toString());
      searchParams.set('page', '1');
      const newQueryString = searchParams.toString();
      router.push(`${pathname}/?${newQueryString}`, { scroll: false });
    });
  };
  useEffect(() => {
    setIsPendingCategory(isPending);
  }, [isPending]);
  return (
    <div className="mb-3 hidden justify-end lg:flex">
      <Dropdown
        placement="bottom-start"
        classNames={{
          trigger: '!h-[40px] rounded-lg dark:bg-[#172334] font-medium text-[16px] shadow',
        }}
      >
        <DropdownTrigger>
          <Button className="bg-transparent">
            <span className="text-[#0B1524] dark:text-white">مرتب‌ سازی:</span>
            <div className="flex items-center gap-2">
              <span className="font-regular text-[#505B74]">
                {sort ? (sort === 'createdAt_desc' ? 'جدیدترین' : 'قدیمی‌ترین') : 'جدیدترین'}
              </span>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#505B74"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={(value) => onSort(value as string)} aria-label="Static Actions">
          <DropdownItem className="font-medium dark:text-white" key="createdAt_desc">
            جدید‌ترین
          </DropdownItem>
          <DropdownItem className="font-medium dark:text-white" key="createdAt_asc">
            قدیمی ترین
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sort;
