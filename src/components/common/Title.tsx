import React from 'react';

const Title = ({ title, className }: { title: string; className?: string }) => {
  return (
    <p
      className={`relative pr-4 font-medium text-[18px] text-[#505B74] after:absolute after:right-0 after:h-full after:w-1 after:rounded-bl-full after:rounded-tl-full after:bg-main dark:text-white lg:text-2xl ${className}`}
    >
      {title}
    </p>
  );
};

export default Title;
