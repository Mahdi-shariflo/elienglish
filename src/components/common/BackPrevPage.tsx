'use client';
import React from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
type Props = {
  title?: string;
  url?: string;
  className?: string;
  isLogo?: boolean;
};
const BackPrevPage = ({ title, url, className, isLogo }: Props) => {
  const router = useRouter();
  return (
    <div
      className={`sticky top-0 z-50 border-b bg-white dark:border-[#263248] dark:bg-[#172334] lg:hidden ${className}`}
    >
      <div className="container_page flex h-[56px] items-center">
        <Button
          className="w-fit min-w-fit"
          onClick={url ? () => router.push(`${url}`) : () => router.back()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-[#545A66] dark:stroke-white"
          >
            <path
              d="M8.91 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91 4.08008"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        {isLogo ? (
          <Logo className="mx-auto mt-2 w-20" />
        ) : (
          <p className="line-clamp-1 flex-1 text-center font-medium text-[14px] text-[#0C0C0C] dark:text-white">
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default BackPrevPage;
