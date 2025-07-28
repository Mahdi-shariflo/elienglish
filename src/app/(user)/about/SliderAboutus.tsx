'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import About1 from '@/../public/images/about1.jpg';
import About2 from '@/../public/images/about2.jpg';
import About3 from '@/../public/images/about3.jpg';
import About4 from '@/../public/images/about4.jpg';
import Button from '@/components/common/Button';
const images = [About1, About2, About3, About4];
const SliderAboutus = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  return (
    <div className="relative w-full !rounded-lg lg:overflow-hidden">
      <Swiper
        loop
        speed={1000}
        autoplay={{
          delay: 3000,
        }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="!w-full !rounded-lg"
        wrapperClass="!rounded-lg"
        ref={swiperRef}
      >
        {images.map((src, index) => (
          <SwiperSlide className="h-[444px] overflow-hidden !rounded-lg lg:!w-[445px]" key={index}>
            <img src={src.src} alt={`nature-${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        onClick={async () => swiperRef.current?.swiper.slidePrev()}
        className="absolute -right-2 top-1/2 z-40 !h-[32px] !w-[32px] -translate-y-1/2 bg-main lg:right-[20px] lg:!h-[48px] lg:!w-[48px] lg:-translate-x-1/2"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
            stroke="white"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Button
        onClick={async () => swiperRef.current?.swiper.slideNext()}
        className="absolute -left-2 top-1/2 z-40 !h-[32px] !w-[32px] -translate-y-1/2 bg-main lg:left-[70px] lg:!h-[48px] lg:!w-[48px] lg:-translate-x-1/2"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
            stroke="white"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};

export default SliderAboutus;
