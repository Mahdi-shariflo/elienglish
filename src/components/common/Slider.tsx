'use client';
import React, { ReactNode } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Slider as SliderType } from '@/store/types/home';
import Link from 'next/link';
import { BASEURL } from '@/lib/variable';
import Image from 'next/image';
import { Delete_icon } from './icon';

type Props = {
  sliders: SliderType[];
  className?: string;
  onDelete?: (item: number) => void;
};

export default function Slider({ sliders, className, onDelete }: Props) {
  if (!Array.isArray(sliders)) return null;
  return (
    <div className={`container_page custom_pagination w-full ${className}`}>
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
      >
        {sliders?.map((item, idx) => {
          return (
            <SwiperSlide className="!h-[206px] lg:!h-[365px]" key={idx}>
              <Link href={`${item.href}/`} className="relative block h-full w-full">
                <picture className="h-full w-full overflow-hidden rounded-lg">
                  {/* تصویر موبایل با وضوح مختلف */}
                  <source
                    media="(max-width: 768px)"
                    srcSet={`${BASEURL}/${item.url} 1x, 
               ${BASEURL}/${item.url} 2x`}
                  />
                  {/* تصویر دسکتاپ با وضوح مختلف */}
                  <source
                    media="(min-width: 769px)"
                    srcSet={`${BASEURL}/${item.url} 1x, 
               ${BASEURL}/${item.url} 2x, 
               ${BASEURL}/${item.url} 3x`}
                  />
                  <Image
                    src={`${BASEURL}/${item.url}`}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                    className="rounded-lg object-cover"
                  />
                </picture>
                {onDelete && (
                  <button
                    className="absolute left-6 top-3 flex !h-[40px] !w-[40px] !min-w-[40px] items-center justify-center rounded-full bg-white p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onDelete(idx);
                    }}
                  >
                    <Delete_icon />
                  </button>
                )}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
