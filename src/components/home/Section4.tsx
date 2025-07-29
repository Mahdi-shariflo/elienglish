'use client';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import Carousel from '../common/Carousel';
import { Product } from '@/store/types/home';
type Props = {
  section: {
    colorTitle: string;
    href: string;
    course: Product[];
    product: Product[];
  };
};
const Section4 = ({ section }: Props) => {
  if (!section?.course || !section?.product) return;
  // if (Number(blogs?.length) < 1) return null;
  return (
    <div className="container_page">
      <Carousel
        classCard="!h-[380px] !w-[300px] lg:!h-[400px]"
        className="!w-full"
        title={section?.colorTitle}
        url={section?.href}
        products={section?.course || section?.product}
      ></Carousel>
    </div>
  );
};

export default Section4;
