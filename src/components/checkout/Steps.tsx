'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import {
  Active_address_Icon,
  Active_payment_Icon,
  Cart_Icon,
  Deactive_address_Icon,
  Deactive_payment_Icon,
} from '../common/icon';

const Steps = () => {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          {pathname === '/cart/' ? (
            <Cart_Icon className={`${'h-[45px] w-[45px] lg:h-[79px] lg:w-[79px]'}`} />
          ) : (
            <span className="block h-[40px] w-[40px] lg:h-[48px] lg:w-[48px]">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="24" fill="#F9A8DA" />
                <path
                  d="M29.6666 38.0007C30.9552 38.0007 31.9999 36.956 31.9999 35.6673C31.9999 34.3787 30.9552 33.334 29.6666 33.334C28.3779 33.334 27.3333 34.3787 27.3333 35.6673C27.3333 36.956 28.3779 38.0007 29.6666 38.0007Z"
                  fill="white"
                />
                <path
                  d="M19.0001 38.0007C20.2887 38.0007 21.3334 36.956 21.3334 35.6673C21.3334 34.3787 20.2887 33.334 19.0001 33.334C17.7114 33.334 16.6667 34.3787 16.6667 35.6673C16.6667 36.956 17.7114 38.0007 19.0001 38.0007Z"
                  fill="white"
                />
                <path
                  d="M14.4534 13.2527L14.1867 16.5193C14.1334 17.146 14.6267 17.666 15.2534 17.666H35.6667C36.2267 17.666 36.6934 17.2393 36.7334 16.6793C36.9067 14.3193 35.1067 12.3993 32.7467 12.3993H16.3601C16.2267 11.8127 15.9601 11.2527 15.5467 10.786C14.8801 10.0793 13.9467 9.66602 12.9867 9.66602H10.6667C10.1201 9.66602 9.66675 10.1193 9.66675 10.666C9.66675 11.2127 10.1201 11.666 10.6667 11.666H12.9867C13.4001 11.666 13.7867 11.8393 14.0667 12.1327C14.3467 12.4393 14.4801 12.8393 14.4534 13.2527Z"
                  fill="white"
                />
                <path
                  d="M35.3467 19.666H14.8933C14.3333 19.666 13.88 20.0927 13.8267 20.6393L13.3467 26.4393C13.16 28.7193 14.9467 30.666 17.2267 30.666H32.0533C34.0533 30.666 35.8133 29.026 35.96 27.026L36.4 20.7993C36.4533 20.186 35.9733 19.666 35.3467 19.666Z"
                  fill="white"
                />
              </svg>
            </span>
          )}
          <p
            className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-medium text-[12px] lg:text-[14px] ${pathname === '/cart/' ? 'text-main' : 'text-[#F9A8DA]'}`}
          >
            سبد خرید
          </p>
        </div>
        <span
          className={`block h-[1.5px] !w-[45px] rounded-xl lg:!w-[188px] ${pathname === '/cart/' ? 'bg-[#A8AFB8]' : 'bg-[#F9A8DA]'} `}
        />
        <div className="relative">
          {pathname === '/checkout/' ? (
            <span className="block h-[40px] w-[40px] lg:h-[48px] lg:w-[48px]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="24" fill="#F9A8DA" />
                <g clip-path="url(#clip0_2805_50048)">
                  <path
                    d="M35.4932 19.2673C34.0932 13.1073 28.7199 10.334 23.9999 10.334C23.9999 10.334 23.9999 10.334 23.9865 10.334C19.2799 10.334 13.8932 13.094 12.4932 19.254C10.9332 26.134 15.1466 31.9606 18.9599 35.6273C20.3732 36.9873 22.1866 37.6673 23.9999 37.6673C25.8132 37.6673 27.6266 36.9873 29.0266 35.6273C32.8399 31.9606 37.0532 26.1473 35.4932 19.2673ZM23.9999 25.9473C21.6799 25.9473 19.7999 24.0673 19.7999 21.7473C19.7999 19.4273 21.6799 17.5473 23.9999 17.5473C26.3199 17.5473 28.1999 19.4273 28.1999 21.7473C28.1999 24.0673 26.3199 25.9473 23.9999 25.9473Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2805_50048">
                    <rect width="32" height="32" fill="white" transform="translate(8 8)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          ) : pathname === '/address/' ? (
            <Active_address_Icon className={`${'h-[45px] w-[45px] lg:h-[79px] lg:w-[79px]'}`} />
          ) : (
            <Deactive_address_Icon className="h-[40px] w-[40px] lg:h-[48px] lg:w-[48px]" />
          )}

          <p
            className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-medium text-[12px] lg:text-[14px] ${pathname === '/checkout/' ? 'text-[#F9A8DA]' : pathname === '/address/' ? 'text-main' : 'text-[12px] text-[#A8AFB8]'}`}
          >
            اطلاعات آدرس
          </p>
        </div>
        <span
          className={`block h-[1.5px] !w-[45px] rounded-xl lg:!w-[188px] ${pathname === '/cart/' || pathname === '/address/' ? 'bg-[#A8AFB8]' : 'bg-[#F9A8DA]'}`}
        />
        <div className="relative">
          {pathname !== '/checkout/' ? (
            <Deactive_payment_Icon className={`h-[40px] w-[40px] lg:h-[48px] lg:w-[48px]`} />
          ) : (
            <Active_payment_Icon className="h-[45px] w-[45px] lg:h-[79px] lg:w-[79px]" />
          )}
          <p
            className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-medium text-[12px] lg:text-[14px] ${pathname === '/checkout/' ? 'text-main' : 'text-[12px] text-[#A8AFB8]'}`}
          >
            انتخاب شیوه پرداخت
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
