import React from 'react';
import Image from '../common/Image';
import Link from 'next/link';
const RecommendSection = () => {
  return (
    <Link href={'/'} className="block rounded-lg bg-[#F4F6FA] p-4 dark:bg-[#172334]">
      <Image
        alt=""
        src={'upload/2025/06/1749571855689.jpg'}
        className="h-[319px] overflow-hidden rounded-xl lg:h-[360px]"
        classImg="object-fill"
      />
      <p className="mt-4 font-medium text-[#33435A] dark:text-[#8E98A8]">
        دوره آموزش زمان ها و مکالمه های کاربردی در انگلیسی
      </p>
    </Link>
  );
};

export default RecommendSection;
