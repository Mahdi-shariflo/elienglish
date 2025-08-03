import { useGetTopBanner } from '@/hooks/settings/useGetTopBanner';
import React from 'react';
import { BASEURL } from '@/lib/variable';
import Link from 'next/link';
import Image from 'next/image';

const TopBanner = ({ className }: { className?: string }) => {
  const { data, isSuccess } = useGetTopBanner();
  const topBannerData = data?.data?.data;
  if (!isSuccess) return null;
  return (
    <Link
      href={`${topBannerData?.href}/`}
      className={`relative block h-[32px] w-full transition-all duration-300 lg:h-[60px] ${className}`}
    >
      <picture className="h-full w-full overflow-hidden">
        {/* تصویر موبایل با وضوح مختلف */}
        <source
          media="(max-width: 768px)"
          srcSet={`${BASEURL}/${topBannerData?.mobileImageUrl} 1x, 
               ${BASEURL}/${topBannerData?.mobileImageUrl} 2x`}
        />
        {/* تصویر دسکتاپ با وضوح مختلف */}
        <source
          media="(min-width: 769px)"
          srcSet={`${BASEURL}/${topBannerData?.desktopImageUrl} 1x, 
               ${BASEURL}/${topBannerData?.desktopImageUrl} 2x, 
               ${BASEURL}/${topBannerData?.desktopImageUrl} 3x`}
        />
        <Image
          src={`${BASEURL}/${topBannerData?.desktopImageUrl}`}
          alt=""
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true}
          className="rounded-none object-cover"
        />
      </picture>
    </Link>
  );
};

export default TopBanner;
