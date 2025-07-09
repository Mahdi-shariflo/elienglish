// import { request } from '@/lib/safeClient';
import EliMag from '@/components/blog/EliMag';
import Section1 from '@/components/home/Section1';
import Section2 from '@/components/home/Section2';
import Section3 from '@/components/home/Section3';
import Section4 from '@/components/home/Section4';
import React from 'react';

const Page = async () => {
  // const t = await request({ url: '/' });
  return (
    <div className="flex min-h-screen flex-col gap-10 pt-32">
      <Section1 />
      <Section2 />
      <Section3 />
      {/* <Section4  /> */}
      <EliMag delay={3200} title="الی مگ" blogs={[]} />
    </div>
  );
};

export default Page;
