import MediaPreview from '@/components/blog/MediaPreview';
import { request } from '@/lib/safeClient';
import React from 'react';
import MoreInformationCourse from '@/components/course/MoreInformationCourse';
import { discountCalculation } from '@/lib/utils';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CountdownDiscounts from '@/components/CountdownDiscounts';
import { Course } from '@/types/home';
import Drop from '@/../public/images/drop.png';
import PropertiesCourse from '@/components/course/PropertiesCourse';
import Counter from '@/components/common/Counter';
import ImageNextjs from 'next/image';
type Props = {
  params: Promise<{ [key: string]: string }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const result = await request({ url: `/course/detail/${decodeURIComponent(id)}` });
  const course: Course = result?.data?.data?.course;
  console.log(course, 'course?.thumbnailImage?.urlcourse?.thumbnailImage?.url');
  return (
    <div className="bg-white pb-10 dark:bg-dark lg:bg-[#f7f7f7]">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs
          page="/course/category"
          breadcrumbs={[{ id: '333', title: course?.title, url: '#' }]}
        />
        <div className="mt-10 flex flex-col items-start gap-7 lg:flex-row">
          <div className="w-full gap-10 overflow-hidden rounded-lg lg:pb-8">
            <MediaPreview
              className="!mt-0 border border-gray-100 bg-white p-3 dark:!border-[#263248] dark:bg-[#172334]"
              media={course}
            />
            <div className="mt-4 flex items-start rounded-lg border-b border-gray-200 bg-white p-4 dark:!border-[#263248] dark:bg-[#172334] lg:border lg:border-gray-50 lg:drop-shadow-sm">
              {/* {course?.thumbnailImage?.url && (
                <Image 
                className='!w-[300px] !h-full'
                alt="" 
                src={`${BASEURL}/${course.thumbnailImage.url}`}
                 />
              )} */}
              <div>
                <p className="hidden font-demibold text-[18px] text-[#172334] dark:text-white lg:block">
                  درباره دوره{' '}
                </p>
                <p className="border-b border-[#E5EAEF] pb-4 font-extrabold text-[16px] text-[#0B1524] dark:!border-[#263248] dark:text-[#8E98A8] lg:hidden">
                  {course?.title}
                </p>
                <p className="rounded-lg pt-2 text-justify font-medium text-[15px] leading-8 text-[#8E98A8] lg:pt-3">
                  {course.short_des}
                </p>
              </div>
            </div>
            <div className="lg:hidden">
              {course.discountTime && <CountdownDiscounts timer={course?.discountTime} />}
              <PropertiesCourse course={course} />
            </div>
            <MoreInformationCourse course={course} />
          </div>
          <div className="sticky top-32 w-full overflow-hidden rounded-lg bg-white lg:w-[380px] lg:min-w-[380px]">
            <div className="border border-gray-50 bg-white p-4 drop-shadow-sm dark:!border-[#263248] dark:bg-[#172334]">
              <div className="hidden lg:block">
                <p className="border-b border-[#E5EAEF] pb-4 font-demibold text-[22px] text-[#0B1524] dark:!border-[#263248] dark:text-[#8E98A8]">
                  {course?.title}
                </p>
                <p className="pt-4 font-regular text-[14px] text-[#33435A] dark:text-[#8E98A8]">
                  {course?.shortTitle}
                </p>
              </div>
              <div className="mt-10">
                {course.discountPrice ? (
                  <div className="flex items-center justify-between">
                    {course.discountPrice && (
                      <>
                        <span className="flex h-[20px] w-[39px] items-center justify-center rounded-full border-2 border-[#FCEDE8] bg-[#F44336] pt-px font-medium text-[10px] text-white lg:static lg:h-[24px] lg:w-[41px] lg:text-[12px]">
                          {discountCalculation(course.discountPrice, course.price)}%
                        </span>
                        <p className="font-regular text-[14px] text-[#8E98A8] line-through">
                          {Number(course?.price).toLocaleString()} تومان
                        </p>
                      </>
                    )}
                  </div>
                ) : null}
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-regular text-[14px] text-[#6A7890] dark:text-[#8E98A8]">
                    قیمت دوره
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="font-demibold text-[24px] dark:text-white">
                      {course.discountPrice
                        ? Number(course.discountPrice).toLocaleString()
                        : Number(course.price).toLocaleString()}
                    </p>
                    <span className="font-regular text-[#6A7890] dark:text-[#8E98A8]">تومان</span>
                  </div>
                </div>
                {course.discountTime && (
                  <CountdownDiscounts className="hidden" timer={course?.discountTime} />
                )}
              </div>
              <Counter
                // @ts-expect-error error
                product={course}
                classAddBtn="!mt-4"
                typePayload={'COURSE'}
                typeCounter="course"
              />
              <div>
                {/* rate */}
                <div className="mt-6 flex items-center gap-2 border-b border-[#E5EAEF] pb-4">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4421 2.92422L12.9087 5.85755C13.1087 6.26589 13.6421 6.65755 14.0921 6.73255L16.7504 7.17422C18.4504 7.45755 18.8504 8.69089 17.6254 9.90755L15.5587 11.9742C15.2087 12.3242 15.0171 12.9992 15.1254 13.4826L15.7171 16.0409C16.1837 18.0659 15.1087 18.8492 13.3171 17.7909L10.8254 16.3159C10.3754 16.0492 9.63375 16.0492 9.17541 16.3159L6.68375 17.7909C4.90041 18.8492 3.81708 18.0576 4.28375 16.0409L4.87541 13.4826C4.98375 12.9992 4.79208 12.3242 4.44208 11.9742L2.37541 9.90755C1.15875 8.69089 1.55041 7.45755 3.25041 7.17422L5.90875 6.73255C6.35041 6.65755 6.88375 6.26589 7.08375 5.85755L8.55041 2.92422C9.35041 1.33255 10.6504 1.33255 11.4421 2.92422Z"
                        fill="#6E3DFF"
                        stroke="#6E3DFF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="flex items-center gap-1 font-medium">
                    <p className="flex items-center gap-1">
                      <span className="font-bold text-[#33435A] dark:text-[#8E98A8]">4.5</span>
                      <span className="font-medium text-[#33435A] dark:text-[#8E98A8]">از 5</span>
                    </p>
                    <span className="font-medium text-[#6A7890]">امتیاز زبان آموزان</span>
                  </div>
                </div>
                {/* property */}
                <div className="mt-4 hidden lg:block">
                  <p className="font-regular text-[#8E98A8]">اطلاعات دوره</p>
                  <div className="mt-5 flex flex-col gap-5">
                    {course.properties.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <ImageNextjs width={20} height={20} alt="" src={`${item.iconUrl}`} />
                          <p className="font-regular text-[#33435A] dark:text-[#8E98A8]">
                            {item.property}
                          </p>
                        </div>
                        <p className="font-regular text-[#33435A] dark:text-[#8E98A8]">
                          {item.attribiute}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="hidden items-center justify-between border border-gray-50 bg-white pl-5 drop-shadow-sm dark:!border-[#263248] dark:bg-[#172334] lg:flex">
              <ImageNextjs width={60} src={Drop} alt="" />
              <p className="font-bold text-[20px] text-[#172334] dark:text-[#8E98A8]">
                {course.status === 'complated' ? 'تکمیل ظبط' : 'در حال ظبط'}
              </p>
              <div className="pl flex flex-col items-center justify-center gap-2">
                <div className="flex items-center">
                  {new Array(4).fill(4).map((item, idx) => (
                    <span key={idx}>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4421 2.92422L12.9087 5.85755C13.1087 6.26589 13.6421 6.65755 14.0921 6.73255L16.7504 7.17422C18.4504 7.45755 18.8504 8.69089 17.6254 9.90755L15.5587 11.9742C15.2087 12.3242 15.0171 12.9992 15.1254 13.4826L15.7171 16.0409C16.1837 18.0659 15.1087 18.8492 13.3171 17.7909L10.8254 16.3159C10.3754 16.0492 9.63375 16.0492 9.17541 16.3159L6.68375 17.7909C4.90041 18.8492 3.81708 18.0576 4.28375 16.0409L4.87541 13.4826C4.98375 12.9992 4.79208 12.3242 4.44208 11.9742L2.37541 9.90755C1.15875 8.69089 1.55041 7.45755 3.25041 7.17422L5.90875 6.73255C6.35041 6.65755 6.88375 6.26589 7.08375 5.85755L8.55041 2.92422C9.35041 1.33255 10.6504 1.33255 11.4421 2.92422Z"
                          fill="#6E3DFF"
                          stroke="#6E3DFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  ))}
                </div>
                <p className="font-medium text-[#33435A] dark:text-[#8E98A8]">4.86 از 7 رای</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
