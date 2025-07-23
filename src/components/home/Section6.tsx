'use client';
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CardComment from '../admin/common/CardComment';

type Props = {
  className?: string;
  section: {
    comments: {
      fullName: string;
      item: string;
      profile: string;
      comment: string;
      date: string;
    }[];
  };
};
const Section6 = ({ className, section }: Props) => {
  if (!section) return;
  const swiperRef = useRef<SwiperRef | null>(null);
  return (
    <div className="bg-[#F4F6FA] p-4 py-8">
      <div className={`container_page ${className}`}>
        <p className="text-center font-bold text-[28px] text-[#172334]">
          نظر زبان آموزان الی انگلیش
        </p>
        {Number(section?.comments?.length) >= 1 ? (
          <Swiper
            speed={1000}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
            }}
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={'auto'}
            modules={[Autoplay]}
            loop
            className={`!mt-10`}
          >
            {section?.comments?.map((item, idx) => {
              return (
                <SwiperSlide className="!w-[300px]" key={idx}>
                  <CardComment className="h-full w-full bg-white !p-8" comment={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
};

export default Section6;
