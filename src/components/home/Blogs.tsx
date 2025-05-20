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
import { Article } from '@/types';
import { useGetMag } from '@/hooks/blog/useGetMag';
import { CardMag } from '../mag/CategoryCardsMag';
import { useRouter } from 'next/navigation';
type Props = {
  title?: string;
  Icon?: () => React.JSX.Element;
};

const Blogs = ({ Icon, title }: Props) => {
  const { data, isSuccess } = useGetMag();
  const blog: {
    magsByCat: {
      categoryName: string;
      categoryUrl: string;
      articles: Article[];
    }[];
    magsByIsChosen: Article[];
    lastedMags: Article[];
  } = data?.data?.data;
  const swiperRef = useRef<SwiperRef | null>(null);
  const router = useRouter();
  if (!isSuccess || [...blog?.lastedMags, ...blog?.magsByIsChosen].length < 1) return null;
  return (
    <>
      <div className="lg:container_page mr-[24px] mt-10 lg:mr-0 lg:mt-10">
        <div className="mb-2 flex items-center justify-between lg:mb-5">
          <div className="flex items-center gap-2">
            {Icon && <Icon />}
            {/* <Image width={32} height={32} alt='' src={icon} /> */}
            <span className="font-bold text-[14px] lg:text-[24px]">{title}</span>
          </div>
          <Button
            onClick={() => router.push('/mag/')}
            className="!w-fit bg-transparent !pl-3 font-regular text-main lg:hidden"
          >
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
          spaceBetween={15}
          slidesPerView={'auto'}
          modules={[Autoplay]}
          loop
          dir="rtl"
          className="!py-3"
        >
          {[...blog?.lastedMags, ...blog?.magsByIsChosen].map((article, idx) => (
            <SwiperSlide
              className="!h-[300px] !w-[230px] overflow-hidden rounded-xl border border-gray-100 !p-2 !py-3"
              key={idx}
            >
              <CardMag
                classImg="object-fill"
                classNameImg="-mt-1"
                container_class="!w-full h-full"
                blog={article}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Blogs;
