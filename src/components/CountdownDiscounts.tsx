'use client';
import React from 'react';

import ReactCountdown from 'react-countdown';

const CountdownDiscounts = ({ timer, className }: { timer: string; className?: string }) => {
  const renderer = ({
    minutes,
    seconds,
    hours,
    days,
    completed,
  }: {
    minutes: number;
    hours: number;
    days: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <div className="mx-auto flex !w-fit items-center justify-center gap-0 bg-transparent !p-0 font-medium text-[12px] text-sm !text-[#0C0C0C] transition-all duration-500 hover:!text-main lg:gap-2">
          <div className="flex flex-col items-center justify-center pl-1 text-main lg:pl-0">
            <span className="flex items-center gap-2 lg:gap-2">
              <span className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-[#E0D7FB] text-[14px] lg:h-[40px] lg:w-[40px]">
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
              <span>:</span>
            </span>
            <p className="ml-2 mt-1 text-center text-[10px] lg:ml-4 lg:text-[12px]">ثانیه</p>
          </div>
          <div className="flex flex-col items-center justify-center pl-1 text-main lg:pl-0">
            <span className="flex items-center gap-1 lg:gap-2">
              <span className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-[#E0D7FB] text-[14px] lg:h-[40px] lg:w-[40px]">
                {minutes < 10 ? `0${minutes}` : minutes}
              </span>
              <span>:</span>
            </span>
            <p className="ml-3 mt-1 text-center text-[12px]">دقیقه</p>
          </div>
          <div className="flex flex-col items-center justify-center pl-1 text-main lg:pl-0">
            <span className="flex items-center gap-1 lg:gap-2">
              <span className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-[#E0D7FB] text-[14px] lg:h-[40px] lg:w-[40px]">
                {hours < 10 ? `0${hours}` : hours}
              </span>
              <span>:</span>
            </span>
            <p className="ml-3 mt-1 text-center text-[12px]">دقیقه</p>
          </div>

          <div className="flex flex-col items-center justify-center text-main">
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-[#E0D7FB] text-[14px] lg:h-[40px] lg:w-[40px]">
              {days < 10 ? `0${days}` : days}
            </span>
            <p className="mt-1 text-center text-[12px]">روز</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={`mt-14 flex h-12 flex-col items-center justify-center gap-5 lg:mt-10 lg:gap-0 ${className}`}
    >
      <p className="text-center font-demibold text-[18px] text-[#505B74] dark:text-[#8E98A8] lg:hidden lg:text-[14px]">
        تا پایان تخفیف
      </p>
      <ReactCountdown
        date={timer}
        renderer={renderer}
        key={'time'} // Adding key to force re-render on time change
      />
    </div>
  );
};

export default CountdownDiscounts;
