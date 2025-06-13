'use client';
import { Blog } from '@/types';
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
            <p className="text-right font-medium text-[14px] text-[#0C0C0C]">
              دسترسی سریع به مطالب
            </p>
            <div className="text-zinc_400 mt-3 flex flex-col gap-3 font-bold text-[14px]">
              {headings.map((heading, index) => (
                <button
                  key={index}
                  className="block text-right font-regular text-main"
                  onClick={() => handleScroll(heading.text)}
                >
                  <span>{index + 1}- </span>
                  {heading.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className="container_des_category font-regular leading-8 text-[#33435A] dark:text-[#8E98A8]"
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      ></div>
    </div>
  );
};

export default Description;
