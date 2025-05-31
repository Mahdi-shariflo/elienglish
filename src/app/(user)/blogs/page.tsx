import Breadcrumbs from '@/components/common/Breadcrumbs';
import React from 'react';
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const searchParamsFilter = await searchParams;

  return (
    <div>
      <Breadcrumbs breadcrumbs={[]} />
      <div className="flex items-start gap-10">
        {/* <Filters searchParams={searchParamsFilter} resultFilter={{
          breadcrumb:[],
          title:"دسته بندی بلاگ‌ها"

        }} /> */}
      </div>
    </div>
  );
};

export default Page;
