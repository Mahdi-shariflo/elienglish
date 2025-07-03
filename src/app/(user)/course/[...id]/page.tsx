import MediaPreview from '@/components/blog/MediaPreview';
import { request } from '@/lib/safeClient';
import React from 'react';
import MoreInformationCourse from '@/components/course/MoreInformationCourse';
import { discountCalculation } from '@/lib/utils';
import Button from '@/components/common/Button';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CountdownDiscounts from '@/components/CountdownDiscounts';
import Image from 'next/image';
import { Course } from '@/types/home';
import Drop from '@/../public/images/drop.png';
type Props = {
  params: Promise<{ [key: string]: string[] }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const result = await request({ url: `/course/detail/${decodeURIComponent(id[0]!)}` });
  const course: Course = result?.data?.data?.course;
  return (
    <div className="bg-[#f7f7f7] pb-10 dark:bg-dark">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs
          page="/course/category"
          breadcrumbs={[{ id: '333', title: course.title, url: '#' }]}
        />
        <div className="mt-10 flex flex-col items-start gap-7 lg:flex-row">
          <div className="w-full gap-10 overflow-hidden rounded-lg border border-transparent pb-8 dark:!border-[#263248]">
            <MediaPreview className="!mt-0 border-gray-100 bg-white p-3" media={course} />
            <div className="mt-4 rounded-lg border border-gray-50 bg-white p-4 drop-shadow-sm dark:!border-[#263248] dark:bg-[#172334]">
              <p className="font-bold text-[18px] text-[#172334]">درباره دوره </p>
              <p className="rounded-lg pt-2 font-medium text-[14px] text-[#8E98A8] lg:pt-5">
                در این دوره، هر قسمت یک موضوع کاربردی و روزمره به همراه اسلایدهای گرافیکی، ویدیوهای
                آموزشی، و فایل‌های صوتی مورد بررسی قرار گرفت و به تدریس پرداختیم. ویژگی متمایز این
                دوره، استفاده از بهترین منابع آموزشی و آموزش تکنیک‌هایی برای مکالمه‌ی روان و بدون
                وقفه است. هر جلسه معادل چندین کلاس ترم زبانی بوده و به شما کمک می‌کند به سطحی از
                توانایی برسید که بتوانید به سادگی در مکالمات روزمره از زبان انگلیسی بهره ببرید.
              </p>
            </div>
            <MoreInformationCourse course={course} />
          </div>
          <div className="sticky top-32 w-full space-y-4 overflow-hidden rounded-lg bg-white lg:w-[380px] lg:min-w-[380px]">
            <div className="border border-gray-50 bg-white p-4 drop-shadow-sm dark:!border-[#263248] dark:bg-[#172334]">
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
                      <span className="flex h-[20px] w-[39px] items-center justify-center rounded-full border-2 border-[#FCEDE8] bg-[#F44336] pt-px font-medium text-[10px] text-white lg:static lg:h-[24px] lg:w-[41px] lg:text-[12px]">
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
                {course.discountTime && <CountdownDiscounts timer={course?.discountTime} />}
              </div>
              <Button className="mt-4 bg-main text-white">ثبت‌نام در دوره</Button>
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
                      <span className="font-bold text-[#33435A]">4.5</span>
                      <span className="font-medium text-[#33435A]">از 5</span>
                    </p>
                    <span className="font-medium text-[#6A7890]">امتیاز زبان آموزان</span>
                  </div>
                </div>
                {/* property */}
              </div>
            </div>
            <div className="flex items-center justify-between border border-gray-50 bg-white pl-5 drop-shadow-sm dark:!border-[#263248] dark:bg-[#172334]">
              <Image width={60} src={Drop} alt="" />
              <p className="font-bold text-[20px] text-[#172334]">
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
                <p className="font-medium text-[#33435A]">4.86 از 7 رای</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
