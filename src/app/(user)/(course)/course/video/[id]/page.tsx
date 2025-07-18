import MediaPreview from '@/components/blog/MediaPreview';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { request } from '@/lib/safeClient';
import { Course } from '@/types/home';
import React from 'react';
type Props = {
  params: Promise<{ [key: string]: string }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const result = await request({ url: `/course/detail/${decodeURIComponent(id)}` });
  const course: Course = result?.data?.data?.course;
  return (
    <div className="bg-white pb-10 dark:bg-dark lg:bg-[#f7f7f7]">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs
          page="/course/category"
          breadcrumbs={[{ id: '333', title: course.title, url: '#' }]}
        />
        <MediaPreview
          className="!mt-0 border border-gray-100 bg-white p-3 dark:!border-[#263248] dark:bg-[#172334]"
          media={course}
        />
      </div>
    </div>
  );
};

export default Page;
