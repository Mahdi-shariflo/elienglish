import { useSession } from '@/lib/auth/useSession';
import React from 'react';

const levels = [
  { name: 'A1' },
  { name: 'A2' },
  { name: 'B1' },
  { name: 'B2' },
  { name: 'C1' },
  { name: 'C2' },
];

const Progress = () => {
  const session = useSession();
  const active = '';
  const activeIndex = levels.findIndex((level) => level.name === active);

  return (
    <div className="mt-4 flex w-full flex-row-reverse items-center justify-between px-12 lg:px-0">
      {levels.map((item, idx) => {
        const isActive = idx <= activeIndex;
        const isLineActive = idx < activeIndex;

        return (
          <div className="flex w-fit flex-col items-center justify-center" key={idx}>
            <span
              className={`font-medium text-[14px] ${isActive ? 'text-main' : 'text-[#C6B6F7]'}`}
            >
              {item.name}
            </span>
            <span
              className={`relative z-10 block h-3 w-3 rounded-full ${isActive ? 'bg-main' : 'bg-[#C6B6F7]'} ${
                idx !== levels.length - 1
                  ? `after:absolute after:-right-12 after:top-1 after:z-0 after:h-1 after:w-[43px] ${isLineActive ? 'after:bg-main' : 'after:bg-[#C6B6F7]'}`
                  : ''
              } `}
            ></span>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;
