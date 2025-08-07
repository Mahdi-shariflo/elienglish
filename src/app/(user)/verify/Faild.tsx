'use client';
import Button from '@/components/common/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Faild = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="container_page">
      <div className="mx-auto my-20 mt-40 lg:mt-60 lg:w-[600px]">
        <div className="mx-auto flex flex-col items-center rounded-lg bg-[#FFF1F2] p-8">
          <span>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.0003 4.66797C15.1437 4.66797 4.66699 15.1446 4.66699 28.0013C4.66699 40.858 15.1437 51.3346 28.0003 51.3346C40.857 51.3346 51.3337 40.858 51.3337 28.0013C51.3337 15.1446 40.857 4.66797 28.0003 4.66797ZM35.8403 33.368C36.517 34.0446 36.517 35.1646 35.8403 35.8413C35.4903 36.1913 35.047 36.3546 34.6037 36.3546C34.1603 36.3546 33.717 36.1913 33.367 35.8413L28.0003 30.4746L22.6337 35.8413C22.2837 36.1913 21.8403 36.3546 21.397 36.3546C20.9537 36.3546 20.5103 36.1913 20.1603 35.8413C19.4837 35.1646 19.4837 34.0446 20.1603 33.368L25.527 28.0013L20.1603 22.6346C19.4837 21.958 19.4837 20.838 20.1603 20.1613C20.837 19.4846 21.957 19.4846 22.6337 20.1613L28.0003 25.528L33.367 20.1613C34.0437 19.4846 35.1637 19.4846 35.8403 20.1613C36.517 20.838 36.517 21.958 35.8403 22.6346L30.4737 28.0013L35.8403 33.368Z"
                fill="#E52A35"
              />
            </svg>
          </span>
          <span className="block pt-4 text-center font-bold text-[#E52A35]">
            پرداخت شما ناموفق بود
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

export default Faild;
