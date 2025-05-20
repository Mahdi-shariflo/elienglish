'use client';
import React, { useState } from 'react';
import Video from 'next-video';
import ActionFavShare from './ActionFavShare';
import MoreImageGallery from './MoreImageGallery';
import Button from '../common/Button';
import { Product } from '@/types/home';
import { useMedia } from 'react-use';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from '../common/Image';
import BaseDialog from '../common/BaseDialog';
import { BASEURL } from '@/lib/variable';
import { BiCloset } from 'react-icons/bi';
const Gallery = ({ product }: { product: Product }) => {
  const [openVidoe, setOpenVidoe] = useState(false);
  const handleClose = () => setOpenVidoe(false);
  const [open, setOpen] = useState(false);
  const isMobile = useMedia('(max-width: 480px)', false);

  const [select, setSelect] = useState(0);
  const newGallery = [
    product.thumbnailImage,
    ...(Array.isArray(product?.galleryImage) ? product?.galleryImage : []),
  ];
  return (
    <>
      <div className="relative h-full w-full lg:min-w-[496px]">
        <div className="container_page flex items-start lg:!w-full lg:gap-[11px]">
          <div className="-mt-1 lg:w-[80px] lg:max-w-[80px]">
            <MoreImageGallery
              selected={select}
              setSelected={setSelect}
              open={open}
              setOpen={setOpen}
              product={product}
            />
            <div className="mt-2 hidden flex-col gap-[11px] lg:flex">
              {newGallery.slice(0, 4).map((img, idx) => (
                <Button
                  onClick={() => setSelect(idx)}
                  key={idx}
                  className={`flex !h-[80px] !w-[80px] items-center justify-center border ${
                    select === idx ? 'border-main' : 'border-[#CCD0D5]'
                  }`}
                >
                  <Image className="h-[70px] w-[70px] object-contain" src={`${img?.url}`} alt="" />
                </Button>
              ))}
            </div>
          </div>
          <div className="relative h-fit w-full overflow-hidden rounded-lg border-[#E4E7E9] lg:h-[389px] lg:border">
            <ActionFavShare product={product} />
            {isMobile ? (
              <Swiper
                speed={1000}
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop
              >
                {newGallery.map((img, idx) => (
                  <SwiperSlide onClick={() => setOpen(!open)} key={idx}>
                    <Image
                      className="mx-auto h-[320px] w-[250px] object-contain"
                      src={`${img?.url}`}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div
                onClick={() => setOpen(!open)}
                className="flex h-[270px] !w-full cursor-pointer items-center justify-center lg:h-[390px]"
              >
                <Image
                  src={`${newGallery[select]?.url}`}
                  alt=""
                  className="h-[250px] w-[250px] object-contain lg:h-[390px] lg:w-[370px] lg:object-cover"
                />
              </div>
            )}
          </div>
        </div>
        {product?.video?.url ? (
          <div className="mr-[24px] mt-[11px] flex h-[80px] items-center gap-[11px] overflow-auto lg:mr-0 lg:h-[96px]">
            <Button
              onClick={() => setOpenVidoe(true)}
              className="flex h-full !w-[80px] min-w-[80px] items-center justify-center rounded-lg bg-[#FCE7F5]"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M15.9993 2.66665C23.3631 2.66665 29.3327 8.63618 29.3327 16C29.3327 23.3638 23.3631 29.3333 15.9993 29.3333C8.63555 29.3333 2.66602 23.3638 2.66602 16C2.66602 8.63618 8.63555 2.66665 15.9993 2.66665Z"
                  fill="#BE1869"
                />
                <path
                  d="M12.1328 16V17.9733C12.1328 20.52 13.9328 21.5467 16.1328 20.28L17.8395 19.2933L19.5461 18.3067C21.7461 17.04 21.7461 14.96 19.5461 13.6933L17.8395 12.7067L16.1328 11.72C13.9328 10.4533 12.1328 11.4933 12.1328 14.0267V16Z"
                  fill="#BE1869"
                />
              </svg>
            </Button>
          </div>
        ) : null}
      </div>
      {openVidoe && (
        <BaseDialog
          size={isMobile ? 'full' : '2xl'}
          onClose={handleClose}
          title="نمایش ویدیو محصول"
          isOpen={openVidoe}
          classBody="flex justify-center !bg-black"
        >
          <div className="relative -mt-14 flex items-center justify-center">
            <Video src={`${BASEURL}/${product?.video?.url}`} />
            {/* <video
              className="w-full"
              controlsList="nodownload"
              autoPlay
              poster=""
              controls
              preload="none"
            >
              <source
                src={`${BASEURL}/${product?.video?.url}`}
                type="video/mp4"
              />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video> */}
          </div>
        </BaseDialog>
      )}
    </>
  );
};

export default Gallery;
