import Image from 'next/image';
import React from 'react';
import Profile from '@/../public/images/profile.jpg';
const OurTeam = () => {
  return (
    <div className="mt-20 bg-[#F4F6FA] p-3 py-10 dark:bg-[#172334] lg:mt-40">
      <div>
        <p className="text-center font-demibold text-[36px] text-main">تیم ما</p>
        <span className="block text-center font-medium text-[18px] text-[#505B74]">
          با تیم الی اینگلیش بیشتر آشنا شوید
        </span>
      </div>
      <div className="container_page mt-14 grid grid-cols-2 items-center justify-between gap-5 lg:flex">
        <Image
          className="h-[150px] w-[150px] rounded-full lg:h-[200px] lg:w-[200px]"
          src={Profile}
          alt=""
        />
        <Image
          className="h-[150px] w-[150px] rounded-full lg:h-[200px] lg:w-[200px]"
          src={Profile}
          alt=""
        />
        <Image
          className="h-[150px] w-[150px] rounded-full lg:h-[200px] lg:w-[200px]"
          src={Profile}
          alt=""
        />
        <Image
          className="h-[150px] w-[150px] rounded-full lg:h-[200px] lg:w-[200px]"
          src={Profile}
          alt=""
        />
      </div>
    </div>
  );
};

export default OurTeam;
