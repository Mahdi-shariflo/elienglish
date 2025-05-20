import React from 'react';

import ReactCountdown from 'react-countdown';

const CountdownDiscounts = ({ timer }: { timer: string }) => {
  const Completionist = () => '';

  const renderer = ({
    minutes,
    seconds,
    hours,
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
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="mx-auto flex !w-fit items-center justify-center gap-0 bg-transparent !p-0 font-medium text-[12px] text-sm !text-[#0C0C0C] transition-all duration-500 hover:!text-main lg:gap-2">
          <div className="flex flex-col items-center justify-center text-white">
            <span className="flex items-center gap-1 lg:gap-3">
              <span className="flex h-[24px] w-[24px] items-center justify-center rounded-lg bg-[#BE1869] text-[10px] lg:h-[40px] lg:w-[40px] lg:text-[14px]">
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
              <span>:</span>
            </span>
            <p className="ml-2 text-center text-[10px] lg:ml-4 lg:text-[12px]">ثانیه</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <span className="flex items-center gap-1 lg:gap-3">
              <span className="flex h-[24px] w-[24px] items-center justify-center rounded-lg bg-[#BE1869] text-[10px] lg:h-[40px] lg:w-[40px] lg:text-[14px]">
                {minutes < 10 ? `0${minutes}` : minutes}
              </span>
              <span>:</span>
            </span>
            <p className="ml-3 text-center text-[10px] lg:text-[12px]">دقیقه</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <span className="flex h-[24px] w-[24px] items-center justify-center rounded-lg bg-[#BE1869] text-[10px] lg:h-[40px] lg:w-[40px] lg:text-[14px]">
              {hours < 10 ? `0${hours}` : hours}
            </span>
            <p className="text-center text-[10px] lg:text-[12px]">ساعت</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-12 items-center justify-center lg:mt-10">
      <ReactCountdown
        date={timer}
        renderer={renderer}
        key={'time'} // Adding key to force re-render on time change
      />
    </div>
  );
};

export default CountdownDiscounts;
