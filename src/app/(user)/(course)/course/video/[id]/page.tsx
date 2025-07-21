import MediaPreview from '@/components/blog/MediaPreview';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Comments from '@/components/common/Comments';
import Title from '@/components/common/Title';
import { request } from '@/lib/safeClient';
import { Course } from '@/types/home';
import { Accordion, AccordionItem, CircularProgress } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import Chapters from '../Chapters';
import HLSPlayer from '@/components/HLSPlayer';
import VideoPlayer from '@/components/admin/common/VideoPlayer';
type Props = {
  params: Promise<{ [key: string]: string }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const result = await request({ url: `/course/detail/${decodeURIComponent(id)}` });
  const course: Course = result?.data?.data?.course;
  console.log(course, 'kjdf');

  const cleanDescription =
    typeof course?.description === 'string'
      ? course?.description
          ?.replace(/\[caption.*?](.*?)\[\/caption\]/g, '$1') // حذف فقط تگ‌های [caption] و نگه داشتن محتوای داخل آن
          ?.replace(/id="attachment_\d+"/g, '') // حذف idهای attachment
          ?.replace(/align=".*?"/g, '') // حذف ویژگی align
          ?.replace(/width=".*?"/g, '') // حذف ویژگی width
          ?.replace(/height=".*?"/g, '')
      : ''; // حذف ویژگی height
  return (
    <div className="bg-white pb-10 dark:bg-dark lg:bg-[#f7f7f7]">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs
          page="/course/category"
          breadcrumbs={[{ id: '333', title: course.title, url: '#' }]}
        />
        <div className="mt-10 flex items-start">
          <div>
            <div className="!mt-0 border border-gray-100 bg-white p-3 dark:!border-[#263248] dark:bg-[#172334]">
              <div className="flex items-center justify-between py-2">
                <p className="font-extrabold text-[16px] text-[#0B1524] dark:!border-[#263248] dark:text-[#8E98A8]">
                  {course?.title}
                </p>
                <CircularProgress
                  color="success"
                  label=""
                  showValueLabel={true}
                  size="lg"
                  value={70}
                />
              </div>
              <VideoPlayer url="https://elienglish.arvanvod.ir/AqZjy04YNg/eyL1dp1Xdg/h_,144_200,240_400,360_800,480_1500,720_2500,1080_4500,k.mp4.list/master.m3u8" />
            </div>
            <div className="mt-4 rounded-lg border-b border-gray-200 bg-white p-4 dark:!border-[#263248] dark:bg-[#172334] lg:border lg:border-gray-50 lg:drop-shadow-sm">
              <p className="hidden font-bold text-[18px] text-[#172334] dark:text-white lg:block">
                درباره دوره{' '}
              </p>

              <p className="rounded-lg pt-2 text-justify font-medium text-[14px] text-[#8E98A8] lg:pt-5">
                {course.short_des}
              </p>
            </div>
            {course.btnCourse.title ? (
              <div className="mt-4 flex w-full items-center justify-between rounded-lg border-b border-gray-200 bg-white p-4 dark:!border-[#263248] dark:bg-[#172334] lg:border lg:border-gray-50 lg:drop-shadow-sm">
                <div className="flex items-center gap-3">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0014 1.66797C8.907 1.66797 7.82337 1.88352 6.81232 2.30231C5.80128 2.7211 4.88262 3.33492 4.1088 4.10875C2.54599 5.67155 1.66802 7.79116 1.66802 10.0013C1.66073 11.9256 2.32701 13.7917 3.55135 15.2763L1.88469 16.943C1.76906 17.0602 1.69072 17.209 1.65958 17.3706C1.62843 17.5323 1.64587 17.6995 1.70969 17.8513C1.7789 18.0012 1.89111 18.1272 2.03206 18.2133C2.17301 18.2993 2.33635 18.3416 2.50135 18.3346H10.0014C12.2115 18.3346 14.3311 17.4567 15.8939 15.8939C17.4567 14.3311 18.3347 12.2114 18.3347 10.0013C18.3347 7.79116 17.4567 5.67155 15.8939 4.10875C14.3311 2.54594 12.2115 1.66797 10.0014 1.66797ZM10.0014 16.668H4.50969L5.28469 15.893C5.4399 15.7368 5.52701 15.5256 5.52701 15.3055C5.52701 15.0853 5.4399 14.8741 5.28469 14.718C4.19351 13.628 3.514 12.1934 3.36193 10.6586C3.20986 9.12384 3.59464 7.58381 4.45071 6.3009C5.30678 5.018 6.58118 4.0716 8.05678 3.62295C9.53239 3.17429 11.1179 3.25114 12.5432 3.8404C13.9685 4.42965 15.1454 5.49486 15.8734 6.85454C16.6014 8.21422 16.8354 9.78426 16.5356 11.2971C16.2358 12.81 15.4208 14.1722 14.2293 15.1515C13.0378 16.1308 11.5437 16.6668 10.0014 16.668ZM14.168 9.16797H5.83469C5.61367 9.16797 5.40171 9.25577 5.24543 9.41205C5.08915 9.56833 5.00135 9.78029 5.00135 10.0013C5.00135 10.2223 5.08915 10.4343 5.24543 10.5906C5.40171 10.7468 5.61367 10.8346 5.83469 10.8346H14.168C14.389 10.8346 14.601 10.7468 14.7573 10.5906C14.9136 10.4343 15.0014 10.2223 15.0014 10.0013C15.0014 9.78029 14.9136 9.56833 14.7573 9.41205C14.601 9.25577 14.389 9.16797 14.168 9.16797ZM12.5014 12.5013H7.50135C7.28034 12.5013 7.06838 12.5891 6.9121 12.7454C6.75582 12.9017 6.66802 13.1136 6.66802 13.3346C6.66802 13.5556 6.75582 13.7676 6.9121 13.9239C7.06838 14.0802 7.28034 14.168 7.50135 14.168H12.5014C12.7224 14.168 12.9343 14.0802 13.0906 13.9239C13.2469 13.7676 13.3347 13.5556 13.3347 13.3346C13.3347 13.1136 13.2469 12.9017 13.0906 12.7454C12.9343 12.5891 12.7224 12.5013 12.5014 12.5013ZM7.50135 7.5013H12.5014C12.7224 7.5013 12.9343 7.4135 13.0906 7.25722C13.2469 7.10094 13.3347 6.88898 13.3347 6.66797C13.3347 6.44695 13.2469 6.23499 13.0906 6.07871C12.9343 5.92243 12.7224 5.83464 12.5014 5.83464H7.50135C7.28034 5.83464 7.06838 5.92243 6.9121 6.07871C6.75582 6.23499 6.66802 6.44695 6.66802 6.66797C6.66802 6.88898 6.75582 7.10094 6.9121 7.25722C7.06838 7.4135 7.28034 7.5013 7.50135 7.5013Z"
                        fill="#172334"
                      />
                    </svg>
                  </span>
                  <p className="hidden font-bold text-[18px] text-[#172334] dark:text-white lg:block">
                    ثبت دیدگاه
                  </p>
                </div>

                <a className="flex h-[36px] w-[120px] items-center justify-center rounded-lg bg-main font-medium text-white">
                  {course.btnCourse.title}
                </a>
              </div>
            ) : null}

            <div className="mt-4 flex w-full items-center justify-between rounded-lg border-b border-gray-200 bg-white p-4 dark:!border-[#263248] dark:bg-[#172334] lg:border lg:border-gray-50 lg:drop-shadow-sm">
              {cleanDescription && (
                <div>
                  <Title className="!text-[16px]" title="معرفی محصول" />
                  <div className="mt-1">
                    <p
                      dangerouslySetInnerHTML={{ __html: cleanDescription }}
                      className="container_des_category text-justify font-regular text-[12px] leading-9 text-[#616A76] dark:text-[#8E98A8] lg:text-[16px]"
                    ></p>
                  </div>
                </div>
              )}

              <Comments
                commentInfo={{
                  _id: course._id,
                  thumbnailImage: course.thumbnailImage,
                  title: course.title,
                  targetType: 'product',
                }}
              />
            </div>
          </div>
          <div className="min-w-[342px] border border-gray-100 bg-white p-3 dark:!border-[#263248] dark:bg-[#172334] 3xl:min-w-[450px]">
            <p className="font-medium text-[18px]">محتوای دوره</p>
            <Chapters course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
