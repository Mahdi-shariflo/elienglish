'use client';
import React, { useEffect, useState, useTransition } from 'react';
import Button from '../Button';
import { usePathname, useRouter } from 'next/navigation';
import useGlobalStore from '@/store/global-store';
export const sorts = [
  {
    name: 'بیشترین تخفیف',
    sort: 'discount_desc',
  },
  {
    name: 'جدیدترین',
    sort: 'createdAt_desc',
  },

  {
    name: 'قدیمی‌ترین',
    sort: 'createdAt_asc',
  },
  {
    name: 'گران‌ترین',
    sort: 'price_desc',
  },
  {
    name: 'ارزان‌ترین',
    sort: 'price_asc',
  },
];
type Props = {
  searchParams: {
    attribiutes?: string;
    available?: string;
    discounted?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  };
};
const Sort = ({ searchParams }: Props) => {
  const { setIsPendingCategory } = useGlobalStore();
  const [isPending, startTransition] = useTransition();

  const [selected, setSelected] = useState(
    searchParams.sort ? searchParams?.sort : 'discount_desc'
  );
  const pathname = usePathname();
  const router = useRouter();
  const onClick = (sort: string) => {
    setSelected(sort);
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
    <>
      <div className="hidden items-center gap-6 border-b border-[#E4E7E9] pb-2 lg:flex">
        <p className="hidden items-center gap-1 lg:flex">
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 16L13 16" stroke="#616A76" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 11H13" stroke="#616A76" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 6L13 6" stroke="#616A76" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M17 4L17 20L20 16"
                stroke="#616A76"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="whitespace-nowrap font-regular text-[18px] text-[#545A66]">
            مرتب سازی بر اساس
          </span>
        </p>

        <div className="flex items-center gap-6">
          {sorts.map((sort, idx) => (
            <Button
              onClick={() => onClick(sort.sort)}
              className={`w-fit font-regular text-[18px] ${sort.sort === selected ? 'text-main' : 'text-[#545A66]'}`}
              key={idx}
            >
              {sort.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sort;
