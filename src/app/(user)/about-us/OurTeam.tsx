import Image from 'next/image';
import React from 'react';
import Profile from '@/../public/images/profile.jpg';
const OurTeam = () => {
  return (
    <div className="mt-40 bg-[#F4F6FA] p-3 py-10">
      <div>
        <p className="text-center font-bold text-[36px] text-main">تیم ما</p>
        <span className="block text-center font-medium text-[18px] text-[#505B74]">
          با تیم الی اینگلیش بیشتر آشنا شوید
        </span>
      </div>
      <div className="container_page mt-10 flex items-center justify-between">
        <Image className="h-[200px] w-[200px] rounded-full" src={Profile} alt="" />
        <Image className="h-[200px] w-[200px] rounded-full" src={Profile} alt="" />
        <Image className="h-[200px] w-[200px] rounded-full" src={Profile} alt="" />
        <Image className="h-[200px] w-[200px] rounded-full" src={Profile} alt="" />
      </div>
    </div>
  );
};

export default OurTeam;
