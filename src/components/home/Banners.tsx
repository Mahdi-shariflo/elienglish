'use client';
import { Slider } from '@/types/home';
import Link from 'next/link';
import React, { JSX } from 'react';
import Image from '../common/Image';
import IsClient from '../common/IsClient';
type Props = {
  banners: Slider[];
  className?: string;
  ActionBanner?: (props: { banner: Slider }) => JSX.Element;
};
const Banners = ({ banners, className, ActionBanner }: Props) => {
  return (
    <IsClient>
      <div
        className={`container_page mt-8 flex flex-col items-center lg:my-[10px] lg:flex-row lg:gap-10 ${className}`}
      >
        {banners.map((item, idx) => (
          <Link className="h-[150px] w-full lg:h-[389px] lg:w-1/2" key={idx} href={`${item.href}`}>
            <Image
              className="inline-block h-full w-full cursor-pointer overflow-hidden rounded-xl lg:object-cover"
              src={`${item.url}`}
              alt={item.title}
            />

            {ActionBanner && <ActionBanner banner={item} />}
          </Link>
        ))}
      </div>
    </IsClient>
  );
};

export default Banners;
