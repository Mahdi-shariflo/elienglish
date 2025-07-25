import BackPrevPage from '@/components/common/BackPrevPage';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 dark:border-[#505B74] dark:bg-[#263248] lg:mb-10 lg:min-h-[90vh] lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile" title="تیکت به پشتیبانی" />

      <div>
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3 border-gray-100">
            <span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 20C28 20.7072 27.719 21.3855 27.219 21.8856C26.7189 22.3857 26.0406 22.6667 25.3333 22.6667H9.33333L4 28V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V20Z"
                  stroke="#6E3DFF"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p className="hidden font-medium text-[14px] text-[#0C0C0C] dark:text-white lg:block lg:!w-full lg:text-[18px]">
              تیکت به پشتیبانی
            </p>
          </div>
          <Link
            href={'/profile/tickets/new'}
            className="flex h-[42px] items-center gap-1 rounded-lg border border-[#E4E7E9] px-2 font-regular text-[14px] text-main lg:w-fit"
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="#6E3DFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18V6"
                  stroke="#6E3DFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            تیکت جدید
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
