'use client';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const filterLabels: Record<string, string> = {
  SATURDAY: 'شنبه',
  SUNDAY: 'یک‌شنبه',
  MONDAY: 'دوشنبه',
  TUESDAY: 'سه‌شنبه',
  WEDNESDAY: 'چهارشنبه',
  THURSDAY: 'پنج‌شنبه',
  FRIDAY: 'جمعه',
  RESERVED: 'رزرو شده',
  AVAILABLE: 'قابل رزرو',
};

const SelectedFilterLpa = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const weekday = searchParams.get('weekday');
  const lpaStatus = searchParams.get('lpaStatus');

  const removeFilter = (key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(key);
    router.push(`?${newParams.toString()}`);
  };

  const filters = [
    { key: 'weekday', value: weekday },
    { key: 'lpaStatus', value: lpaStatus },
  ].filter((f) => f.value && filterLabels[f.value]);

  if (filters.length === 0) return null;

  return (
    <div className="-mt-1 hidden flex-wrap gap-2 lg:flex">
      {filters.map(({ key, value }) => (
        <div
          key={key}
          className="flex h-[40px] items-center justify-center gap-2 rounded-lg bg-[#E5EAEF] px-3 text-sm dark:bg-[#172334]"
        >
          <span className="font-regular text-[14px] text-[#505B74] dark:text-[#8E98A8]">
            {filterLabels[value!]}
          </span>
          <button onClick={() => removeFilter(key)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="dark:sticky-[#8E98A8] stroke-[#6A7890]"
            >
              <g clipPath="url(#clip0_9_23837)">
                <path
                  d="M9.9974 18.3327C14.5998 18.3327 18.3307 14.6017 18.3307 9.99935C18.3307 5.39698 14.5998 1.66602 9.9974 1.66602C5.39502 1.66602 1.66406 5.39698 1.66406 9.99935C1.66406 14.6017 5.39502 18.3327 9.9974 18.3327Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 7.5L7.5 12.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 7.5L12.5 12.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_9_23837">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedFilterLpa;
