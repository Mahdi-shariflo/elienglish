'use client';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Search = ({ search }: { search: string }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(search || '');

  const handleSearch = () => {
    router.push(`/faq-search?search=${inputValue}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        // @ts-expect-error error
        onKeyDown={handleKeyPress}
        className="mt-4 !w-[90%] lg:!w-[600px]"
        classNameInput={'!bg-white !text-black !h-[52px] !border-none lg:!text-[16px] pl-1'}
        placeholder="جستجو کنید"
        endContent={
          <Button onClick={handleSearch} className="!h-fit w-fit min-w-fit !py-2">
            <span>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M33.9984 32.9984L29.6484 28.6484"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Button>
        }
        isClear
      />
    </>
  );
};

export default Search;
