import Breadcrumbs from '@/components/common/Breadcrumbs';
import { request } from '@/lib/safeClient';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'شرایط و قوانین',
  description: 'شرایط و قوانین',
};

const Page = async () => {
  const data = await request({ url: `/setting/site-rules` });
  const siteRules = data?.data?.data;
  return (
    <div className="container_page min-h-[60vh]">
      <Breadcrumbs breadcrumbs={[{ id: '1', title: 'صفحه شرایط و قوانین', url: '#' }]} />
      <div
        className="container_des_category mt-10 rounded-xl border bg-white p-8 text-justify font-medium leading-10 shadow-lg lg:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: siteRules }}
      ></div>
    </div>
  );
};

export default Page;
