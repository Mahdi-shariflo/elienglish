'use client';
import React, { useRef, useState } from 'react';
import { Accordion, AccordionItem } from '@heroui/react';
import { Course } from '@/types/home';
import Title from '../common/Title';
import Comments from '../common/Comments';
import Button from '../common/Button';
import Link from 'next/link';

const MoreInformationCourse = ({ course }: { course: Course }) => {
  const [select, setSelect] = useState(0);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement> | null, index: number) => {
    if (ref?.current) {
      setSelect(index);
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cleanDescription =
    typeof course?.description === 'string'
      ? course?.description
          ?.replace(/\[caption.*?](.*?)\[\/caption\]/g, '$1') // حذف فقط تگ‌های [caption] و نگه داشتن محتوای داخل آن
          ?.replace(/id="attachment_\d+"/g, '') // حذف idهای attachment
          ?.replace(/align=".*?"/g, '') // حذف ویژگی align
          ?.replace(/width=".*?"/g, '') // حذف ویژگی width
          ?.replace(/height=".*?"/g, '')
      : ''; // حذف ویژگی height

  const tabItems = [
    {
      name: 'معرفی',
      ref: descriptionRef,
      show: !!cleanDescription,
    },
    {
      name: 'دموی رایگان',
      ref: demoRef,
      show: Array.isArray(course?.demo) && course.demo.length > 0,
    },
    {
      name: 'برنامه آموزشی',
      ref: chaptersRef,
      show: Array.isArray(course?.chapters) && course.chapters.length > 0,
    },
    {
      name: 'سوالات متداول',
      ref: faqRef,
      // @ts-expect-error errro
      show: Array.isArray(course?.faqs) && course.faqs.length > 0, // اگر دارید
    },
    {
      name: 'دیدگاه ‌ها',
      ref: commentsRef,
      show: true, // اگر دارید
    },
  ];

  const visibleTabs = tabItems.filter((tab) => tab.show);
  return (
    <div className="mt-10 rounded-lg border-t border-gray-200 bg-white p-3 dark:bg-[#172334] lg:mt-4 lg:border-none">
      <div className="flex items-center gap-8 border-b border-[#E5EAEF] dark:border-[#263248]">
        {visibleTabs.map((tab, idx) => (
          <Button
            key={idx}
            onClick={() => {
              switch (idx) {
                case 0:
                  // @ts-expect-error error
                  scrollToRef(descriptionRef, idx);
                  break;
                case 1:
                  // @ts-expect-error error
                  scrollToRef(demoRef, idx);
                  break;
                case 2:
                  // @ts-expect-error error
                  scrollToRef(chaptersRef, idx);
                  break;
                case 3:
                  // @ts-expect-error error
                  scrollToRef(faqRef, idx);
                  break;
                case 4:
                  // @ts-expect-error error
                  scrollToRef(commentsRef, idx);
                  break;
              }
            }}
            className={`!h-[40px] !w-fit !min-w-fit !rounded-none border-b font-bold text-[14px] lg:text-[16px] ${select === idx ? 'border-main text-main' : 'border-transparent text-[#172334] dark:text-[#8E98A8]'}`}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-6 lg:gap-8">
        {/* description */}
        {cleanDescription && (
          <div ref={descriptionRef}>
            <Title className="!text-[16px]" title="معرفی محصول" />
            <div className="mt-1">
              <p
                dangerouslySetInnerHTML={{ __html: cleanDescription }}
                className="container_des_category text-justify font-regular text-[12px] leading-9 text-[#616A76] dark:text-[#8E98A8] lg:text-[16px]"
              ></p>
            </div>
          </div>
        )}
        {Array.isArray(course?.demo) && course.demo.length > 0 && (
          <>
            {/* demo */}
            <div ref={demoRef}>
              <Title className="!text-[16px]" title="دموی رایگان" />
              <Accordion
                defaultExpandedKeys={['0', '1', '2', '3', '4']}
                className="mt-5 lg:!mt-10"
                itemClasses={{ base: '!mt-2 lg:!mt-5' }}
              >
                {course.demo.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    indicator={({ isOpen }) => (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${isOpen ? '!-rotate-90' : '!rotate-0'}`}
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6E3DFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                    classNames={{
                      heading:
                        'drop_shadow_faq border dark:border-[#263248] border-gray-100 !rounded-lg !px-2',
                    }}
                    title={
                      <p className="font-medium text-[14px] dark:text-[#8E98A8] lg:text-[16px]">
                        <span className="text-[14px] text-main lg:text-[16px]">
                          {item?.order}.{' '}
                        </span>
                        {item?.title}
                      </p>
                    }
                  >
                    <div className="mt-2 space-y-6">
                      {item?.episodes?.map((item, idx) => {
                        return (
                          <div className="flex items-center justify-between" key={idx}>
                            <div className="flex items-center gap-2">
                              <span>
                                {item.type === 'video' ? (
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clip-path="url(#clip0_9_30619)">
                                      <path
                                        d="M23 7L16 12L23 17V7Z"
                                        stroke="#6E3DFF"
                                        stroke-width="2.4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                                        stroke="#6E3DFF"
                                        stroke-width="2.4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_9_30619">
                                        <rect width="24" height="24" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                ) : item.type === 'document' ? (
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8 8C7.73478 8 7.48043 8.10536 7.29289 8.29289C7.10536 8.48043 7 8.73478 7 9C7 9.26522 7.10536 9.51957 7.29289 9.70711C7.48043 9.89464 7.73478 10 8 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9C10 8.73478 9.89464 8.48043 9.70711 8.29289C9.51957 8.10536 9.26522 8 9 8H8ZM13 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4H11V7C11 7.79565 11.3161 8.55871 11.8787 9.12132C12.4413 9.68393 13.2044 10 14 10H17V12C17 12.2652 17.1054 12.5196 17.2929 12.7071C17.4804 12.8946 17.7348 13 18 13C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12V9C19 9 19 9 19 8.94C18.9896 8.84813 18.9695 8.75763 18.94 8.67V8.58C18.8919 8.47718 18.8278 8.38267 18.75 8.3L12.75 2.3C12.6673 2.22222 12.5728 2.15808 12.47 2.11C12.4369 2.10421 12.4031 2.10421 12.37 2.11C12.2728 2.058 12.1683 2.02092 12.06 2H6C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H13C13.2652 22 13.5196 21.8946 13.7071 21.7071C13.8946 21.5196 14 21.2652 14 21C14 20.7348 13.8946 20.4804 13.7071 20.2929C13.5196 20.1054 13.2652 20 13 20ZM13 5.41L15.59 8H14C13.7348 8 13.4804 7.89464 13.2929 7.70711C13.1054 7.51957 13 7.26522 13 7V5.41ZM14 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13C7 13.2652 7.10536 13.5196 7.29289 13.7071C7.48043 13.8946 7.73478 14 8 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12ZM20.71 18.29C20.617 18.1963 20.5064 18.1219 20.3846 18.0711C20.2627 18.0203 20.132 17.9942 20 17.9942C19.868 17.9942 19.7373 18.0203 19.6154 18.0711C19.4936 18.1219 19.383 18.1963 19.29 18.29L19 18.59V16C19 15.7348 18.8946 15.4804 18.7071 15.2929C18.5196 15.1054 18.2652 15 18 15C17.7348 15 17.4804 15.1054 17.2929 15.2929C17.1054 15.4804 17 15.7348 17 16V18.59L16.71 18.29C16.5217 18.1017 16.2663 17.9959 16 17.9959C15.7337 17.9959 15.4783 18.1017 15.29 18.29C15.1017 18.4783 14.9959 18.7337 14.9959 19C14.9959 19.2663 15.1017 19.5217 15.29 19.71L17.29 21.71C17.3851 21.801 17.4972 21.8724 17.62 21.92C17.7397 21.9729 17.8691 22.0002 18 22.0002C18.1309 22.0002 18.2603 21.9729 18.38 21.92C18.5028 21.8724 18.6149 21.801 18.71 21.71L20.71 19.71C20.8037 19.617 20.8781 19.5064 20.9289 19.3846C20.9797 19.2627 21.0058 19.132 21.0058 19C21.0058 18.868 20.9797 18.7373 20.9289 18.6154C20.8781 18.4936 20.8037 18.383 20.71 18.29ZM12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17C13 16.7348 12.8946 16.4804 12.7071 16.2929C12.5196 16.1054 12.2652 16 12 16H8C7.73478 16 7.48043 16.1054 7.29289 16.2929C7.10536 16.4804 7 16.7348 7 17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H12Z"
                                      fill="#6E3DFF"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z"
                                      stroke="#6E3DFF"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M9 18V5L21 3V16"
                                      stroke="#6E3DFF"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z"
                                      stroke="#6E3DFF"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                )}
                              </span>
                              <span className="font-medium text-main">{item.title}</span>
                            </div>
                            {item.type === 'video' ? (
                              <Button className="h-[36px] w-fit min-w-fit !rounded-lg bg-[#EDE8FC] !px-2 !font-medium text-main">
                                مشاهده ویدئو
                              </Button>
                            ) : (
                              <a className="flex h-[36px] w-fit items-center justify-center rounded-lg bg-[#EDE8FC] px-2 !font-medium text-[12px] text-main">
                                دانلود فایل
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </>
        )}

        {Array.isArray(course?.chapters) && course.chapters.length > 0 && (
          <>
            {/* problem */}
            <div ref={chaptersRef}>
              <Title className="!text-[16px]" title="برنامه آموزشی" />
              <Accordion
                defaultExpandedKeys={['0', '1', '2', '3', '4']}
                className="!mt-5 lg:!mt-10"
                itemClasses={{ base: '!mt-2 lg:!mt-5' }}
              >
                {course.chapters.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    indicator={({ isOpen }) => (
                      <div className="!rotate-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`${isOpen ? '!-rotate-90' : '!rotate-0'}`}
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="#6E3DFF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                    classNames={{
                      heading:
                        'drop_shadow_faq border dark:border-[#263248] border-gray-100 !rounded-lg !px-4',
                    }}
                    title={
                      <div className="flex items-center justify-between">
                        <div className="lg:!space-y-4">
                          <p className="font-medium text-[14px] dark:text-[#8E98A8] lg:text-[16px]">
                            <span className="text-[14px] text-main lg:text-[16px]">
                              {item?.order}.{' '}
                            </span>
                            {item?.title}
                          </p>
                          <p className="font-medium text-[12px] text-[#8E98A8]">
                            فصل {item.lessons}
                          </p>
                        </div>
                        <div className="hidden h-[50px] items-center gap-4 rounded-lg !bg-[#E5EAEF] px-4 dark:!bg-gray lg:flex">
                          <div className="flex items-center gap-2">
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.33203 2.33203H12.665C13.0628 2.33203 13.4443 2.49028 13.7256 2.77148C14.0069 3.05279 14.165 3.43421 14.165 3.83203V10.499C14.165 10.8967 14.0068 11.2783 13.7256 11.5596C13.4443 11.8407 13.0627 11.999 12.665 11.999H10.165V14.332H12.665C12.7092 14.332 12.7519 14.3496 12.7832 14.3809C12.8145 14.4121 12.832 14.4548 12.832 14.499C12.8319 14.543 12.8143 14.585 12.7832 14.6162C12.7519 14.6475 12.7092 14.665 12.665 14.665H3.33203C3.28783 14.665 3.24512 14.6475 3.21387 14.6162C3.18289 14.5851 3.16512 14.543 3.16504 14.499C3.16504 14.4549 3.18271 14.4121 3.21387 14.3809C3.24512 14.3496 3.28783 14.332 3.33203 14.332H5.83203V11.999H3.33203C2.93428 11.999 2.55277 11.8408 2.27148 11.5596C1.99026 11.2783 1.83212 10.8967 1.83203 10.499V3.83203C1.83203 3.43421 1.99018 3.05279 2.27148 2.77148C2.51757 2.5254 2.84029 2.37398 3.18359 2.33984L3.33203 2.33203ZM6.16504 14.332H9.83203V11.999H6.16504V14.332ZM2.16504 10.499C2.16513 10.8082 2.28832 11.1046 2.50684 11.3232C2.72563 11.542 3.02261 11.665 3.33203 11.665H12.665C12.9745 11.665 13.2714 11.542 13.4902 11.3232C13.7088 11.1045 13.8319 10.8082 13.832 10.499V9.33203H2.16504V10.499ZM3.33203 2.66504C3.02261 2.66504 2.72563 2.78804 2.50684 3.00684C2.28804 3.22563 2.16504 3.52261 2.16504 3.83203V8.99902H13.832V3.83203C13.832 3.52261 13.709 3.22563 13.4902 3.00684C13.2715 2.78815 12.9744 2.66504 12.665 2.66504H3.33203Z"
                                  fill="#6A7890"
                                  stroke="#6A7890"
                                />
                              </svg>
                            </span>
                            <span className="font-medium">{item.episodes.length} درس</span>
                          </div>
                          <div className="h-7 w-px bg-gray-300" />
                          <div className="flex items-center gap-2">
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.33496 2.33203C8.14465 2.33207 8.94627 2.49191 9.69434 2.80176C10.4425 3.11166 11.1227 3.56604 11.6953 4.13867C12.2678 4.71123 12.7224 5.39064 13.0322 6.13867C13.3421 6.88685 13.501 7.6892 13.501 8.49902C13.5009 9.71856 13.1395 10.9108 12.4619 11.9248C11.7843 12.9389 10.8211 13.7296 9.69434 14.1963C8.56767 14.6629 7.32788 14.7847 6.13184 14.5469C4.93577 14.309 3.83698 13.7216 2.97461 12.8594C2.11226 11.997 1.52412 10.8982 1.28613 9.70215C1.04819 8.50593 1.17095 7.26548 1.6377 6.13867C2.10442 5.01203 2.89426 4.04864 3.9082 3.37109C4.92231 2.69349 6.11531 2.33203 7.33496 2.33203ZM9.56738 3.10938C8.50148 2.66786 7.32784 2.55226 6.19629 2.77734C5.06485 3.00246 4.0257 3.55829 3.20996 4.37402C2.39422 5.18976 1.8384 6.22891 1.61328 7.36035C1.3882 8.49191 1.5038 9.66554 1.94531 10.7314C2.38681 11.7971 3.13466 12.7077 4.09375 13.3486C5.05304 13.9896 6.18124 14.332 7.33496 14.332C8.88194 14.3319 10.3651 13.7169 11.459 12.623C12.5529 11.5292 13.1679 10.046 13.168 8.49902C13.168 7.3453 12.8255 6.2171 12.1846 5.25781C11.5437 4.29872 10.6331 3.55088 9.56738 3.10938ZM7.33496 4.99902C7.37905 4.99911 7.42097 5.01667 7.45215 5.04785C7.48333 5.07903 7.50089 5.12095 7.50098 5.16504V8.49902C7.50089 8.54311 7.48333 8.58503 7.45215 8.61621C7.42097 8.64739 7.37905 8.66495 7.33496 8.66504H5.33496C5.29076 8.66504 5.24805 8.64747 5.2168 8.61621C5.18572 8.58505 5.16805 8.54303 5.16797 8.49902C5.16797 8.45482 5.18554 8.41212 5.2168 8.38086C5.24805 8.3496 5.29076 8.33203 5.33496 8.33203H7.16797V5.16504C7.16805 5.12103 7.18572 5.07902 7.2168 5.04785C7.24805 5.01659 7.29076 4.99902 7.33496 4.99902Z"
                                  fill="#6A7890"
                                  stroke="#6A7890"
                                />
                              </svg>
                            </span>
                            <span className="font-medium">{item.duration} دقیقه</span>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <div className="mt-2 flex flex-col gap-6">
                      {item?.episodes?.map((item, idx) => {
                        return (
                          <div className="flex items-center justify-between" key={idx}>
                            <div className="flex items-center gap-2">
                              <span>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0_83_13724)">
                                    <path
                                      d="M23 7L16 12L23 17V7Z"
                                      stroke="#6E3DFF"
                                      stroke-width="2.4"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                                      stroke="#6E3DFF"
                                      stroke-width="2.4"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_83_13724">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </span>
                              <span className="font-medium text-[16px] text-main">
                                {item.title}
                              </span>
                            </div>
                            <div className="flex h-[50px] items-center gap-4 rounded-lg px-4">
                              <Link
                                className="font-medium text-main underline"
                                href={`/course/video/${course._id}`}
                              >
                                مشاهده
                              </Link>
                              <div className="flex items-center gap-2">
                                <span>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.33203 2.33203H12.665C13.0628 2.33203 13.4443 2.49028 13.7256 2.77148C14.0069 3.05279 14.165 3.43421 14.165 3.83203V10.499C14.165 10.8967 14.0068 11.2783 13.7256 11.5596C13.4443 11.8407 13.0627 11.999 12.665 11.999H10.165V14.332H12.665C12.7092 14.332 12.7519 14.3496 12.7832 14.3809C12.8145 14.4121 12.832 14.4548 12.832 14.499C12.8319 14.543 12.8143 14.585 12.7832 14.6162C12.7519 14.6475 12.7092 14.665 12.665 14.665H3.33203C3.28783 14.665 3.24512 14.6475 3.21387 14.6162C3.18289 14.5851 3.16512 14.543 3.16504 14.499C3.16504 14.4549 3.18271 14.4121 3.21387 14.3809C3.24512 14.3496 3.28783 14.332 3.33203 14.332H5.83203V11.999H3.33203C2.93428 11.999 2.55277 11.8408 2.27148 11.5596C1.99026 11.2783 1.83212 10.8967 1.83203 10.499V3.83203C1.83203 3.43421 1.99018 3.05279 2.27148 2.77148C2.51757 2.5254 2.84029 2.37398 3.18359 2.33984L3.33203 2.33203ZM6.16504 14.332H9.83203V11.999H6.16504V14.332ZM2.16504 10.499C2.16513 10.8082 2.28832 11.1046 2.50684 11.3232C2.72563 11.542 3.02261 11.665 3.33203 11.665H12.665C12.9745 11.665 13.2714 11.542 13.4902 11.3232C13.7088 11.1045 13.8319 10.8082 13.832 10.499V9.33203H2.16504V10.499ZM3.33203 2.66504C3.02261 2.66504 2.72563 2.78804 2.50684 3.00684C2.28804 3.22563 2.16504 3.52261 2.16504 3.83203V8.99902H13.832V3.83203C13.832 3.52261 13.709 3.22563 13.4902 3.00684C13.2715 2.78815 12.9744 2.66504 12.665 2.66504H3.33203Z"
                                      fill="#6A7890"
                                      stroke="#6A7890"
                                    />
                                  </svg>
                                </span>
                                <span className="font-medium">{idx + 1} درس</span>
                              </div>
                              <div className="h-7 w-px bg-gray-300" />
                              <div className="flex items-center gap-2">
                                <span>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.33496 2.33203C8.14465 2.33207 8.94627 2.49191 9.69434 2.80176C10.4425 3.11166 11.1227 3.56604 11.6953 4.13867C12.2678 4.71123 12.7224 5.39064 13.0322 6.13867C13.3421 6.88685 13.501 7.6892 13.501 8.49902C13.5009 9.71856 13.1395 10.9108 12.4619 11.9248C11.7843 12.9389 10.8211 13.7296 9.69434 14.1963C8.56767 14.6629 7.32788 14.7847 6.13184 14.5469C4.93577 14.309 3.83698 13.7216 2.97461 12.8594C2.11226 11.997 1.52412 10.8982 1.28613 9.70215C1.04819 8.50593 1.17095 7.26548 1.6377 6.13867C2.10442 5.01203 2.89426 4.04864 3.9082 3.37109C4.92231 2.69349 6.11531 2.33203 7.33496 2.33203ZM9.56738 3.10938C8.50148 2.66786 7.32784 2.55226 6.19629 2.77734C5.06485 3.00246 4.0257 3.55829 3.20996 4.37402C2.39422 5.18976 1.8384 6.22891 1.61328 7.36035C1.3882 8.49191 1.5038 9.66554 1.94531 10.7314C2.38681 11.7971 3.13466 12.7077 4.09375 13.3486C5.05304 13.9896 6.18124 14.332 7.33496 14.332C8.88194 14.3319 10.3651 13.7169 11.459 12.623C12.5529 11.5292 13.1679 10.046 13.168 8.49902C13.168 7.3453 12.8255 6.2171 12.1846 5.25781C11.5437 4.29872 10.6331 3.55088 9.56738 3.10938ZM7.33496 4.99902C7.37905 4.99911 7.42097 5.01667 7.45215 5.04785C7.48333 5.07903 7.50089 5.12095 7.50098 5.16504V8.49902C7.50089 8.54311 7.48333 8.58503 7.45215 8.61621C7.42097 8.64739 7.37905 8.66495 7.33496 8.66504H5.33496C5.29076 8.66504 5.24805 8.64747 5.2168 8.61621C5.18572 8.58505 5.16805 8.54303 5.16797 8.49902C5.16797 8.45482 5.18554 8.41212 5.2168 8.38086C5.24805 8.3496 5.29076 8.33203 5.33496 8.33203H7.16797V5.16504C7.16805 5.12103 7.18572 5.07902 7.2168 5.04785C7.24805 5.01659 7.29076 4.99902 7.33496 4.99902Z"
                                      fill="#6A7890"
                                      stroke="#6A7890"
                                    />
                                  </svg>
                                </span>
                                <span className="font-medium">{item.duration} دقیقه</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </>
        )}
        {/* comments */}
        <Comments
          ref={commentsRef}
          commentInfo={{
            _id: course._id,
            thumbnailImage: course.thumbnailImage,
            title: course.title,
            targetType: 'product',
          }}
        />
      </div>
    </div>
  );
};

export default MoreInformationCourse;
