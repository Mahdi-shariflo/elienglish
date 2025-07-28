'use client';
import { Blog } from '@/types';
import { Accordion, AccordionItem } from '@heroui/react';
import React, { useEffect, useState } from 'react';

const Description = ({ blog }: { blog: Blog }) => {
  const [headings, setHeadings] = useState<{ text: string; id: string }[]>([]);

  const cleanDescription = blog?.description
    ?.replace(/\[caption.*?](.*?)\[\/caption\]/g, '$1') // حذف فقط تگ‌های [caption] و نگه داشتن محتوای داخل آن
    ?.replace(/id="attachment_\d+"/g, '') // حذف idهای attachment
    ?.replace(/align=".*?"/g, '') // حذف ویژگی align
    ?.replace(/width=".*?"/g, '') // حذف ویژگی width
    ?.replace(/height=".*?"/g, ''); // حذف ویژگی height

  const handleScroll = (text: string) => {
    const elements: any = document.getElementsByTagName('h2');
    for (let element of elements) {
      if (element.innerText === text) {
        element.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  };

  useEffect(() => {
    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.description, 'text/html');
    const h2Elements = doc.querySelectorAll('h2');

    const h2Headings = Array.from(h2Elements).map((h2) => ({
      text: h2.innerText,
      id: h2.id,
    }));

    setHeadings(h2Headings);
  }, [blog]);
  return (
    <div>
      <div className="my-10">
        {headings.length === 0 ? null : (
          <div className="md:w-[50%]mt-14 mx-auto rounded-lg bg-[#F5F6FA] p-4 dark:bg-[#070118]">
            <Accordion defaultSelectedKeys={['0']}>
              <AccordionItem
                key={'0'}
                indicator={
                  <svg
                    className="rotate-90"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1223_16012)">
                      <path
                        d="M6.85547 12.125H17.1412"
                        stroke="#6A7890"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.9983 0.982422H5.99833C3.158 0.982422 0.855469 3.28496 0.855469 6.12528V18.1253C0.855469 20.9656 3.158 23.2681 5.99833 23.2681H17.9983C20.8386 23.2681 23.1412 20.9656 23.1412 18.1253V6.12528C23.1412 3.28496 20.8386 0.982422 17.9983 0.982422Z"
                        stroke="#6A7890"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1223_16012">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.125)" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                title={
                  <div className="flex items-center gap-2">
                    <span>
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 2.625H13.0059C13.0498 2.63249 13.0921 2.64676 13.1309 2.66895L13.2803 2.75391L13.3506 2.74316C13.3703 2.75742 13.3895 2.77236 13.4072 2.78906L19.3857 8.76758C19.4056 8.78868 19.4241 8.81117 19.4404 8.83496V8.87695L19.4658 8.9541C19.4818 9.00165 19.4931 9.05093 19.5 9.10059V19.125C19.5 19.788 19.2364 20.4237 18.7676 20.8926C18.2987 21.3614 17.663 21.625 17 21.625H7C6.33696 21.625 5.70126 21.3614 5.23242 20.8926C4.76358 20.4237 4.5 19.788 4.5 19.125V5.125C4.5 4.46196 4.76358 3.82626 5.23242 3.35742C5.70126 2.88858 6.33696 2.625 7 2.625ZM7 3.625C6.60217 3.625 6.22076 3.78315 5.93945 4.06445C5.65815 4.34576 5.5 4.72717 5.5 5.125V19.125C5.5 19.5228 5.65815 19.9042 5.93945 20.1855C6.22076 20.4669 6.60218 20.625 7 20.625H17C17.3978 20.625 17.7792 20.4669 18.0605 20.1855C18.3419 19.9042 18.5 19.5228 18.5 19.125V9.625H15C14.337 9.625 13.7013 9.36142 13.2324 8.89258C12.7636 8.42374 12.5 7.78804 12.5 7.125V3.625H7ZM9 16.625H15C15.1326 16.625 15.2597 16.6777 15.3535 16.7715C15.4473 16.8653 15.5 16.9924 15.5 17.125C15.5 17.2576 15.4473 17.3847 15.3535 17.4785C15.2597 17.5723 15.1326 17.625 15 17.625H9C8.86739 17.625 8.74025 17.5723 8.64648 17.4785C8.55272 17.3847 8.5 17.2576 8.5 17.125C8.5 16.9924 8.55272 16.8653 8.64648 16.7715C8.74025 16.6777 8.86739 16.625 9 16.625ZM9 12.625H15C15.1326 12.625 15.2597 12.6777 15.3535 12.7715C15.4473 12.8653 15.5 12.9924 15.5 13.125C15.5 13.2576 15.4473 13.3847 15.3535 13.4785C15.2597 13.5723 15.1326 13.625 15 13.625H9C8.86739 13.625 8.74025 13.5723 8.64648 13.4785C8.55272 13.3847 8.5 13.2576 8.5 13.125C8.5 12.9924 8.55272 12.8653 8.64648 12.7715C8.74025 12.6777 8.86739 12.625 9 12.625ZM9 8.625H10C10.1326 8.625 10.2597 8.67772 10.3535 8.77148C10.4473 8.86525 10.5 8.99239 10.5 9.125C10.5 9.25761 10.4473 9.38475 10.3535 9.47852C10.2597 9.57228 10.1326 9.625 10 9.625H9C8.86739 9.625 8.74025 9.57228 8.64648 9.47852C8.55272 9.38475 8.5 9.25761 8.5 9.125C8.5 8.99239 8.55272 8.86525 8.64648 8.77148C8.74025 8.67772 8.86739 8.625 9 8.625ZM13.5 7.125C13.5 7.52282 13.6581 7.90424 13.9395 8.18555C14.2208 8.46685 14.6022 8.625 15 8.625H17.7969L13.5 4.32812V7.125Z"
                          fill="black"
                          stroke="#0B1524"
                        />
                      </svg>
                    </span>
                    <p className="text-right font-medium text-[14px] text-[#0C0C0C]">فهرست مطالب</p>
                  </div>
                }
              >
                <div className="text-zinc_400 mt-3 flex flex-col gap-3 font-bold text-[14px]">
                  {headings.map((heading, index) => (
                    <button
                      key={index}
                      className="block text-right font-regular text-[#0B1524]"
                      onClick={() => handleScroll(heading.text)}
                    >
                      <span>{index + 1}- </span>
                      {heading.text}
                    </button>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
      <div
        className="container_des_category font-regular text-[16px] leading-8 text-[#33435A] dark:text-[#8E98A8]"
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      ></div>
    </div>
  );
};

export default Description;
