'use client';
import React from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import { BASEURL } from '@/lib/variable';
import Link from 'next/link';
import AnimatedCounter from '../common/AnimatedCounter';
import { removeNumNumeric } from '@/lib/fun';
type Props = {
  section: {
    colorTitle: string;
    title: string;
    description: string;
    picture: {
      url: string;
      href: string;
    };
    activeBtn: {
      title: string;
      href: string;
    };
    btn: {
      title: string;
      href: string;
    };
    card: { count: string; title: string }[];
  };
};
const Section1 = ({ section }: Props) => {
  const router = useRouter();
  return (
    <div className="container_page flex flex-col items-center gap-7 lg:flex-row lg:justify-between lg:gap-20">
      <div className="lg:space-y-8">
        <div className="flex flex-col gap-4 lg:gap-14">
          <p className="font-black text-[20px] leading-[3rem] lg:w-[70%] lg:text-[40px] lg:leading-[6rem]">
            <span className="font-black text-[20px] leading-[3rem] text-main lg:text-[40px] lg:leading-[6rem]">
              {section.colorTitle}
            </span>{' '}
            {section.title}
          </p>
          <p className="font-medium text-[14px] text-[#6A7890] lg:text-[18px]">
            {section.description}
          </p>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push(section.activeBtn.href)}
              className="!h-[48px] w-full bg-main text-white lg:!w-[204px]"
            >
              {section?.activeBtn?.title}
            </Button>
            <Button
              onClick={() => router.push(section.btn.href)}
              className="!h-[48px] w-full border border-[#E5EAEF] text-main lg:!w-[204px]"
            >
              {section.btn.title}
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 lg:mt-0 lg:gap-20">
          {section?.card?.map((item, idx) => (
            <div
              key={idx}
              className="flex h-[90px] w-full flex-col items-center justify-between rounded-xl border p-4 lg:h-[144px]"
            >
              <AnimatedCounter target={Number(removeNumNumeric(item.count))} duration={2500} />
              {/* <p className="font-extrabold text-[18px] text-black lg:text-[26px]">{item.count}</p> */}
              <p className="text-center font-medium text-[12px] text-[#6A7890] lg:text-[14px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Link href={section.picture.href} className="flex justify-end lg:h-[550px] lg:w-[573px]">
        <img className="h-full w-full" src={`${BASEURL}/${section.picture.url}`} alt="" />
      </Link>
    </div>
  );
};

export default Section1;
