import Link from 'next/link';
import React from 'react';
import LogoImage from '@/../public/icons/logo.jpg';
import Image from 'next/image';
const Logo = ({ className }: { className?: string }) => {
  return (
    <>
      <Link className={`flex items-center gap-2 ${className}`} href="/">
        <Image
          className="h-[45px] w-[45px] rounded-full lg:h-[56px] lg:w-[56px]"
          src={LogoImage}
          alt=""
        />
        <div>
          <div>
            <span className="inline-block whitespace-nowrap font-bold text-[14px] dark:text-white">
              آکادمی
            </span>
            <span className="inline-block whitespace-nowrap font-bold text-[14px] dark:text-main">
              آلی انگلیش
            </span>
          </div>
          <span className="whitespace-nowrap text-[14px] dark:text-[#E5EAEF]">
            Elienglish Academy
          </span>
        </div>
      </Link>
    </>
  );
};

export default Logo;
