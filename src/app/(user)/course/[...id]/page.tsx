import MediaPreview from '@/components/blog/MediaPreview';
import { request } from '@/lib/safeClient';
import React from 'react';
import MoreInformationCourse from '@/components/course/MoreInformationCourse';
import { discountCalculation } from '@/lib/utils';
import Button from '@/components/common/Button';
import Breadcrumbs from '@/components/common/Breadcrumbs';
type Props = {
  params: Promise<{ [key: string]: string[] }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const result = await request({ url: `/course/detail/${decodeURIComponent(id[0]!)}` });
  const course = result?.data?.data?.course;

  return (
    <div className="pb-10 dark:bg-dark">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs
          page="/course/category"
          breadcrumbs={[{ id: '333', title: course.title, url: '#' }]}
        />
        <div className="mt-10 flex flex-col items-start gap-7 lg:flex-row">
          <div className="w-full gap-10 overflow-hidden rounded-lg border px-3 pb-8 dark:!border-[#263248]">
            <MediaPreview className="!mt-0 dark:!mt-5" media={course} />
            <MoreInformationCourse course={course} />
          </div>
          <div className="sticky top-24 w-full min-w-[380px] overflow-hidden rounded-lg border bg-[#F4F6FA] p-4 drop-shadow-sm dark:!border-[#263248] dark:bg-[#172334] lg:w-[380px]">
            <p className="border-b border-[#E5EAEF] pb-4 font-extrabold text-[22px] text-[#0B1524] dark:!border-[#263248] dark:text-[#8E98A8]">
              {course?.title}
            </p>
            <p className="pt-4 font-regular text-[14px] text-[#33435A] dark:text-[#8E98A8]">
              جلسات آموزش ویدیویی + جزوات تکمیلی + فایل‌های تمرین در هر جلسه
            </p>
            <div className="mt-10">
              {course.discountPrice && (
                <div className="flex items-center justify-between">
                  {Boolean(course.discountPrice) && (
                    <span className="absolute top-5 z-30 flex h-[20px] w-[39px] items-center justify-center rounded-full border-2 border-[#FCEDE8] bg-[#F44336] pt-px font-medium text-[10px] text-white lg:static lg:h-[24px] lg:w-[41px] lg:text-[12px]">
                      {discountCalculation(course.discountPrice, course.price)}%
                    </span>
                  )}
                  <p className="font-regular text-[14px] text-[#8E98A8] line-through">
                    {Number(course?.price).toLocaleString()} تومان
                  </p>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <p className="font-regular text-[14px] text-[#6A7890] dark:text-[#8E98A8]">
                  قیمت دوره
                </p>
                <div className="flex items-center gap-1">
                  <p className="font-extrabold text-[24px] dark:text-white">
                    {course.discountPrice
                      ? Number(course.discountPrice).toLocaleString()
                      : Number(course.price).toLocaleString()}
                  </p>
                  <span className="font-regular text-[#6A7890] dark:text-[#8E98A8]">تومان</span>
                </div>
              </div>
            </div>
            <Button className="mt-4 bg-main text-white">ثبت‌نام در دوره</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
