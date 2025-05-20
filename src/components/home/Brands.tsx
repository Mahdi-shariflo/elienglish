'use client';
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperRef } from 'swiper/react';
import Button from '../common/Button';
import Brand1 from '@/../public/images/brand1.png';
import Brand2 from '@/../public/images/brand2.png';
import Brand3 from '@/../public/images/brand3.png';
import Brand4 from '@/../public/images/brand4.png';
import Brand5 from '@/../public/images/brand5.png';
import Brand6 from '@/../public/images/brand9.png';
import Brand7 from '@/../public/images/brand7.png';
import Image from 'next/image';
type Props = {
  title?: string;
  Icon?: () => React.JSX.Element;
};
const brands = [
  {
    name: 'کامان',
    src: Brand1,
  },
  {
    name: 'دیپ سنس',
    src: Brand2,
  },
  {
    name: 'سینره',
    src: Brand3,
  },
  {
    name: 'لافارر',
    src: Brand4,
  },
  {
    name: 'مای لیدی',
    src: Brand5,
  },
  {
    name: 'کالیستا',
    src: Brand6,
  },
  {
    name: 'آمبرلا',
    src: Brand7,
  },
  {
    name: 'کامان',
    src: Brand1,
  },
  {
    name: 'دیپ سنس',
    src: Brand2,
  },
  {
    name: 'سینره',
    src: Brand3,
  },
  {
    name: 'لافارر',
    src: Brand4,
  },
  {
    name: 'مای لیدی',
    src: Brand5,
  },
  {
    name: 'کالیستا',
    src: Brand6,
  },
  {
    name: 'آمبرلا',
    src: Brand7,
  },
];
const Brands = ({ Icon, title }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  return (
    <div className="lg:container_page">
      <div className="container_page mb-5 flex items-center justify-between lg:!w-full">
        <div className="flex items-center gap-2">
          {Icon && <Icon />}
          {/* <Image width={32} height={32} alt='' src={icon} /> */}
          <span className="font-bold text-[14px] lg:text-[24px]">{title}</span>
        </div>
        <Button className="!w-fit bg-transparent font-regular text-main lg:hidden">
          <span>مشاهده</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99998 13.28L5.65331 8.9333C5.13998 8.41997 5.13998 7.57997 5.65331 7.06664L9.99998 2.71997"
              stroke="#DD338B"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            onClick={async () => swiperRef?.current?.swiper.slidePrev()}
            className="h-[40px] !w-[40px] !min-w-[40px] bg-main"
          >
            <span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.91016 20.7723L15.4302 14.2523C16.2002 13.4823 16.2002 12.2223 15.4302 11.4523L8.91016 4.93231"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Button>
          <Button
            onClick={async () => swiperRef?.current?.swiper.slideNext()}
            className="h-[40px] !w-[40px] !min-w-[40px] bg-main"
          >
            <span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.9998 20.7723L8.47984 14.2523C7.70984 13.4823 7.70984 12.2223 8.47984 11.4523L14.9998 4.93231"
                  stroke="#FDF2F9"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Button>
        </div>
      </div>
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        ref={swiperRef}
        spaceBetween={10}
        slidesPerView={'auto'}
        modules={[Autoplay]}
        loop
        dir="rtl"
        className="!mr-[24px] !py-3 lg:!mr-0"
      >
        {brands.map((item, idx) => (
          <SwiperSlide
            className="flex !w-[133px] !min-w-[133px] items-center justify-center rounded-xl border border-gray-100 shadow-blog"
            key={idx}
          >
            <div className="relative mx-auto h-[78px] w-[78px] lg:h-[106px] lg:w-[117px]">
              <Image alt="" fill src={item.src} />
            </div>
            <div className="bg_brand h-px w-full"></div>
            <p className="py-2 text-center font-medium text-[14px] text-[#7D8793]">{item.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
