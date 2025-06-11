import React from 'react';

const Title = ({ title }: { title: string }) => {
  return (
    <p className="relative pr-4 font-extrabold text-[14px] after:absolute after:right-0 after:h-full after:w-1 after:rounded-bl-full after:rounded-tl-full after:bg-main dark:text-white lg:text-2xl">
      {title}
    </p>
  );
};

export default Title;
