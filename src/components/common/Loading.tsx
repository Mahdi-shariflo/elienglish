import React from 'react';
import { Spinner } from '@heroui/react';
const Loading = ({ showShadow = true }: { showShadow?: boolean }) => {
  return (
    <>
      <div className="shadow-loading fixed left-1/2 top-1/2 !z-[9999] flex h-fit w-[208px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[13px] bg-white py-5">
        <Spinner
          size="lg"
          label="در حال بارگذاری..."
          classNames={{
            wrapper: '!w-10 !h-10',
            label: 'pt-2 font-meduim text-[12px]',
            circle1: '!border-b-main',
            circle2: '!border-b-main',
          }}
        />
      </div>
      {showShadow && (
        <div className="fixed left-1/2 top-0 z-[8888] block h-screen w-full -translate-x-1/2 bg-[#0C0C0C99]"></div>
      )}
    </>
  );
};

export default Loading;
