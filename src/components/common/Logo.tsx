import Link from 'next/link';
import React from 'react';
import LogoDark from '@/../public/images/logo-dark.png';
import LogoLight from '@/../public/images/logo-light.png';

import Image from 'next/image';
const Logo = ({ className }: { className?: string }) => {
  return (
    <>
      <Link className={`flex items-center justify-center gap-2 ${className}`} href="/">
        <Image className="dark:hidden" src={LogoDark} alt="" />
        <Image className="hidden dark:block" src={LogoLight} alt="" />
      </Link>
    </>
  );
};

export default Logo;
