import Breadcrumbs from '@/components/common/Breadcrumbs';
import { request } from '@/lib/safeClient';
import React from 'react';

const Page = async () => {
  const data = await request({ url: `/setting/site-rules` });
  const siteRules = data?.data?.data;
  return (
    <div className="container_page min-h-[60vh]">
      <Breadcrumbs breadcrumbs={[{ id: '1', title: 'صفحه شرایط و قوانین', url: '#' }]} />
      <div
        className="container_des_category mt-10 rounded-lg border p-8 text-justify font-medium leading-10"
        dangerouslySetInnerHTML={{ __html: siteRules }}
      ></div>
    </div>
  );
};

export default Page;
