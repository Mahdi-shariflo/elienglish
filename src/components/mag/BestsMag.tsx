'use client';
import Image from 'next/image';
import React from 'react';
// import Mag1 from "@/../public/images/mag1.jpg"
// import Mag2 from "@/../public/images/mag2.jpg"
// import Mag3 from "@/../public/images/mag3.jpg"
// import Mag4 from "@/../public/images/mag4.jpg"
// import Mag5 from "@/../public/images/mag5.jpg"
import { Calender_icon } from '../common/icon';
import { Article } from '@/types';
import { BASEURL } from '@/lib/variable';
import Link from 'next/link';
const BestsMag = ({ blogs }: { blogs: Article[] }) => {
  if (blogs?.length < 1) return null;

  // تعریف استایل‌های خاص برای برخی آیتم‌ها
  const gridPositions = [
    'col-span-2 row-span-3 lg:row-span-7', // اولین آیتم بزرگ
    'row-span-3 row-start-4 lg:row-start-1 lg:col-start-3',
    'row-span-2 lg:row-span-4 lg:col-start-3 row-start-4',
    'row-span-2 lg:row-span-4 col-start-1 lg:col-start-4 row-start-7 lg:row-start-1',
    'row-span-3 col-start-2 lg:col-start-4 row-start-6 lg:row-start-5',
  ];

  return (
    <div className="container_page grid h-[550px] grid-cols-2 grid-rows-8 gap-4 overflow-hidden lg:grid-cols-4 lg:grid-rows-7">
      {blogs.slice(0, 5).map((blog, index) => (
        <Link
          href={`/mag/${blog.url}/`}
          key={blog._id}
          className={`relative h-full w-full overflow-hidden rounded-lg ${gridPositions[index] || ''}`}
        >
          <Image
            fill
            src={`${BASEURL}/${blog.thumbnailimage?.url}`}
            className="object-fill"
            alt={blog.title}
          />
          <Card title={blog.title} />
        </Link>
      ))}
    </div>
  );
};

export default BestsMag;

// کارت داینامیک
const Card = ({ title }: { title: string }) => {
  return (
    <div className="bg_mag_card absolute bottom-0 left-0 z-50 flex h-[120px] w-full flex-col items-start justify-end px-3 pb-4 lg:h-[210px]">
      <div>
        <div className="hidden items-center gap-1 font-regular text-[12px] text-white lg:flex">
          <Calender_icon />
          <p>سه‌شنبه، ۹ بهمن ۱۴۰۳</p>
        </div>
        <h3 className="line-clamp-2 pt-3 font-regular text-[12px] text-white lg:font-bold lg:text-[14px]">
          {title}
        </h3>
      </div>
    </div>
  );
};
