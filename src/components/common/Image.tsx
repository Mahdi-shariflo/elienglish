'use client';
import React, { useState } from 'react';
import NextImage, { StaticImageData } from 'next/image';
import Logo from '@/../public/icons/logo.svg';
import { BASEURL } from '@/lib/variable';

type Props = {
  src: string | StaticImageData;
  alt: string;
  classImg?: string;
  className?: string;
  aspectRatio?: string; // اضافه‌شده برای نسبت تصویر (مثلاً '16/9')
};

const Image = ({ src, alt, className = '', classImg = '', aspectRatio = '4/3' }: Props) => {
  const [isError, setIsError] = useState(false);

  return (
    <div className={`relative bg-white ${className}`} style={{ aspectRatio }}>
      <NextImage
        src={isError ? Logo : typeof src === 'string' ? `${BASEURL}/${src}` : src}
        alt={alt}
        fill
        onError={() => setIsError(true)}
        quality={100}
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`h-full w-full object-cover ${classImg} ${isError ? '!object-contain' : ''}`}
      />
    </div>
  );
};

export default Image;
