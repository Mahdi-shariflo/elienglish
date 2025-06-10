import Comments from '@/components/blog/Comments';
import DownloadFiles from '@/components/blog/DownloadFiles';
import InfoBlog from '@/components/blog/InfoBlog';
import MediaPreview from '@/components/blog/MediaPreview';
import ShareAndCopy from '@/components/blog/ShareAndCopy';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { request } from '@/lib/safeClient';
import React from 'react';
type Props = {
  params: Promise<{ [key: string]: string | undefined }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const result = await request({ url: `/blog/detail/${id}` });
  const blog = result?.data?.data?.blog;
  return (
    <div className="container_page pt-32">
      <Breadcrumbs breadcrumbs={blog?.breadcrumbPath} />
      <div className="mt-8 flex items-start">
        <div className="w-full gap-10 rounded-lg border border-[#F4F6FA] p-[24px]">
          <p className="font-medium text-main">دیکشنری الی انگلیش</p>
          <MediaPreview blog={blog} />
          {/* title */}
          <InfoBlog blog={blog} />
          <DownloadFiles blog={blog} />
          <ShareAndCopy />
          <Comments blog={blog} />
        </div>
        <div className="min-w-[380px]"></div>
      </div>
    </div>
  );
};

export default Page;
