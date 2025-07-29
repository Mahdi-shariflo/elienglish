'use client';
import { Course } from '@/store/types/home';
import { Accordion, AccordionItem } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Chapters = ({ course, isLink }: { course: Course; isLink?: boolean }) => {
  const router = useRouter();
  return (
    <>
      {Array.isArray(course?.chapters) && course.chapters.length > 0 && (
        <>
          {/* problem */}
          <div>
            <Accordion
              defaultExpandedKeys={['0', '1', '2', '3', '4']}
              className="!mt-5 lg:!mt-2"
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
                    <p className="font-medium text-[14px] dark:text-[#8E98A8] lg:text-[16px]">
                      {item?.title}
                    </p>
                  }
                >
                  <div className="mt-2 flex flex-col gap-6">
                    {item?.episodes?.map((item, idx) => {
                      return (
                        <div
                          onClick={() =>
                            isLink
                              ? router.push(`/course/video/${course.url}?video=${item.video}`)
                              : undefined
                          }
                          className="flex cursor-pointer items-center justify-between"
                          key={idx}
                        >
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
                            <span className="font-medium text-[16px] text-main">{item.title}</span>
                          </div>
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
                      );
                    })}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </>
      )}
    </>
  );
};

export default Chapters;
