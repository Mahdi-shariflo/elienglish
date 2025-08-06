'use client';
import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Input, Spinner } from '@heroui/react';
import { SearchIcon } from '../icon';
import Image from 'next/image';
import { useSerach } from '@/hooks/serach/useSearch';
import { Product } from '@/store/types/home';
import { BASEURL } from '@/lib/variable';
import { useRouter } from 'next/navigation';
import Loading from '../Loading';
import Button from '../Button';
import { useMedia } from 'react-use';
import { CgClose } from 'react-icons/cg';

type Serach = {
  brands: {
    url: string;
    title: string;
    _id: string;
  }[];
  searchresult: { title: string; _id: string }[];
  popularSearches: { title: string; _id: string }[];
  products: Product[];
  categories: {
    title: string;
    url: string;
    parent: {
      title: string;
      url: string;
    };
  }[];
};
export default function Search() {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const { data, isLoading } = useSerach(inputValue);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  // const isVisible = inputValue.length >= 3;
  const onValueChange = (value: string) => {
    setInputValue(value);
    if (value.length >= 2) return setIsVisible(true);
    if (!isMobile) {
      setIsVisible(false);
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      startTransition(() => {
        setIsVisible(false);
        router.push(`/result/?search=${inputValue}`);
      });
    }
  };
  const serachResult: Serach = data?.data?.data;
  const onClose = () => setIsVisible(false);

  const onRedirect = (url: string) => {
    startTransition(() => {
      router.push(`${url}/`);
      setInputValue('');
      onClose();
    });
  };

  // useEffect(() => {
  //   if (isVisible) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }

  //   // اطمینان از اینکه هنگام خروج از کامپوننت، overflow به حالت عادی برمی‌گرده
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, [isVisible]);

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
    }
  }, [isMobile]);

  if (isPending) return <Loading />;
  return (
    <div className="flex w-full justify-end">
      {/* <Button
        className="min-w-fit w-fit lg:!hidden"
        onClick={() => setIsVisible(true)}
      >
        <span>
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8.5"
              cy="8.50041"
              r="7.5"
              stroke="#A6AFB9"
              strokeWidth="2"
            />
            <line
              x1="16.0931"
              y1="15.5377"
              x2="20.6682"
              y2="19.8082"
              stroke="#A6AFB9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </Button> */}

      <div
        ref={searchRef}
        className={`overflow-hidden rounded-md bg-white shadow-sm transition-all duration-500 ease-in-out ${
          isVisible
            ? 'h-[48px] w-full' // باز شده
            : 'flex h-[48px] w-[48px] items-center justify-center rounded-xl border' // اولیه
        } ${isVisible ? 'fixed left-0 right-0 top-0 z-[9999] lg:relative' : 'relative'} `}
        onClick={() => {
          if (!isVisible) setIsVisible(true);
        }}
      >
        {isVisible ? (
          <Input
            value={inputValue}
            onValueChange={(value: string) => onValueChange(value)}
            startContent={<SearchIcon className="h-6 w-6 stroke-[#616A76]" />}
            // ...
            onKeyDown={onKeyDown}
            placeholder="جستجو..."
            className="w-full"
            classNames={{
              inputWrapper:
                '!h-[48px] border border-[#E5EAEF] group-data-[has-value=true]:bg-white',
              input: 'font-medium !rounded-none',
            }}
          />
        ) : (
          <span>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.666 19C16.0843 19 19.666 15.4183 19.666 11C19.666 6.58172 16.0843 3 11.666 3C7.24774 3 3.66602 6.58172 3.66602 11C3.66602 15.4183 7.24774 19 11.666 19Z"
                stroke="#6E3DFF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.6664 20.9984L17.3164 16.6484"
                stroke="#6E3DFF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
