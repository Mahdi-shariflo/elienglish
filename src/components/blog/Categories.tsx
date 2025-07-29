import Link from 'next/link';
import React, { ReactNode } from 'react';
import Image from '../common/Image';
import { ThumbnailImage } from '@/store/types';
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
      <p className="text-center font-demibold text-[18px] text-[#33435A] dark:text-white lg:text-[24px]">
        دسته‌های پر مخاطب
      </p>
      <div className="mt-[24px] grid grid-cols-3 justify-center gap-2 lg:flex lg:gap-4">
        {children}
        {categories.map((item, idx) => (
          <Link
            key={idx}
            className="flex h-[108px] flex-col items-center justify-center gap-6 rounded-xl border-2 border-[#E5EAEF] bg-white dark:border-dark dark:!bg-[#172334] lg:h-[158px] lg:w-[183px]"
            href={`/category/${item.url}`}
          >
            <Image
              classImg="mix-blend-multiply"
              className="h-[56px] w-[56px] mix-blend-multiply"
              src={item?.thumbnailImage?.url}
              alt=""
            />
            <p className="font-demibold text-[14px] text-main">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
