'use client';
import React from 'react';
import CardBlogSection1 from './CardBlogSection1';
import { Blog } from '@/types';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
type Props = {
  blogs: Blog[];
};
const positions = [
  'col-span-4 row-span-4', // برای بلاگ 0
  'col-span-2 col-start-5 row-span-2 row-start-1', // برای بلاگ 1
  'col-span-2 col-start-5 row-span-2 row-start-3', // برای بلاگ 2
  'col-span-2 col-start-5 row-span-2 row-start-5', // برای بلاگ 3
  'col-span-2 col-start-3 row-span-2 row-start-5', // برای بلاگ 4
  'col-span-2 col-start-1 row-span-2 row-start-5', // برای بلاگ 5
];

const BlogSection1 = ({ blogs }: Props) => {
  return (
    <>
      <div className="hidden !h-[700px] grid-cols-6 grid-rows-6 gap-4 lg:grid 4xl:!h-[850px] 5xl:!h-[900px] 6xl:!h-[1000px]">
        {blogs.slice(0, positions.length).map((item, idx) => (
          <div key={item._id || idx} className={`${positions[idx]} overflow-hidden rounded-lg`}>
            <CardBlogSection1 blog={item} />
          </div>
        ))}
      </div>
      <div className="custom_pagination_blog w-full overflow-hidden lg:hidden">
        <Swiper
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={true}
          slidesPerView={'auto'}
          spaceBetween={20}
          modules={[Autoplay, Pagination]}
          loop
          className="mt-10"
        >
          {blogs?.map((item, idx) => {
            return (
              <SwiperSlide className={`!h-[210px] !w-full`} key={idx}>
                <CardBlogSection1 blog={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default BlogSection1;
