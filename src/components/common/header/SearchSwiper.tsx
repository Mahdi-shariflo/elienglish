'use client';
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from '../Image';
import { ThumbnailImage } from '@/store/types';
import Title from '../Title';
import Button from '../Button';

type Props = {
  sliders: {
    thumbnailImage: ThumbnailImage;
    title: string;
  }[];
  className?: string;
  title?: string;
  type: 'blog' | 'course' | 'product';
};

export default function SearchSwiper({ sliders, className, title, type }: Props) {
  if (sliders?.length < 1) return null;
  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <div className={`relative !w-full ${className}`}>
      <div className="flex items-center justify-between">
        <Title title={title as string} />
        <div className="flex items-center gap-4">
          <Button
            // @ts-expect-error error
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="h-7 w-7 min-w-7 rounded-full bg-[#7d87932a]"
          >
            <svg
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.03906 17.0039L12.5509 12.0645C13.2018 11.4812 13.2018 10.5266 12.5509 9.9433L7.03906 5.00391"
                stroke="#7D8793"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>

          <Button
            // @ts-expect-error error
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="h-7 w-7 min-w-7 rounded-full bg-[#7d87932a]"
          >
            <svg
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.998 17L7.48625 12.0606C6.83531 11.4773 6.83531 10.5227 7.48625 9.93939L12.998 5"
                stroke="#7D8793"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
      <Swiper
        speed={1000}
        // centeredSlides={true}
        // slidesPerView={1.2}
        spaceBetween={20}
        loop
        slidesPerView={'auto'}
        className="!mt-8 w-full"
        dir="rtl"
      >
        {sliders?.map((item, idx) => {
          return (
            <SwiperSlide
              className="!flex !h-[83px] !w-[280px] gap-1 overflow-hidden rounded-lg border border-[#9fa8b14d] !p-1 dark:bg-[#172334]"
              key={idx}
            >
              <div>
                <Image
                  className={`${type === 'blog' ? '!h-full !min-w-[130px] overflow-hidden !rounded-lg' : type === 'course' ? 'h-full w-[73px] min-w-[73px]' : 'h-full w-[7۲px] min-w-[7۲px]'}`}
                  classImg={`${type === 'blog' ? '!object-contain overflow-hidden !rounded-lg' : type === 'course' ? 'overflow-hidden !rounded-lg' : 'overflow-hidden !rounded-lg'}`}
                  alt=""
                  src={item?.thumbnailImage?.url}
                />
              </div>
              <p className="line-clamp-2 p-1 font-medium text-[13px] text-[#505B74]">
                {item.title}
              </p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
