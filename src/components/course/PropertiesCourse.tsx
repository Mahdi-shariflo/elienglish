'use client';
import { Course } from '@/store/types/home';
import Image from 'next/image';
import React, { useState } from 'react';

const PropertiesCourse = ({ course }: { course: Course }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedProperties = showAll ? course.properties : course.properties.slice(0, 2);

  return (
    <div className="mt-16 border-t border-gray-200">
      <div className="mt-5 grid grid-cols-2 gap-5">
        {displayedProperties.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 rounded-lg border p-2">
            <Image width={35} height={35} alt="" src={`${item.iconUrl}`} />
            <div className="flex flex-col items-center gap-1">
              <p className="font-bold text-[#33435A]">{item.property}</p>
              <p className="font-regular text-[#33435A]">{item.attribiute}</p>
            </div>
          </div>
        ))}
      </div>

      {course.properties.length > 2 && (
        <button
          className="mx-auto mt-8 flex items-center justify-center font-medium text-[14px] text-[#33435A]"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'بستن' : 'نمایش بیشتر'}
        </button>
      )}
    </div>
  );
};

export default PropertiesCourse;
