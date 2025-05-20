'use client';
import React, { useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import BaseDialog from '../common/BaseDialog';
import { Tab, Tabs } from '@heroui/react';
import Button from '../common/Button';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import { Product } from '@/types/home';
import { BASEURL } from '@/lib/variable';
// import '../../../node_modules/react-inner-image-zoom/lib/InnerImageZoom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'react-inner-image-zoom/lib/styles.min.css';
import { useMedia } from 'react-use';

type Props = {
  product: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  selected: number;
};
const MoreImageGallery = ({ product, open, setOpen }: Props) => {
  const [zoomKey, setZoomKey] = useState(0);
  const isMobile = useMedia('(max-width: 480px)', false);

  const [select, setSelect] = useState(0);
  const onClose = () => {
    setSelect(0);
    setOpen(false);
  };
  const images = [product.thumbnailImage, ...(product.galleryImage || [])];

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="absolute bottom-5 left-5 z-40 !m-0 !h-[33px] w-fit !p-0 lg:static lg:!min-w-full"
      >
        {/* more */}
        <span className="hidden w-full items-center justify-center rounded-t-lg bg-[#E4E7E9] lg:flex">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 14C3.9 14 3 13.1 3 12C3 10.9 3.9 10 5 10C6.1 10 7 10.9 7 12C7 13.1 6.1 14 5 14Z"
              fill="#616A76"
              stroke="#616A76"
              strokeWidth="1.5"
            />
            <path
              d="M19 14C17.9 14 17 13.1 17 12C17 10.9 17.9 10 19 10C20.1 10 21 10.9 21 12C21 13.1 20.1 14 19 14Z"
              fill="#616A76"
              stroke="#616A76"
              strokeWidth="1.5"
            />
            <path
              d="M12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z"
              fill="#616A76"
              stroke="#616A76"
              strokeWidth="1.5"
            />
          </svg>
        </span>
        <div className="flex h-[28px] w-[82px] items-center justify-center gap-1 rounded-lg bg-main text-[12px] text-white lg:hidden">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49935 18.3333H12.4993C16.666 18.3333 18.3327 16.6666 18.3327 12.5V7.49996C18.3327 3.33329 16.666 1.66663 12.4993 1.66663H7.49935C3.33268 1.66663 1.66602 3.33329 1.66602 7.49996V12.5C1.66602 16.6666 3.33268 18.3333 7.49935 18.3333Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.50065 8.33333C8.42113 8.33333 9.16732 7.58714 9.16732 6.66667C9.16732 5.74619 8.42113 5 7.50065 5C6.58018 5 5.83398 5.74619 5.83398 6.66667C5.83398 7.58714 6.58018 8.33333 7.50065 8.33333Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.22461 15.7917L6.33294 13.0333C6.99128 12.5917 7.94128 12.6417 8.53294 13.15L8.80794 13.3917C9.45794 13.95 10.5079 13.95 11.1579 13.3917L14.6246 10.4167C15.2746 9.85834 16.3246 9.85834 16.9746 10.4167L18.3329 11.5833"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>تصاویر</span>
        </div>
      </Button>
      {
        <BaseDialog size={'2xl'} isOpen={open} onClose={onClose}>
          <div className="relative">
            <Tabs
              variant="underlined"
              classNames={{
                base: 'w-full',
                tabList:
                  'gap-4 sm:gap-6 w-full relative z-50  font-regular relative rounded-none p-0 border-b border-divider',
                cursor: 'w-full h-[1.3px]  bg-main',
                tab: 'max-w-full !text-[12px] text-[#616A76] lg:!text-[14px] px-0 h-14',
                tabContent: 'group-data-[selected=true]:text-[#0C0C0C]',
              }}
            >
              <Tab key={'image'} title={'رسمی'}>
                {/* mobile */}
                <>
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#DD338B',
                      '--swiper-pagination-color': '#DD338B',
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    onSlideChange={() => setZoomKey((prev) => prev + 1)} // هر بار تغییر اسلاید، زوم ریست شود
                  >
                    {images.map((img, idx) => (
                      <SwiperSlide
                        className="!mx-auto !flex !items-center !justify-center"
                        key={idx}
                      >
                        <InnerImageZoom
                          key={zoomKey}
                          width={400}
                          height={400}
                          className="flex items-center justify-center"
                          src={`${BASEURL}/${img.url}`}
                          zoomSrc={`${BASEURL}/${img.url}`}
                          hideCloseButton
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* <div className='flex items-center gap-3'>

                                        {
                                            images.map((img, idx) => (
                                                <Button onClick={() => setSelect(idx)} className={`w-10 h-10 min-w-10 rounded-lg overflow-hidden lg:!w-20 lg:!h-20 cursor-pointer border ${select === idx ? "border-main" : ""}`} key={idx}>
                                                    <img src={`${BASEURL}/${img.url}`} />
                                                </Button>
                                            ))
                                        }
                                    </div> */}
                </>
              </Tab>

              {product?.video?.url && (
                <Tab key={'videos'} title={'ویدیو‌ها'}>
                  <div>
                    <div className="flex h-[340px] items-center justify-center">
                      {/* <span className='block relative h-[240px] w-[240px] mx-auto'>
                                        <Image quality={100} fill className='object-contain scale-110' src={`$`} alt='' />
                                    </span> */}
                    </div>
                    <div className="flex items-center gap-3">
                      <Button className="h-[32px] w-[32px] min-w-[32px] rounded-lg bg-main px-0">
                        <span>
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.43945 13.28L10.7861 8.9333C11.2995 8.41997 11.2995 7.57997 10.7861 7.06664L6.43945 2.71997"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Button>
                      {/* <Swiper
                                        autoplay={{
                                            delay: 3500,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true
                                        }}
                                        spaceBetween={17}
                                        slidesPerView={"auto"}
                                        modules={[Autoplay]}
                                        loop
                                        dir="rtl"
                                        className="!py-3 !hidden lg:!block"

                                    >
                                        {
                                            products.map((item, idx) => (
                                                <SwiperSlide onClick={() => setSelected(idx)} className={`!w-[155px] cursor-pointer !min-w-[155px] border rounded-xl !h-[90px] ${selected === idx ? "border-main" : ""}`} key={idx}>

                                                    <Image fill src={item.img} alt='' className='object-contain' />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper> */}
                      <Button className="h-[32px] w-[32px] min-w-[32px] rounded-lg bg-main px-0">
                        <span>
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.4992 13.28L6.15258 8.9333C5.63924 8.41997 5.63924 7.57997 6.15258 7.06664L10.4992 2.71997"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Button>
                    </div>
                  </div>
                </Tab>
              )}
            </Tabs>

            <Button
              onClick={() => setOpen(false)}
              className="absolute left-3 top-2 !z-[9999] w-fit !min-w-fit"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L18 18"
                  stroke="#545A66"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 6L6 18"
                  stroke="#616A76"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </BaseDialog>
      }
    </>
  );
};

export default MoreImageGallery;
