// import { request } from '@/lib/safeClient';
import EliMag from '@/components/blog/EliMag';
import Section1 from '@/components/home/Section1';
import Section2 from '@/components/home/Section2';
import Section3 from '@/components/home/Section3';
import Section4 from '@/components/home/Section4';
import Section6 from '@/components/home/Section6';
import { request } from '@/lib/safeClient';
import React from 'react';

const Page = async () => {
  const data = await request({ url: '/mainpage' });
  const home = data?.data?.data;
  return (
    <div className="!mb-20 flex min-h-screen flex-col gap-10 pt-32">
      <Section1 section={home?.section1} />
      <Section2 section={home?.section2} />
      <Section3 section={home?.section3} />

      <Section4 section={home?.section4} />
      <Section4 section={home?.section5} />
      <Section6 section={home?.section6} />
      {/* <Section4  /> */}
      <EliMag delay={3200} title="الی مگ" blogs={home?.section7?.blog} />

      {home?.description && (
        <div
          className="container_page font-medium text-[16px] leading-9"
          dangerouslySetInnerHTML={{ __html: home?.description }}
        ></div>
      )}
    </div>
  );
};

export default Page;
