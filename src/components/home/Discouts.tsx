'use client';
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CountdownDiscounts from './CountdownDiscounts';
import CardProductDiscount from '../common/CardProductDiscount';
import { Product } from '@/types/home';
import Link from 'next/link';
import Button from '../common/Button';
import IsClient from '../common/IsClient';

type Props = {
  title: string;
  url: string | null;
  timer: string;
  products: Product[];
  className?: string;
  children?: React.ReactNode;
  nameSec?: string;
};
const Discouts = ({ timer, title, products, url, className, children }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  return (
    <>
      <div
        className={`lg:container_page relative bg-main pb-4 pt-2 lg:h-[400px] lg:rounded-br-lg lg:rounded-tr-lg lg:bg-transparent lg:py-0 ${className}`}
      >
        <svg
          width="100%"
          id="svg"
          viewBox="0 0 1440 690"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden rounded-xl lg:block"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stopColor="#DD338B"></stop>
              <stop offset="95%" stopColor="#DD338B"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,700 L 0,262 C 235.5,218 471,174 711,174 C 951,174 1195.5,218 1440,262 L 1440,700 L 0,700 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient)"
            fillOpacity="1"
            className="path-0 transition-all delay-150 duration-300 ease-in-out"
            transform="rotate(-180 720 280)"
          ></path>
        </svg>
        <div className="top-[0px] block w-full pr-2 lg:absolute lg:px-[33px]">
          <div className="flex w-full flex-row items-center justify-between gap-5 px-3 lg:gap-0">
            {/* title */}
            <div className="flex flex-row">
              <span className="flex items-center gap-1">
                <svg
                  className="hidden lg:block"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.0001 29.3334C23.3639 29.3334 29.3334 23.3638 29.3334 16C29.3334 8.63622 23.3639 2.66669 16.0001 2.66669C8.63628 2.66669 2.66675 8.63622 2.66675 16C2.66675 23.3638 8.63628 29.3334 16.0001 29.3334Z"
                    fill="white"
                  />
                  <path
                    d="M20 21.3334C19.2533 21.3334 18.6533 20.7334 18.6533 20C18.6533 19.2667 19.2533 18.6667 19.9867 18.6667C20.72 18.6667 21.32 19.2667 21.32 20C21.32 20.7334 20.7333 21.3334 20 21.3334Z"
                    fill="white"
                  />
                  <path
                    d="M12.0134 13.3334C11.2668 13.3334 10.6667 12.7334 10.6667 12C10.6667 11.2667 11.2667 10.6667 12.0001 10.6667C12.7334 10.6667 13.3334 11.2667 13.3334 12C13.3334 12.7334 12.7468 13.3334 12.0134 13.3334Z"
                    fill="white"
                  />
                  <path
                    d="M11.9999 20.9999C11.7465 20.9999 11.4932 20.9066 11.2932 20.7066C10.9065 20.32 10.9065 19.6799 11.2932 19.2932L19.2932 11.2932C19.6798 10.9066 20.3199 10.9066 20.7066 11.2932C21.0933 11.6799 21.0933 12.32 20.7066 12.7066L12.7066 20.7066C12.5066 20.9066 12.2532 20.9999 11.9999 20.9999Z"
                    fill="white"
                  />
                </svg>
                <p className="flex gap-1 font-bold text-[14px] text-white lg:text-[18px]">
                  {title}
                </p>
              </span>
            </div>
            {/* timer */}
            <CountdownDiscounts timer={timer} />
            {/* btn-next-prev */}
            <div className="gl:gap-2 flex flex-row-reverse items-center gap-1">
              {url ? (
                <Link
                  href={`${url}/`}
                  className="flex !w-fit items-center gap-1 bg-transparent font-regular text-[12px] text-white lg:text-[14px]"
                >
                  <span>مشاهده همه</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99998 13.28L5.65331 8.9333C5.13998 8.41997 5.13998 7.57997 5.65331 7.06664L9.99998 2.71997"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : null}
              <div className="flex items-center gap-3">
                <Button
                  onClick={async () => swiperRef.current?.swiper.slidePrev()}
                  className="h-8 w-8 !min-w-fit bg-white px-0 lg:!h-[40px] lg:!w-[40px]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.93994 13.28L10.2866 8.9333C10.7999 8.41997 10.7999 7.57997 10.2866 7.06664L5.93994 2.71997"
                      stroke="#DD338B"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
                <Button
                  onClick={async () => swiperRef.current?.swiper.slideNext()}
                  className="h-8 w-8 !min-w-fit bg-white px-0 lg:!h-[40px] lg:!w-[40px]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0002 13.28L5.65355 8.9333C5.14022 8.41997 5.14022 7.57997 5.65355 7.06664L10.0002 2.71997"
                      stroke="#DD338B"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
                {children}
              </div>
            </div>
          </div>
          <Swiper
            speed={1000}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            ref={swiperRef}
            spaceBetween={7}
            slidesPerView={'auto'}
            modules={[Autoplay]}
            loop
            dir="rtl"
            className="lg:!mt-4 lg:!py-4"
          >
            {products?.map((item, idx) => {
              if (item.count === 0) return null;
              return (
                <SwiperSlide
                  className="!w-[140px] !min-w-[140px] lg:!w-[184px] lg:!min-w-[184px]"
                  key={idx}
                >
                  <CardProductDiscount product={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Discouts;
