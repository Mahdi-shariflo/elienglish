import React from 'react';
import BlogIMage from '@/../public/images/adel.png';
import Image from '../common/Image';
import Link from 'next/link';
const CardBlogSection1 = () => {
  return (
    <Link href={'/blog/1'} className="group relative h-full cursor-pointer overflow-hidden">
      <Image
        className="h-full w-full transition-all duration-400 group-hover:scale-105"
        src={BlogIMage.src}
        alt=""
      />
      <div className="bg_blur_blog absolute bottom-0 z-30 flex h-[108px] w-full flex-col justify-between p-3">
        <span className="flex h-[28px] w-fit items-center justify-center rounded bg-[#EDE8FC] px-2 font-medium text-main">
          آموزش زبان انگلیسی با کتاب داستان
        </span>
        <p className="font-medium text-white">
          آموزش انگلیسی با کتاب داستان Oxford Bookworms: تحلیل کتاب Drive into Danger فصل دوم
        </p>
      </div>
    </Link>
  );
};

export default CardBlogSection1;
