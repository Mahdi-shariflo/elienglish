'use client';
import Button from '@/components/common/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="container_page pb-32 lg:pb-0">
      <div className="mx-auto my-20 mt-40 lg:mt-60 lg:w-[600px]">
        <div className="mx-auto flex flex-col items-center rounded-lg bg-[#EBFEF6] p-8">
          <span>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.0003 4.66797C15.1437 4.66797 4.66699 15.1446 4.66699 28.0013C4.66699 40.858 15.1437 51.3346 28.0003 51.3346C40.857 51.3346 51.3337 40.858 51.3337 28.0013C51.3337 15.1446 40.857 4.66797 28.0003 4.66797ZM39.1537 22.6346L25.9237 35.8646C25.597 36.1913 25.1537 36.378 24.687 36.378C24.2203 36.378 23.777 36.1913 23.4503 35.8646L16.847 29.2613C16.1703 28.5846 16.1703 27.4646 16.847 26.788C17.5237 26.1113 18.6437 26.1113 19.3203 26.788L24.687 32.1546L36.6803 20.1613C37.357 19.4846 38.477 19.4846 39.1537 20.1613C39.8303 20.838 39.8303 21.9346 39.1537 22.6346Z"
                fill="#0ABF8C"
              />
            </svg>
          </span>
          <span className="block pt-4 text-center font-bold text-[#009B72]">
            پرداخت شما با موفقیت انجام شد
          </span>
          <div className="flex items-center justify-center gap-1 pt-4 font-regular text-[14px] text-[#393B40]">
            <p>کد رهگیری سفارش شما:</p>
            <p>{searchParams.get('orderNumber')}</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-3 lg:mt-10 lg:flex-row">
          <Button onClick={() => router.push('/')} className="border border-main text-main">
            بازگشت به صفحه اصلی
          </Button>
          <Button onClick={() => router.push('/profile/orders/')} className="bg-main text-white">
            پیگیری سفارش
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
