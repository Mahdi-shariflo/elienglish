'use client';
import React, { useEffect, useState } from 'react';

import ReactCountdown from 'react-countdown';
import Button from '@/components/common/Button';
import { useGetCode } from '@/hooks/auth/useGetCode';
import { useSearchParams } from 'next/navigation';

const TIMER_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

const Countdown = () => {
  const [time, setTime] = useState(Date.now() + TIMER_DURATION);
  const { mutate, isPending } = useGetCode();
  const searchParams = useSearchParams();
  const Completionist = () => (
    <Button onClick={handleResend} isPending={isPending} className="text-main">
      ارسال مجدد
    </Button>
  );

  const handleResend = () => {
    const mobile = searchParams.get('mobile');
    if (mobile) {
      mutate({ mobile });
      // Set a new timer value using the TIMER_DURATION
      setTime(Date.now() + TIMER_DURATION);
    }
  };

  useEffect(() => {
    if (isPending) {
      setTime(Date.now() + TIMER_DURATION);
    }
  }, [isPending]);

  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="mx-auto flex !w-fit items-center justify-start gap-1 bg-transparent !p-0 font-medium text-[12px] text-sm text-[#263248] transition-all duration-500 hover:!text-main dark:text-[#8E98A8]">
          <span>دریافت کد مجدد</span>
          <span>
            ( {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds})
          </span>
        </div>
      );
    }
  };

  return (
    <div className="ml-auto flex w-fit items-start justify-start lg:mt-[24px]">
      <ReactCountdown
        date={time}
        renderer={renderer}
        key={time} // Adding key to force re-render on time change
      />
    </div>
  );
};

export default Countdown;
