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
      className="group relative h-full cursor-pointer overflow-hidden bg-white"
    >
      <Image
        classImg="!object-fill"
        className="h-full w-full bg-white transition-all duration-400 group-hover:scale-105"
        src={blog.thumbnailImage.url}
        alt=""
      />
      <div className="absolute bottom-0 z-30 flex h-[108px] w-full flex-col justify-between bg-white/30 p-3 backdrop-blur-lg">
        <span className="flex h-[28px] w-fit items-center justify-center rounded bg-[#EDE8FC] px-2 font-medium text-main">
          آموزش زبان انگلیسی با کتاب داستان
        </span>
        <p className="font-medium text-xl text-white">{blog.title}</p>
      </div>
    </Link>
  );
};

export default CardBlogSection1;
