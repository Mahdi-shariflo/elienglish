import Link from 'next/link';
import React, { ReactNode } from 'react';
import Image from '../common/Image';
import { ThumbnailImage } from '@/types';
type Props = {
  path?: string;
  children?: ReactNode;
  categories: {
    title: string;
    url: string;
    thumbnailImage: ThumbnailImage;
  }[];
};
const Categories = ({ categories, children, path }: Props) => {
  return (
    <div className="container_page lg:!w-full">
      <div className="drop_shadow_faq mx-auto flex h-[78px] w-[78px] items-center justify-center rounded-full border border-gray-100">
        <svg
          width="37"
          height="37"
          viewBox="0 0 37 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_9_29356)">
            <path
              d="M13.0125 4.51562H6.55781C5.36954 4.51562 4.40625 5.47891 4.40625 6.66719V13.1219C4.40625 14.3102 5.36954 15.2734 6.55781 15.2734H13.0125C14.2008 15.2734 15.1641 14.3102 15.1641 13.1219V6.66719C15.1641 5.47891 14.2008 4.51562 13.0125 4.51562Z"
              stroke="#6E3DFF"
              stroke-width="2.79122"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M30.2234 4.51562H23.7688C22.5805 4.51562 21.6172 5.47891 21.6172 6.66719V13.1219C21.6172 14.3102 22.5805 15.2734 23.7688 15.2734H30.2234C31.4117 15.2734 32.375 14.3102 32.375 13.1219V6.66719C32.375 5.47891 31.4117 4.51562 30.2234 4.51562Z"
              stroke="#6E3DFF"
              stroke-width="2.79122"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.0125 21.7266H6.55781C5.36954 21.7266 4.40625 22.6899 4.40625 23.8781V30.3328C4.40625 31.5211 5.36954 32.4844 6.55781 32.4844H13.0125C14.2008 32.4844 15.1641 31.5211 15.1641 30.3328V23.8781C15.1641 22.6899 14.2008 21.7266 13.0125 21.7266Z"
              stroke="#6E3DFF"
              stroke-width="2.79122"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M30.2234 21.7266H23.7688C22.5805 21.7266 21.6172 22.6899 21.6172 23.8781V30.3328C21.6172 31.5211 22.5805 32.4844 23.7688 32.4844H30.2234C31.4117 32.4844 32.375 31.5211 32.375 30.3328V23.8781C32.375 22.6899 31.4117 21.7266 30.2234 21.7266Z"
              stroke="#6E3DFF"
              stroke-width="2.79122"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_9_29356">
              <rect width="37" height="37" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className="mt-5 text-center font-bold text-xl text-[#33435A] dark:text-white">
        دسته‌بندی پرسش‌ها
      </p>
      <div className="mt-[24px] grid grid-cols-3 justify-center gap-2 lg:flex lg:gap-4">
        {children}
        {categories.map((item, idx) => (
          <Link
            key={idx}
            className="flex h-[108px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-[#E5EAEF] bg-white dark:border-dark dark:!bg-[#172334] lg:h-[158px] lg:w-[183px] lg:gap-10"
            href={`${path}/${item.url}`}
          >
            <Image className="h-10 w-10" src={item?.thumbnailImage?.url} alt="" />
            <p className="text-center font-bold text-main">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
