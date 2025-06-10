'use client';
import React, { useState } from 'react';
import NextImage, { StaticImageData } from 'next/image';
import Logo from '@/../public/icons/logo.svg';
import { BASEURL } from '@/lib/variable';
// import { BASEURL } from '@/lib/variable';

type Props = {
  src: string | StaticImageData;
  alt: string;
  classImg?: string;
  className: string;
};

const Image = ({ src, alt, className, classImg }: Props) => {
  const [isError, setIsError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <NextImage
        src={isError ? Logo : `${BASEURL}/${src}`}
        alt={alt}
        fill
        onError={() => setIsError(true)}
        quality={100}
        priority
        className={`bg-transparent object-cover mix-blend-multiply ${
          classImg ? classImg : ''
        } ${isError ? '!object-contain' : ''}`}
      />
    </div>
  );
};

export default Image;
