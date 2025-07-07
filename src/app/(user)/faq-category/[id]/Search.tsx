'use client';
import Input from '@/components/common/form/Input';
import { useRouter } from 'next/navigation';
import React from 'react';

const Search = ({ search }: { search: string }) => {
  const router = useRouter();
  return (
    <>
      <Input
        value={search}
        onChange={(e) => router.push(`/faq?search=${e.target.value}`)}
        className="mt-4 !w-[600px]"
        classNameInput={'!bg-white pl-2'}
        placeholder="جستجو کنید"
        endContent={
          <svg
            width="50"
            height="48"
            viewBox="0 0 50 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="50" height="48" rx="8" fill="#6E3DFF" />
            <path
              d="M24 31C28.4183 31 32 27.4183 32 23C32 18.5817 28.4183 15 24 15C19.5817 15 16 18.5817 16 23C16 27.4183 19.5817 31 24 31Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M33.9984 32.9984L29.6484 28.6484"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
        isClear
      />
    </>
  );
};

export default Search;
