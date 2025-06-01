import Link from 'next/link';
import React from 'react';
import LogoImage from '@/../public/icons/logo.jpg';
import Image from 'next/image';
const Logo = ({ className }: { className?: string }) => {
  return (
    <>
      <Link className={'flex items-center gap-2'} href="/">
        <Image className="h-[56px] w-[56px] rounded-full" src={LogoImage} alt="" />
        <div>
          <div>
            <span className="inline-block font-bold dark:text-white">آکادمی</span>
            <span className="inline-block font-bold dark:text-main">آلی انگلیش</span>
          </div>
          <span className="dark:text-[#E5EAEF]">Elienglish Academy</span>
        </div>
      </Link>
    </>
  );
};

export default Logo;
