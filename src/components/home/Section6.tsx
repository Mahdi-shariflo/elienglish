'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CardComment from '../admin/common/CardComment';
import Button from '../common/Button';

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
  if (!section) return null;

  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <div className="bg-[#F4F6FA] py-8 dark:bg-transparent lg:p-4">
      <div className={`container_page ${className}`}>
        <p className="text-center font-demibold text-[28px] text-[#172334] dark:text-white">
          نظر زبان آموزان الی انگلیش
        </p>
        {Number(section?.comments?.length) >= 1 ? (
          <Swiper
            speed={1000}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              if (swiperRef.current) swiperRef.current.swiper = swiper;
            }}
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={'auto'}
            modules={[Autoplay]}
            loop
            className={`!mt-10`}
          >
            {section.comments.map((item, idx) => (
              <SwiperSlide className="!w-[300px]" key={idx}>
                <CardComment
                  className="h-full w-full bg-white !p-8 dark:bg-[#263248]"
                  comment={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}

        <div className="mt-5 flex items-center justify-center gap-4">
          <Button
            className="w-fit"
            // @ts-expect-error error
            onClick={() => swiperRef.current?.swiper?.slideNext()}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 20L17 14L11 8"
                stroke="#6E3DFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button
            className="w-fit"
            // @ts-expect-error error

            onClick={() => swiperRef.current?.swiper?.slidePrev()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#6E3DFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Section6;
