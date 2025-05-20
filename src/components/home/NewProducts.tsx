'use client';
import React from 'react';
import TitleSection from '../common/TitleSection';
import Link from 'next/link';
import Image from 'next/image';
import { Toman_Icon } from '../common/icon';
import { Product } from '@/types/home';
import { BASEURL } from '@/lib/variable';
import { discountCalculation } from '@/lib/utils';
import IsClient from '../common/IsClient';

const Icon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.4"
      d="M16.0001 29.3333C23.3639 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63621 23.3639 2.66667 16.0001 2.66667C8.63628 2.66667 2.66675 8.63621 2.66675 16C2.66675 23.3638 8.63628 29.3333 16.0001 29.3333Z"
      fill="#7D8793"
      stroke="#7D8793"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.44 23.2667C16.2 23.3467 15.7867 23.3467 15.5467 23.2667C13.4667 22.56 8.80005 19.5867 8.80005 14.5467C8.80005 12.32 10.5867 10.52 12.8 10.52C14.1067 10.52 15.2667 11.1467 16 12.1333C16.72 11.16 17.8934 10.52 19.2 10.52C21.4134 10.52 23.2 12.32 23.2 14.5467C23.2 19.5867 18.5334 22.56 16.44 23.2667Z"
      fill="#7D8793"
      stroke="#7D8793"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Props = {
  title: string;
  products: Product[];
  url: string | null;
  nameSec?: string;
};
const NewProducts = ({ products, title, url }: Props) => {
  return (
    <IsClient>
      <div className="lg:container_page mr-[24px] lg:mr-0">
        <TitleSection url={url} Icon={Icon} title={title} />
        <div className="wrapper mt-[20px] overflow-auto">
          {products.map((item, idx) => (
            <Link
              className="relative flex h-[112px] w-full min-w-[241px] items-center overflow-hidden rounded-lg border border-gray-100 px-[22px] shadow-sm"
              href={`/product/${item.url}/`}
              key={idx}
            >
              <div className="relative flex h-full w-[96px] min-w-[96px] items-center justify-center lg:w-[112px] lg:min-w-[112px]">
                <Image fill quality={100} src={`${BASEURL}/${item.thumbnailImage.url}`} alt="" />
              </div>
              <div className="w-full">
                <p className="line-clamp-2 font-medium text-[12px] text-[#232429] lg:text-[14px]">
                  {item.title}
                </p>
                <div className="mt-[15px] flex items-center justify-between">
                  {item.discountPrice ? (
                    <p className="flex h-[24px] w-[41px] items-center justify-center rounded-md bg-main pt-px font-medium text-[12px] text-white">
                      {discountCalculation(item.discountPrice, item.price)} %
                    </p>
                  ) : null}
                  <div className="flex w-full flex-1 flex-col justify-end">
                    {item.discountPrice ? (
                      <p className="text-left !font-regular text-[12px] text-[#A8AFB8] line-through">
                        {Number(item.price).toLocaleString()}
                      </p>
                    ) : null}
                    <p className="flex items-center justify-end gap-1">
                      <span className="font-bold text-[12px] text-[#0C0C0C]">
                        {item.discountPrice
                          ? item.discountPrice.toLocaleString()
                          : item.price.toLocaleString()}
                      </span>
                      <Toman_Icon />
                    </p>
                  </div>
                </div>
              </div>
              <span className="absolute right-[0px] top-0">
                <div className="relative">
                  <svg
                    width="43"
                    height="38"
                    viewBox="0 0 43 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0H43V25C43 32.1797 37.1797 38 30 38H22.5952C12.378 38 4.09524 29.7173 4.09524 19.5C4.09524 15.5 5 13 4.09524 9.5C2.85788 4.71338 0 0 0 0Z"
                      fill="#DD338B"
                    />
                    <path
                      d="M21.5528 6.30126C23.1216 4.56625 25.8784 4.56625 27.4472 6.30126L28.6432 7.62396C29.3428 8.39761 30.3278 8.86412 31.379 8.91963L33.1762 9.01454C35.5336 9.13904 37.2525 11.2588 36.8513 13.5468L36.5455 15.2911C36.3666 16.3113 36.6099 17.3596 37.2212 18.2024L38.2663 19.6435C39.6371 21.5337 39.0237 24.177 36.9546 25.2951L35.3773 26.1475C34.4547 26.6461 33.773 27.4867 33.4841 28.4822L32.9901 30.1843C32.3421 32.4169 29.8582 33.5933 27.6793 32.6995L26.0182 32.0181C25.0466 31.6196 23.9534 31.6196 22.9818 32.0181L21.3207 32.6995C19.1418 33.5933 16.6579 32.4169 16.0099 30.1843L15.5159 28.4822C15.227 27.4867 14.5454 26.6461 13.6227 26.1475L12.0454 25.2951C9.97634 24.177 9.36288 21.5337 10.7337 19.6435L11.7788 18.2024C12.3901 17.3596 12.6334 16.3113 12.4545 15.2911L12.1487 13.5468C11.7475 11.2588 13.4664 9.13904 15.8238 9.01454L17.621 8.91963C18.6722 8.86412 19.6572 8.39761 20.3568 7.62396L21.5528 6.30126Z"
                      fill="white"
                    />
                  </svg>
                  <span className="absolute left-[58%] top-[58%] -translate-x-1/2 -translate-y-1/2 font-bold text-main">
                    {idx + 1}
                  </span>
                </div>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </IsClient>
  );
};

export default NewProducts;
