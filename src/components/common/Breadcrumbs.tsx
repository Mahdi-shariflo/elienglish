'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  page?: string;
  className?: string;
  breadcrumbs?: {
    Icon?: React.ElementType;
    title: string;
    id: string;
    url: string | null;
  }[];
};
const Breadcrumbs = ({ breadcrumbs, className, page = '/product-category' }: Props) => {
  const pathname = usePathname();
  return (
    <div className={`flex flex-wrap items-center gap-4 lg:gap-3 ${className}`}>
      <Link className="flex items-center gap-2 font-regular text-[14px] !text-[#A8AFB8]" href={'/'}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18V15"
            stroke="#A8AFB8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.07 2.81985L3.14002 8.36985C2.36002 8.98985 1.86002 10.2998 2.03002 11.2798L3.36002 19.2398C3.60002 20.6598 4.96002 21.8098 6.40002 21.8098H17.6C19.03 21.8098 20.4 20.6498 20.64 19.2398L21.97 11.2798C22.13 10.2998 21.63 8.98985 20.86 8.36985L13.93 2.82985C12.86 1.96985 11.13 1.96985 10.07 2.81985Z"
            stroke="#A8AFB8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        رز سفید
        <span className="mr-1 block h-4 w-px rotate-[30deg] bg-[#A8AFB8]"></span>
      </Link>

      {Array.isArray(breadcrumbs)
        ? breadcrumbs?.map((breadcrumb, idx) => (
            <React.Fragment key={idx}>
              <Link
                key={idx}
                className={`font-regular text-[14px] ${idx !== breadcrumbs.length - 1 ? 'text-[#A8AFB8]' : 'text-[#616A76]'}`}
                href={`${breadcrumb.url ? `${page}/${breadcrumb.url}/` : pathname}`}
              >
                <span className="flex items-center gap-1">
                  {breadcrumb?.Icon && <breadcrumb.Icon className="-mt-1 stroke-[#A8AFB8]" />}
                  <span className="pt-0"> {breadcrumb.title}</span>
                  {idx !== breadcrumbs.length - 1 && (
                    <span className="mr-1 block h-4 w-px rotate-[30deg] bg-[#A8AFB8]"></span>
                  )}
                </span>
              </Link>
            </React.Fragment>
          ))
        : null}
    </div>
  );
};

export default Breadcrumbs;
