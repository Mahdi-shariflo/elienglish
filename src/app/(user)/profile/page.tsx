import BackPrevPage from '@/components/common/BackPrevPage';
import Notfications from '@/components/profile/Notfications';
import RingkasanOrder from '@/components/profile/RingkasanOrder';
import Sidebar from '@/components/profile/Sidebar';
import React from 'react';

const Page = () => {
  return (
    <div className="max-w-full !overflow-hidden lg:pb-10 lg:pt-5">
      <BackPrevPage url="/" title="صفحه اصلی" />
      <div className="mt-4 max-w-full lg:mt-0 lg:hidden">
        {/* <ProfileInformation /> */}
        <RingkasanOrder className="lg:hidden" />
        <Sidebar />
      </div>
      <RingkasanOrder className="hidden lg:block" />
      <Notfications />
      {/* <LastViewProducts/> */}
    </div>
  );
};

export default Page;
