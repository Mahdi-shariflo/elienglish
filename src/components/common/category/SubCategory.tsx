'use client';
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Button from '../Button';
import { useMedia } from 'react-use';
import Link from 'next/link';
import Image from '../Image';
type Props = {
  categories: {
    _id: string;
    title: string;
    url: string;
    thumbnailimage: {
      url: string;
    };
    properties: [];
    keyWords: [];
    createdAt: string;
    updatedAt: string;
    depth: 1;
  }[];
};
const SubCategory = ({ categories }: Props) => {
  const isMobile = useMedia('(max-width: 480px)', false);
  const swiperRef = useRef<SwiperRef | null>(null);
  if (categories.length < 1)
    return <div className="hidden border-b border-[#E4E7E9] pb-3 lg:block" />;
  return (
    <div>
      {isMobile ? (
        <div className="!mb-5 mt-3 flex items-center gap-3 overflow-auto">
          {categories.map((result, idx) => (
            <Link
              className="block min-w-fit rounded-full bg-[#E4E7E9] p-2 font-regular text-[12px] text-[#616A76]"
              href={`/product-category/${result.url}/`}
              key={idx}
            >
              {result.title}
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-3 hidden border-b border-[#E4E7E9] pb-3 lg:block">
          <div className="relative">
            <Swiper
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              ref={swiperRef}
              spaceBetween={17}
              slidesPerView={'auto'}
              modules={[Autoplay]}
              loop
              dir="rtl"
              className="!hidden !py-3 lg:!block"
            >
              {categories.map((result, idx) => (
                <SwiperSlide
                  className="!h-[197px] !w-[174px] !min-w-[176px] cursor-pointer rounded-xl border border-gray-100 bg-white p-2 shadow-sm"
                  key={idx}
                >
                  <Link
                    href={`/product-category/${result.url}`}
                    className="flex flex-col items-center justify-center"
                  >
                    <Image
                      alt=""
                      className="relative mx-auto h-[78px] w-[78px] lg:h-[106px] lg:w-[117px]"
                      classImg=""
                      src={result?.thumbnailimage?.url}
                    />
                    <div className="bg_subCategory h-px w-full"></div>
                    <p className="py-2 pt-4 text-center font-medium text-[14px] text-[#616A76]">
                      {result.title}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            {categories.length < 5 ? null : (
              <div className="absolute -left-20 top-[12px] z-30 flex h-[197px] w-[148px] items-center">
                <Button
                  onClick={async () => swiperRef.current?.swiper.slideNext()}
                  className="mr-5 h-[40px] w-[40px] !min-w-[40px] bg-main"
                >
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.07996"
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategory;
