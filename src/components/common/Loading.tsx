import React from 'react';
import Logo from '@/../public/icons/logo.svg';
import Image from 'next/image';
const Loading = ({ showShadow = true }: { showShadow?: boolean }) => {
  return (
    <>
      <div className="shadow-loading fixed left-1/2 top-1/2 !z-[9999] flex h-fit w-[208px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[13px] bg-white py-5">
        <div className="loader"></div>

        <Image width={170} height={170} src={Logo} alt="" className="mt-5" />
      </div>
      {showShadow && (
        <div className="fixed left-1/2 top-0 z-[8888] block h-screen w-full -translate-x-1/2 bg-[#0C0C0C99]"></div>
      )}
    </>
  );
};

export default Loading;
