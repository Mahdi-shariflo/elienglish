'use client';
import React, { useState } from 'react';
import Video from 'next-video';
import ActionFavShare from './ActionFavShare';
import MoreImageGallery from './MoreImageGallery';
import Button from '../common/Button';
import { Product } from '@/store/types/home';
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
      <div className="relative h-full w-full lg:w-[435px]">
        <div className="container_page flex flex-col lg:!w-full lg:gap-[11px]">
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
                  className="h-[250px] w-full lg:h-[390px] lg:object-fill"
                />
              </div>
            )}
          </div>
          <div className="lg:w-[80px] lg:max-w-[80px]">
            <MoreImageGallery
              selected={select}
              setSelected={setSelect}
              open={open}
              setOpen={setOpen}
              product={product}
            />
            <div className="mt-2 hidden gap-[11px] lg:flex">
              {newGallery.slice(0, 4).map((img, idx) => (
                <Button
                  onClick={() => setSelect(idx)}
                  key={idx}
                  className={`flex !h-[72px] !w-[72px] items-center justify-center rounded-lg border ${
                    select === idx ? 'border-main' : 'border-[#CCD0D5]'
                  }`}
                >
                  <Image
                    className="h-[70px] w-[70px] overflow-hidden !object-fill"
                    src={`${img?.url}`}
                    alt=""
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
