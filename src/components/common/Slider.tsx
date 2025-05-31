'use client';
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image, { StaticImageData } from 'next/image';

type Props = {
  sliders: { image: StaticImageData; title: string; description: string }[];
  className?: string;
};

export default function Slider({ sliders, className }: Props) {
  return (
    <div
      className={`custom_pagination flex h-full w-[90%] items-center justify-center ${className}`}
    >
      <Swiper
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // centeredSlides={true}
        // slidesPerView={1.2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        loop
        slidesPerView={1}
        className="!pb-16"
      >
        {sliders.map((item, idx) => {
          return (
            <SwiperSlide className="!h-fit w-full" key={idx}>
              <span className="block !h-[512px]">
                <Image
                  src={`${item.image.src}`}
                  alt={item.title}
                  layout="fill"
                  priority={idx === 0}
                  className="!h-[512px] rounded-lg object-contain"
                />
              </span>
              <p className="text-center font-extrabold text-lg text-primary">{item.title}</p>
              <p className="pt-3 text-center font-light text-[#8E98A8]">{item.description}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
