'use client';
import React, { ReactNode, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Button from '../common/Button';
import { Product } from '@/types/home';
import { useRouter } from 'next/navigation';
import CardProduct from './CardProduct';

type Props = {
  title?: string;
  className?: string;
  showSwiperSlide?: boolean;
  Icon?: () => React.JSX.Element;
  products?: Product[];
  url?: string | null;
  children?: ReactNode;
  nameSec?: string;
  classBtnArrows?: string;
  classCard?: string;
};
const Carousel = ({
  url,
  title,
  Icon,
  className,
  showSwiperSlide,
  products,
  children,
  classBtnArrows,
  classCard,
}: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const router = useRouter();
  return (
    <>
      <div className={`container_page ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon />}
            {/* <Image width={32} height={32} alt='' src={icon} /> */}
            <span className="font-bold text-[14px] lg:text-[24px]">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {url ? (
              <Button
                onClick={() => router.push(`${url}/`)}
                className="!w-fit bg-transparent px-0 font-regular text-[12px] text-main lg:text-[14px]"
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
                    stroke="#6E3DFF"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            ) : null}
          </div>
        </div>
        {Number(products?.length) >= 1 ? (
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
            className={`!mt-6 ${showSwiperSlide ? '' : '!block'}`}
          >
            {products?.map((item, idx) => {
              if (!item) return null;
              if (item.count < 1) return null;
              return (
                <SwiperSlide
                  // !w-[148px] !min-w-[148px]
                  key={idx}
                  className={classCard}
                >
                  <CardProduct url="" className="h-full w-full" product={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}
        {!showSwiperSlide && (
          <div className="mt-3 hidden grid-cols-2 gap-3">
            {products
              ?.slice(0, 4)
              .map((item, idx) => <CardProduct url="" key={idx} product={item} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default Carousel;
