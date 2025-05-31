'use client';
import React, { ReactNode, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Product } from '@/types/home';

type Props = {
  title?: string;
  className?: string;
  showSwiperSlide?: boolean;
  Icon?: () => React.JSX.Element;
  slides?: Product[];
  url?: string | null;
  children?: ReactNode;
  nameSec?: string;
  classBtnArrows?: string;
};
const Slider = ({ className, showSwiperSlide, slides }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  return (
    <>
      <div className={`custom_pagination ${className}`}>
        {Number(slides?.length) >= 1 ? (
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
            className={` ${showSwiperSlide ? '' : '!block'}`}
          >
            {slides?.map((item, idx) => {
              if (item.count < 1) return null;
              return (
                <SwiperSlide
                  // !w-[148px] !min-w-[148px]
                  className="!h-[190px] !w-[148px] !min-w-[148px] lg:!h-[320px] lg:!w-[230px] lg:!min-w-[230px]"
                  key={idx}
                >
                  {/* <CardProduct product={item} /> */}
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}
      </div>
    </>
  );
};

export default Slider;
