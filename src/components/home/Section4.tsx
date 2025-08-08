'use client';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import Carousel from '../common/Carousel';
import { Product } from '@/store/types/home';
type Props = {
  section: {
    colorTitle: string;
    title: string;
    href: string;
    course: Product[];
    product: Product[];
  };
};
const Section4 = ({ section }: Props) => {
  if (
    (!section?.course || section.course.length === 0) &&
    (!section?.product || section.product.length === 0)
  )
    return null;
  // if (Number(blogs?.length) < 1) return null;
  return (
    <div className="container_page">
      <Carousel
        classImage={section.product ? '!object-contain ' : '!object-fill lg:!object-cover'}
        classNameImage={
          section.product
            ? 'lg:pt-5 px-2 w-full dark:bg-white !h-[260px] lg:!h-[240px]'
            : '!w-full !h-[286px] !w-full'
        }
        classCard="!h-[380px] !w-[300px] lg:!h-[430px]"
        className="!w-full"
        title={section?.title}
        colorTitle={section.colorTitle}
        url={section?.href}
        products={section?.course ?? section?.product}
      ></Carousel>
    </div>
  );
};

export default Section4;
