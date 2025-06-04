'use client';
import { Slider } from '@/types/home';
import Link from 'next/link';
import React, { JSX } from 'react';
import Image from '../common/Image';
import IsClient from '../common/IsClient';
type Props = {
  banners: any[];
  className?: string;
  ActionBanner?: (props: { banner: Slider }) => JSX.Element;
};
const Banners = ({ banners, className, ActionBanner }: Props) => {
  return (
    <IsClient>
      <div className={`flex flex-col items-center lg:flex-row lg:gap-10 ${className}`}>
        {banners.map((item, idx) => (
          <Link className="h-[150px] w-full lg:h-[220px] lg:w-full" key={idx} href={`${item.href}`}>
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
