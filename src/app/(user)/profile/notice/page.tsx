'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
// import CardNotice from '@/components/profile/CardNotice';
import useGlobalStore from '@/store/global-store';
import React, { useEffect } from 'react';

const Page = () => {
  const { setComingSoon } = useGlobalStore();
  useEffect(() => {
    setComingSoon(true);
  }, []);
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] pt-4 lg:mb-10 lg:mt-5 lg:!w-full lg:border lg:bg-white lg:p-[16px] lg:pt-0">
      <BackPrevPage title="اطلاعیه" />
      <p className="hidden font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        اطلاعیه
      </p>
      {/* <div className='container_page lg:!w-full'>
                <CardNotice />
            </div> */}
    </div>
  );
};

export default Page;
