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
      href={`/blogs/${blog.url}`}
      className="group relative block h-full w-full cursor-pointer overflow-hidden bg-white"
    >
      <Image
        classImg="!object-fill"
        className="h-full w-full bg-white transition-all duration-400 group-hover:scale-105"
        src={blog.thumbnailImage.url}
        alt=""
      />
      <div className="absolute bottom-0 z-30 flex h-[95px] w-full flex-col justify-between bg-white/30 p-3 backdrop-blur-lg lg:h-[108px]">
        <span className="flex h-[28px] w-fit items-center justify-center rounded bg-[#EDE8FC] px-2 font-medium text-[14px] text-main dark:bg-[#172334]">
          آموزش زبان انگلیسی با کتاب داستان
        </span>
        <p className="line-clamp-1 font-medium text-lg text-white lg:text-xl">{blog.title}</p>
      </div>
    </Link>
  );
};

export default CardBlogSection1;
