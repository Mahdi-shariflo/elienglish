import Link from 'next/link';
import React from 'react';
import LogoDark from '@/../public/images/logo-dark.png';
import LogoLight from '@/../public/images/logo-light.png';

import Image from 'next/image';
const Logo = ({ className }: { className?: string }) => {
  return (
    <>
      <Link className={`flex items-center justify-center gap-2 ${className}`} href="/">
        <Image className="!w-[9rem] dark:hidden lg:!w-fit" src={LogoDark} alt="" />
        <Image className="hidden !w-[9rem] dark:block lg:!w-fit" src={LogoLight} alt="" />
      </Link>
    </>
  );
};

export default Logo;
