'use client';
import React from 'react';
import Button from '../common/Button';
import BgHome from '@/../public/images/bg_home.png';
import { useRouter } from 'next/navigation';
import { BASEURL } from '@/lib/variable';
import Link from 'next/link';
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
    <div className="container_page flex items-center gap-20">
      <div className="space-y-8">
        <div className="flex flex-col gap-14">
          <p className="w-[70%] font-black text-[40px] leading-[6rem]">
            <span className="font-black text-[40px] leading-[6rem] text-main">
              {section.colorTitle}
            </span>{' '}
            {section.title}
          </p>
          <p className="font-medium text-[18px] text-[#6A7890]">{section.description}</p>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push(section.activeBtn.href)}
              className="!h-[48px] !w-[204px] bg-main text-white"
            >
              {section?.activeBtn?.title}
            </Button>
            <Button
              onClick={() => router.push(section.btn.href)}
              className="!h-[48px] !w-[204px] border border-[#E5EAEF] text-main"
            >
              {section.btn.title}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-20">
          {section?.card?.map((item, idx) => (
            <div
              key={idx}
              className="flex h-[144px] w-full flex-col items-center justify-between rounded-xl border p-4"
            >
              <p className="font-extrabold text-[26px] text-black">{item.count}</p>
              <p className="font-medium text-[14px] text-[#6A7890]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Link href={section.picture.href} className="flex justify-end">
        <img src={`${BASEURL}/${section.picture.url}`} alt="" />
      </Link>
    </div>
  );
};

export default Section1;
