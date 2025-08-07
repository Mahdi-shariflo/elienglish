'use client';
import { useSerach } from '@/hooks/serach/useSearch';
import cn from '@/lib/classnames';
import { BASEURL } from '@/lib/variable';
import { Input, Spinner } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { IoIosArrowBack } from 'react-icons/io';
import { useMedia } from 'react-use';
import Button from '../Button';
import { SearchIcon } from '../icon';
import Loading from '../Loading';
import { Product } from '@/store/types/home';
import { useOutsideClick } from '@/hooks/common/useOutsideClick';
import SearchSwiper from './SearchSwiper';

type Search = {
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isSuccess } = useSerach(inputValue);

  const searchRef = useOutsideClick<HTMLDivElement>(() => {
    if (!isMobile && isExpanded) {
      onClose();
    }
  });

  const onValueChange = (value: string) => {
    setInputValue(value);
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      startTransition(() => {
        onClose();
        router.push(`/result/?search=${inputValue}`);
      });
    }
  };

  const serachResult = data?.data?.data;

  const onClose = () => {
    setIsVisible(false);
    setIsExpanded(false);
    setInputValue('');
  };

  const onExpandSearch = () => {
    if (!isMobile) {
      setIsExpanded(true);
      // تاخیر برای focus بعد از انیمیشن
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    } else {
      setIsVisible(true);
    }
  };

  const onRedirect = (url: string) => {
    startTransition(() => {
      router.push(`${url}/`);
      setInputValue('');
      onClose();
    });
  };

  // نمایش نتایج با تاخیر بعد از تایپ
  useEffect(() => {
    if (inputValue.length >= 2 && isExpanded) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timeout);
    } else if (inputValue.length < 2) {
      setIsVisible(false);
    }
  }, [inputValue, isExpanded]);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(true);
      setIsVisible(true);
    }
  }, [isMobile]);

  return (
    <div className="flex w-full justify-end">
      <div
        ref={searchRef}
        className={cn(
          'relative transition-all duration-300 ease-out',
          // حالت موبایل
          isMobile && isVisible ? 'fixed left-0 right-0 top-0 z-[9999] w-full' : '',
          // حالت دسکتاپ
          !isMobile && !isExpanded ? 'h-[40px] w-[40px] cursor-pointer' : 'w-full max-w-md'
        )}
      >
        {/* آیکون حالت بسته */}
        {!isExpanded && !isMobile && (
          <div
            onClick={onExpandSearch}
            className="flex h-10 w-10 transform items-center justify-center rounded-full bg-[#E4E7E9] transition-colors duration-200 hover:scale-105 hover:bg-[#d1d5db] dark:bg-[#172334] dark:hover:bg-[#1f2937]"
          >
            <SearchIcon className="h-5 w-5 stroke-[#616A76]" />
          </div>
        )}

        {/* Input حالت باز */}
        <div
          className={cn(
            'transition-all duration-300 ease-out',
            !isExpanded && !isMobile
              ? 'pointer-events-none scale-95 opacity-0'
              : 'scale-100 opacity-100'
          )}
        >
          {(isExpanded || isMobile) && (
            <Input
              ref={inputRef}
              startContent={<SearchIcon className="h-6 w-6 stroke-[#616A76]" />}
              value={inputValue}
              onValueChange={onValueChange}
              endContent={
                inputValue.length >= 1 || isExpanded ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (inputValue.length > 0) {
                        setInputValue('');
                        setIsVisible(false);
                      } else {
                        onClose();
                        if (!isMobile) {
                          router.push('/');
                        }
                      }
                    }}
                    className="w-fit min-w-fit cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <CgClose className="h-4 w-4 text-[#616A76]" />
                  </div>
                ) : null
              }
              className="w-full"
              classNames={{
                inputWrapper: cn(
                  'h-[48px] transition-all duration-200',
                  isVisible && inputValue.length >= 2
                    ? 'dark:!bg-[#172334] !bg-white hover:!bg-white dark:hover:!bg-[#172334] !rounded-b-none !rounded-t-lg border-b-0'
                    : '!bg-[#E4E7E9] dark:!bg-[#172334] !rounded-lg hover:!bg-[#d1d5db] dark:hover:!bg-[#1f2937]'
                ),
                input: 'font-medium text-right',
              }}
              placeholder="جستجو..."
              onKeyDown={onKeyDown}
            />
          )}
        </div>

        {/* نتایج */}
        {isVisible && inputValue.length >= 2 && (
          <div
            className={cn(
              'absolute top-12 z-[9999] max-h-[90vh] w-full overflow-auto rounded-b-lg border border-gray-200 bg-white px-2 shadow-2xl dark:border-gray-700 dark:bg-[#0b1524]',
              'lg:left-1/2 lg:h-fit lg:max-h-[85vh] lg:-translate-x-1/2',
              'animate-in slide-in-from-top-2 fade-in duration-200',
              'flex flex-col gap-y-3'
            )}
          >
            {isLoading ? (
              <Spinner className="mx-auto w-full py-8" size="md" />
            ) : (
              <div className={cn(serachResult ? 'flex w-full flex-col gap-8 p-5' : 'hidden')}>
                {isSuccess &&
                  [
                    ...(serachResult?.blog || []),
                    ...(serachResult?.course || []),
                    ...(serachResult?.product || []),
                  ].length < 1 && (
                    <p className="py-4 text-center font-medium text-sm text-[#505B74]">
                      موردی یافت نشد
                    </p>
                  )}

                {serachResult?.blog && serachResult.blog.length > 0 && (
                  <SearchSwiper type="blog" title="بلاگ‌ها" sliders={serachResult.blog} />
                )}
                {serachResult?.course && serachResult.course.length > 0 && (
                  <SearchSwiper type="course" title="دوره‌ها" sliders={serachResult.course} />
                )}
                {serachResult?.product && serachResult.product.length > 0 && (
                  <SearchSwiper type="product" title="محصولات" sliders={serachResult.product} />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isVisible && !isMobile && (
        <div
          className="animate-in fade-in fixed left-0 top-0 z-[9998] h-full w-full bg-black bg-opacity-20 backdrop-blur-sm duration-200"
          onClick={onClose}
        />
      )}
    </div>
  );
}
