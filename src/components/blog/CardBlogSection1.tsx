import React from 'react';
import Image from '../common/Image';
import Link from 'next/link';
import { Blog } from '@/types';
type Props = {
  blog: Blog;
};
const CardBlogSection1 = ({ blog }: Props) => {
  return (
    <Link href={'/blog/1'} className="group relative h-full cursor-pointer overflow-hidden">
      <Image
        className="h-full w-full transition-all duration-400 group-hover:scale-105"
        src={blog.thumbnailImage.url}
        alt=""
      />
      <div className="bg_blur_blog absolute bottom-0 z-30 flex h-[108px] w-full flex-col justify-between p-3">
        <span className="flex h-[28px] w-fit items-center justify-center rounded bg-[#EDE8FC] px-2 font-medium text-main">
          آموزش زبان انگلیسی با کتاب داستان
        </span>
        <p className="font-medium text-xl text-white">{blog.title}</p>
      </div>
    </Link>
  );
};

export default CardBlogSection1;
