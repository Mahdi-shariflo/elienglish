import React from 'react';
import Image from '../common/Image';
import Link from 'next/link';
import { Blog } from '@/types';
type Props = {
  blog: Blog;
};
const CardBlogSection1 = ({ blog }: Props) => {
  return (
    <Link
      href={`/${blog.url}`}
      className="group relative block h-full w-full cursor-pointer overflow-hidden bg-white"
    >
      <Image
        classImg="!object-cover mix-blend-multiply"
        className="h-full w-full mix-blend-multiply transition-all duration-400 group-hover:scale-105"
        src={blog?.thumbnailImage?.url}
        alt=""
      />
      <div className="absolute bottom-0 z-30 flex h-[95px] w-full flex-col justify-between bg-white/30 p-3 backdrop-blur-lg lg:h-[108px]">
        <span className="flex h-[28px] w-fit items-center justify-center rounded bg-[#EDE8FC] px-2 font-medium text-[14px] text-main dark:bg-[#172334]">
          {blog?.category?.title}
        </span>
        <p className="line-clamp-2 font-medium text-lg text-white lg:text-xl">{blog.title}</p>
      </div>
    </Link>
  );
};

export default CardBlogSection1;
