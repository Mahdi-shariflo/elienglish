'use client';
import React, { ReactNode } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Category } from '@/types/home';
import Image from '../common/Image';

const Categories = ({
  productsCategories,
  className,
  children,
}: {
  children?: ReactNode;
  className?: string;
  productsCategories?: string;
}) => {
  const categories = productsCategories ? JSON.parse(productsCategories) : [];
  return (
    <div className={`container_categries lg:container_page mr-[24px] lg:mr-0 ${className}`}>
      <p className="text-center font-medium text-[14px] text-[#232429] lg:text-[24px]">
        دسته‌بندی‌ها
      </p>
      <div className="mt-[20px] hidden flex-wrap items-center justify-center gap-[24px] lg:flex">
        {children}
        {categories?.map((category: Category, idx: number) => (
          <Link
            className="flex h-[160px] w-[132px] flex-col items-center"
            href={`${category.url!}/`}
            key={idx}
          >
            <Image
              src={`${category?.thumbnailimage?.url}`}
              alt={category.title!}
              className="z-20 h-[85px] w-[85px] rounded-full bg-white object-cover"
            />
            <div className="-mt-9 flex h-[105px] w-[132px] items-center justify-center rounded-lg bg-[#FCE7F5]">
              <p className="mt-5 w-[100px] text-center font-medium text-[16px] text-[#0C0C0C]">
                {category.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        spaceBetween={42}
        slidesPerView={'auto'}
        loop
        dir="rtl"
        className="lg:!PR-0 mt-3 !pb-8 !pr-4 lg:!hidden"
      >
        {categories?.map((category: Category, idx: number) => (
          <SwiperSlide className="!w-[70px] !min-w-[70px]" key={idx}>
            <Link className="flex flex-col items-center lg:h-[160px]" href={`${category.url!}/`}>
              <Image
                src={category?.thumbnailimage?.url!}
                alt={category.title!}
                className="z-40 h-[56px] w-[56px] rounded-full bg-white"
              />
              <div className="-mt-9 flex h-[75px] w-[99px] items-center justify-center rounded-lg bg-[#FCE7F5]">
                <p className="mt-8 w-[100px] text-center font-medium text-[10px] text-[#0C0C0C]">
                  {category.title}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
