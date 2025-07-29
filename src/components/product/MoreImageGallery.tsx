'use client';
import React, { useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import BaseDialog from '../common/BaseDialog';
import { Tab, Tabs } from '@heroui/react';
import Button from '../common/Button';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import { Product } from '@/store/types/home';
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
                    {images?.map((img, idx) => (
                      <SwiperSlide
                        className="!mx-auto !flex !items-center !justify-center"
                        key={idx}
                      >
                        <InnerImageZoom
                          key={zoomKey}
                          width={400}
                          height={400}
                          className="flex items-center justify-center"
                          src={`${BASEURL}/${img?.url}`}
                          zoomSrc={`${BASEURL}/${img?.url}`}
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
