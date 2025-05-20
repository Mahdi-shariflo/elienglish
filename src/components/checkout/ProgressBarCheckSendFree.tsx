import { freeShippingPrice } from '@/lib/variable';
import React from 'react';
import { Progress } from '@heroui/react';
import useBasket from '@/hooks/basket/useBasket';

const ProgressBarCheckSendFree = () => {
  const { total } = useBasket();
  const percentage = (total / freeShippingPrice) * 100;
  return (
    <div className="overflow-hidden rounded-lg border border-[#FFF3D0] bg-[#F5F6F6] p-[24px]">
      <div className="flex items-center gap-2">
        <span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5002 3.50065V14.0007C17.5002 15.284 16.4502 16.334 15.1668 16.334H2.3335V7.00065C2.3335 4.42232 4.42183 2.33398 7.00016 2.33398H16.3335C16.9752 2.33398 17.5002 2.85898 17.5002 3.50065Z"
              fill="#1DA1F3"
            />
            <path
              opacity="0.4"
              d="M25.6668 16.334V19.834C25.6668 21.7707 24.1035 23.334 22.1668 23.334H21.0002C21.0002 22.0506 19.9502 21.0007 18.6668 21.0007C17.3835 21.0007 16.3335 22.0506 16.3335 23.334H11.6668C11.6668 22.0506 10.6168 21.0007 9.3335 21.0007C8.05016 21.0007 7.00016 22.0506 7.00016 23.334H5.8335C3.89683 23.334 2.3335 21.7707 2.3335 19.834V16.334H15.1668C16.4502 16.334 17.5002 15.284 17.5002 14.0007V5.83398H19.6468C20.4868 5.83398 21.2568 6.289 21.6768 7.01233L23.6718 10.5007H22.1668C21.5252 10.5007 21.0002 11.0257 21.0002 11.6673V15.1673C21.0002 15.809 21.5252 16.334 22.1668 16.334H25.6668Z"
              fill="#1DA1F3"
            />
            <path
              d="M9.33333 25.6667C10.622 25.6667 11.6667 24.622 11.6667 23.3333C11.6667 22.0447 10.622 21 9.33333 21C8.04467 21 7 22.0447 7 23.3333C7 24.622 8.04467 25.6667 9.33333 25.6667Z"
              fill="#1DA1F3"
            />
            <path
              d="M18.6668 25.6667C19.9555 25.6667 21.0002 24.622 21.0002 23.3333C21.0002 22.0447 19.9555 21 18.6668 21C17.3782 21 16.3335 22.0447 16.3335 23.3333C16.3335 24.622 17.3782 25.6667 18.6668 25.6667Z"
              fill="#1DA1F3"
            />
            <path
              d="M25.6667 14.6184V16.3333H22.1667C21.525 16.3333 21 15.8083 21 15.1667V11.6667C21 11.025 21.525 10.5 22.1667 10.5H23.6717L25.3633 13.4633C25.5617 13.8133 25.6667 14.21 25.6667 14.6184Z"
              fill="#1DA1F3"
            />
          </svg>
        </span>
        {total >= freeShippingPrice ? (
          <p className="font-medium text-[14px] text-[#616A76]">سفارش شما رایگان شد.🤩</p>
        ) : (
          <p className="flex items-center gap-1 font-medium text-[14px] text-[#616A76]">
            <span className="flex items-center gap-[4px]">
              {Number(freeShippingPrice - total).toLocaleString()}
              <span>تومان</span>
            </span>
            <span>مانده تا ارسال رایگان !</span>
          </p>
        )}
      </div>
      <Progress
        classNames={{
          indicator: 'bg-[#1DA1F3]',
          base: 'bg-[#CCD0D5] bg-opacity-200 rounded-full mt-4 transform scale-x-[-1]', // معکوس کردن جهت پیشرفت
        }}
        value={Math.ceil(percentage)}
      />
    </div>
  );
};

export default ProgressBarCheckSendFree;
