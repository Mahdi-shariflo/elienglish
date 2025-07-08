// import { request } from '@/lib/safeClient';
import Section1 from '@/components/home/Section1';
import Section2 from '@/components/home/Section2';
import Section3 from '@/components/home/Section3';
import React from 'react';

const Page = async () => {
  // const t = await request({ url: '/' });
  return (
    <div className="flex min-h-screen flex-col gap-10 pt-32">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
};

export default Page;
