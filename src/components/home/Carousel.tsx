'use client';
import React, { ReactNode, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CardProduct from '../common/CardProduct';
import Button from '../common/Button';
import { Product } from '@/types/home';
import { useRouter } from 'next/navigation';

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
                    stroke="#DD338B"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            ) : null}
            <div className={`flex items-center gap-2 ${classBtnArrows}`}>
              <Button
                onClick={async () => swiperRef?.current?.swiper.slidePrev()}
                className="h-8 w-8 !min-w-fit bg-main lg:h-[40px] lg:!w-[40px]"
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
                className="h-8 w-8 !min-w-fit bg-main lg:h-[40px] lg:!w-[40px]"
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
              {children}
            </div>
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
            className={`!pt-5 lg:!py-10 ${showSwiperSlide ? '' : '!block'}`}
          >
            {products?.map((item, idx) => {
              if (item.count < 1) return null;
              return (
                <SwiperSlide
                  // !w-[148px] !min-w-[148px]
                  className="!h-[190px] !w-[148px] !min-w-[148px] lg:!h-[320px] lg:!w-[230px] lg:!min-w-[230px]"
                  key={idx}
                >
                  <CardProduct product={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}
        {!showSwiperSlide && (
          <div className="mt-3 hidden grid-cols-2 gap-3">
            {products?.slice(0, 4).map((item, idx) => <CardProduct key={idx} product={item} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default Carousel;
