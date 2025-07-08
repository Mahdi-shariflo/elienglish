import React from 'react';
import Button from '../common/Button';
import BgHome from '@/../public/images/bg_home.png';
const Section1 = () => {
  return (
    <div className="container_page flex items-center gap-20">
      <div className="space-y-8">
        <div className="flex flex-col gap-14">
          <p className="w-[70%] font-black text-[40px] leading-[6rem]">
            آکادمی الی انگلیش، مسیر اصولی برای یادگیری زبان انگلیسی
          </p>
          <p className="font-medium text-[18px] text-[#6A7890]">
            در الی انگلیش، زبان انگلیسی را به‌صورت اصولی، کاربردی و با تمرکز بر مکالمه واقعی یاد
            می‌گیرید — نه فقط برای یاد گرفتن، بلکه برای استفاده کردن
          </p>
          <div className="flex items-center gap-4">
            <Button className="!h-[48px] !w-[204px] bg-main text-white">تعیین سطح</Button>
            <Button className="!h-[48px] !w-[204px] border border-[#E5EAEF] text-main">
              مشاهده دوره‌ها
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-20">
          <div className="flex h-[144px] w-full flex-col items-center justify-between rounded-xl border p-4">
            <p className="font-extrabold text-[26px] text-black">1,639</p>
            <p className="font-medium text-[14px] text-[#6A7890]">زبان آموز</p>
          </div>
          <div className="flex h-[144px] w-full flex-col items-center justify-between rounded-xl border p-4">
            <p className="font-extrabold text-[26px] text-black">6,64646</p>
            <p className="font-medium text-[14px] text-[#6A7890]">دوره آموزشی</p>
          </div>
          <div className="flex h-[144px] w-full flex-col items-center justify-between rounded-xl border p-4">
            <p className="font-extrabold text-[26px] text-black">۱۲,۷۰۰</p>
            <p className="font-medium text-[14px] text-[#6A7890]">دقیقه آموزش کاربردی</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <img src={BgHome.src} alt="" />
      </div>
    </div>
  );
};

export default Section1;
