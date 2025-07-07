import Link from 'next/link';
import React, { ReactNode } from 'react';
import Image from '../common/Image';
import { ThumbnailImage } from '@/types';
type Props = {
  children?: ReactNode;
  categories: {
    title: string;
    url: string;
    thumbnailImage: ThumbnailImage;
  }[];
};
const Categories = ({ categories, children }: Props) => {
  return (
    <div className="container_page lg:!w-full">
      <p className="text-center font-bold text-xl text-[#33435A] dark:text-white">
        دسته‌های پر مخاطب
      </p>
      <div className="mt-[24px] grid grid-cols-3 justify-center gap-2 lg:flex lg:gap-4">
        {children}
        {categories.map((item, idx) => (
          <Link
            key={idx}
            className="flex h-[108px] flex-col items-center justify-center gap-10 rounded-xl border-2 border-[#E5EAEF] bg-white dark:border-dark dark:!bg-[#172334] lg:h-[158px] lg:w-[183px]"
            href={`/blogs/category/${item.url}`}
          >
            <Image className="h-10 w-10" src={item?.thumbnailImage?.url} alt="" />
            <p className="font-bold text-main">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
