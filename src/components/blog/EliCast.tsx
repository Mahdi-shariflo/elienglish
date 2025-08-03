'use client';
import Link from 'next/link';
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CardBlog1 from './CardBlog1';
import Button from '../common/Button';
import { Blog } from '@/store/types';
type Props = {
  delay: number;
  blogs?: Blog[];
};
const EliCast = ({ delay, blogs }: Props) => {
  if (Number(blogs?.length) < 1) return null;

  return (
    <div className="container_page rounded-lg bg-white p-3 dark:bg-[#172334] lg:w-full">
      {
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_9_24293)">
                  <path
                    d="M8 23H16"
                    stroke="#6E3DFF"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 19V23"
                    stroke="#6E3DFF"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1V1Z"
                    stroke="#6E3DFF"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10"
                    stroke="#6E3DFF"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9_24293">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="font-medium text-[18px] text-main lg:text-[24px]">الی کست</p>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <Button>
              <svg
                className="rotate-180"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 20L11 14L17 8"
                  stroke="#6E3DFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
            <Button>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 20L11 14L17 8"
                  stroke="#6E3DFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      }
      <Swiper
        speed={1000}
        autoplay={{
          delay,
          disableOnInteraction: false,
        }}
        // centeredSlides={true}
        slidesPerView={'auto'}
        spaceBetween={20}
        modules={[Autoplay]}
        loop
        className="mt-6"
      >
        {blogs?.map((item, idx) => {
          return (
            <SwiperSlide
              className={
                '!h-[350px] !w-[270px] overflow-hidden rounded-lg border border-[#E5EAEF] !bg-transparent dark:!border-none lg:!h-[320px]'
              }
              key={idx}
            >
              <CardBlog1 classImage="lg:!h-[165px]" blog={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Link
        className="mt-3 flex h-[40px] items-center justify-center gap-3 rounded-lg border px-3 dark:border-white lg:hidden"
        href={''}
      >
        <p className="whitespace-nowrap font-medium text-main">مشاهده بیشتر</p>
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0029 6.49609C12.1366 6.49612 12.2649 6.54907 12.3594 6.64355C12.4539 6.73805 12.5068 6.86637 12.5068 7C12.5068 7.10045 12.4769 7.19797 12.4219 7.28027L12.3594 7.35645L9.05957 10.6465L8.20312 11.5H17.0029C17.1355 11.5 17.2627 11.5528 17.3564 11.6465C17.4502 11.7402 17.5029 11.8675 17.5029 12C17.5029 12.1325 17.4501 12.2598 17.3564 12.3535C17.2627 12.4473 17.1355 12.5 17.0029 12.5H8.20312L9.05957 13.3545L12.3594 16.6445L12.3604 16.6455C12.4071 16.6919 12.4443 16.7468 12.4697 16.8076C12.4951 16.8685 12.5088 16.9341 12.5088 17C12.5088 17.066 12.4951 17.1315 12.4697 17.1924C12.4571 17.2228 12.4421 17.2521 12.4238 17.2793L12.3604 17.3555L12.3574 17.3584C12.311 17.4051 12.256 17.4425 12.1953 17.4678C12.1344 17.4931 12.0689 17.5058 12.0029 17.5059C11.937 17.5059 11.8714 17.4931 11.8105 17.4678C11.7801 17.4551 11.7509 17.4393 11.7236 17.4209L11.6475 17.3584L11.6465 17.3564L6.6543 12.3643C6.63158 12.3405 6.61131 12.3147 6.59375 12.2871L6.54883 12.1992L6.54492 12.1904L6.51758 12.0967C6.49881 12.0013 6.50755 11.9018 6.54492 11.8105L6.08301 11.6201L6.5459 11.8105L6.54883 11.8008C6.56078 11.77 6.57606 11.7406 6.59375 11.7129L6.6543 11.6357L11.6465 6.64355C11.7174 6.57267 11.8074 6.52518 11.9043 6.50586L12.0029 6.49609Z"
              fill="black"
              stroke="#6E3DFF"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
};

export default EliCast;
