import Button from '@/components/common/Button';
import React from 'react';
import AboutImage from '@/../public/images/aboutimage.png';
import Image from 'next/image';
import SliderAboutus from './SliderAboutus';
const info = [
  {
    title: 'محصول',
    count: 27,
  },
  {
    title: 'دوره',
    count: 10,
  },
  {
    title: 'مقاله',
    count: 90,
  },
  {
    title: 'پادکست',
    count: 90,
  },
];
const page = () => {
  return (
    <div className="!mb-32">
      <div className="h-[600px] rounded-br-[225px] bg-main pt-32">
        <div className="container_page flex items-center justify-between">
          <div className="flex-1">
            <p className="font-extrabold text-[28px] text-white"> درباره الی انگلیش</p>
            <p className="mt-10 font-medium text-[16px] leading-10 text-white">
              بله، دوره‌های ما به گونه‌ای طراحی شده‌اند که برای تمامی سطوح زبان‌آموزان مناسب باشند.
              از مبتدیانی که هیچ تجربه‌ای در یادگیری زبان انگلیسی ندارند تا پیشرفته‌هایی که به دنبال
              تقویت مهارت‌های خود هستند، می‌توانند از دوره‌های ما بهره‌مند شوند. ما با ارزیابی سطح
              زبان‌آموزان در ابتدای دوره، برنامه‌های آموزشی متناسب با نیازهای هر فرد را ارائه
              می‌دهیم.
            </p>
            <Button className="mt-10 !h-[40px] w-fit min-w-fit rounded-lg bg-white !px-2 text-main">
              بریم ببینیم داستان چیه
            </Button>
          </div>
          <div className="flex flex-1 justify-end">
            <Image className="h-[418px] w-[418px]" src={AboutImage} alt="" />
          </div>
        </div>
        <div className="container_page flex justify-end gap-4">
          {info.map((item, idx) => (
            <div
              className="flex h-[123px] w-[163px] flex-col items-center justify-center rounded-lg border border-gray-100 bg-white font-bold text-main"
              key={idx}
            >
              <p className="text-[24px]">{item.count}</p>
              <p className="!text-[20px]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container_page mt-44 flex items-center justify-between gap-40">
        <div>
          <p className="font-extrabold text-[28px] text-main">مسیر شروع زبان از اینجاست!</p>
          <p className="pt-10 font-medium text-[16px] leading-9 text-[#505B74]">
            بله، دوره‌های ما به گونه‌ای طراحی شده‌اند که برای تمامی سطوح زبان‌آموزان مناسب باشند. از
            مبتدیانی که هیچ تجربه‌ای در یادگیری زبان انگلیسی ندارند تا پیشرفته‌هایی که به دنبال
            تقویت مهارت‌های خود هستند، می‌توانند از دوره‌های ما بهره‌مند شوند. ما با ارزیابی سطح
            زبان‌آموزان در ابتدای دوره، برنامه‌های آموزشی متناسب با نیازهای هر فرد را ارائه می‌دهیم.
          </p>
        </div>

        <SliderAboutus />
      </div>
    </div>
  );
};

export default page;
