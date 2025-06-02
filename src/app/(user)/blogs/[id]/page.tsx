import Comments from '@/components/blog/Comments';
import DownloadFiles from '@/components/blog/DownloadFiles';
import InfoBlog from '@/components/blog/InfoBlog';
import MediaPreview from '@/components/blog/MediaPreview';
import ShareAndCopy from '@/components/blog/ShareAndCopy';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { title: 'آموزش زبان انگلیسی با کتاب داستان', id: '1', url: '#' },
          {
            title:
              'آموزش انگلیسی با کتاب داستانOxford Bookworms: تحلیل کتاب Drive into Danger فصل دوم',
            id: '1',
            url: '#',
          },
        ]}
      />
      <div className="mt-8 flex items-start">
        <div className="w-full gap-10 rounded-lg border border-[#F4F6FA] p-[24px]">
          <p className="font-medium text-main">دیکشنری الی انگلیش</p>
          <MediaPreview />
          {/* title */}
          <InfoBlog />
          <DownloadFiles />
          <ShareAndCopy />
          <Comments />
        </div>
        <div className="min-w-[380px]"></div>
      </div>
    </div>
  );
};

export default Page;
