'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
type Props = {
  title: string;
  Icon: () => React.JSX.Element;
  url?: string | null;
};
const TitleSection = ({ title, Icon, url }: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon />
        {/* <Image width={32} height={32} alt='' src={icon} /> */}
        <span className="font-bold text-[14px] lg:text-[24px]">{title}</span>
      </div>
      {url ? (
        <Link
          href={url}
          className="relative z-20 flex w-fit !min-w-fit items-center font-medium text-[12px] text-main lg:text-[14px]"
        >
          مشاهده همه
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.08"
              stroke="#DD338B"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : null}
    </div>
  );
};

export default TitleSection;
