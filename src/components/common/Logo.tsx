import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LogoImage from '@/../public/icons/logo.svg';
const Logo = ({ className }: { className?: string }) => {
  return (
    <>
      <Link className={className} href="/">
        <Image className="!h-[50px] !w-[180px] object-fill" alt="" src={LogoImage} />
      </Link>
    </>
  );
};

export default Logo;
