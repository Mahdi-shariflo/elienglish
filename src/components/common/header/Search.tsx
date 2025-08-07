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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const { data, isLoading, isSuccess } = useSerach(inputValue);
  const searchRef = useOutsideClick<HTMLDivElement>(() => {
    onClose();
  });

  // const isVisible = inputValue.length >= 3;
  const onValueChange = (value: string) => {
    setInputValue(value);
    if (value.length >= 2) return setIsVisible(true);
    if (!isMobile) {
      onClose();
    }
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
  const onClose = () => setIsVisible(false);

  const onRedirect = (url: string) => {
    startTransition(() => {
      router.push(`${url}/`);
      setInputValue('');
      onClose();
    });
  };

  // useEffect(() => {
  //   const preventScroll = (e:any) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     return false;
  //   };

  //   if (isVisible) {
  //     window.addEventListener('wheel', preventScroll, { passive: false });
  //     window.addEventListener('touchmove', preventScroll, { passive: false });
  //     window.addEventListener('keydown', preventScroll, { passive: false });
  //   } else {
  //     window.removeEventListener('wheel', preventScroll);
  //     window.removeEventListener('touchmove', preventScroll);
  //     window.removeEventListener('keydown', preventScroll);
  //   }

  //   return () => {
  //     window.removeEventListener('wheel', preventScroll);
  //     window.removeEventListener('touchmove', preventScroll);
  //     window.removeEventListener('keydown', preventScroll);
  //   };
  // }, [isVisible]);

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
    }
  }, [isMobile]);

  return (
    <div className="w-full">
      <div
        ref={searchRef}
        onClick={() => setIsVisible(true)}
        className={cn(
          'relative w-full border lg:border-0',
          isVisible
            ? 'fixed left-0 right-0 top-0 z-[9999] w-full lg:relative lg:h-fit'
            : 'relative hidden border-transparent lg:block lg:h-fit'
        )}
      >
        <Input
          startContent={<SearchIcon className="h-6 w-6 stroke-[#616A76]" />}
          value={inputValue}
          onValueChange={(value: string) => onValueChange(value)}
          endContent={
            inputValue.length >= 2 || isMobile ? (
              <div
                onClick={() => {
                  setInputValue('');
                  onClose();
                  router.push('/');
                }}
                className="w-fit min-w-fit"
              >
                <CgClose className="h-6 w-6 text-[#616A76]" />
              </div>
            ) : null
          }
          className={cn('w-full')}
          classNames={{
            inputWrapper: `h-[48px]   ${isVisible ? 'dark:group-data-[has-value=true]:!bg-[#172334] group-data-[has-value=true]:!bg-white group !bg-white dark:!bg-[#172334] hover:!bg-transparent   !rounded-b-none !rounded-t-lg' : '!bg-[#E4E7E9] dark:!bg-[#172334] !rounded-lg'}`,
            input: 'font-medium ',
          }}
          placeholder="جستجو"
          isClearable={true}
          onClear={() => {
            setInputValue('');
            onClose();
          }}
          onKeyDown={onKeyDown}
        />

        {isVisible && (
          <div
            className={cn(
              'custom_sidebar top-12 !z-[9999] max-h-[90vh] w-full overflow-auto rounded-b-sm bg-white px-2 dark:bg-[#0b1524]',
              'lg:absolute lg:left-1/2 lg:h-fit lg:max-h-[85vh] lg:-translate-x-1/2 lg:rounded-b-lg lg:pb-0',
              'md:left-auto md:right-auto',
              'flex flex-col gap-y-3'
            )}
          >
            {isLoading ? (
              <Spinner className="mx-auto w-full !py-14" size="md" />
            ) : (
              <div
                className={cn(serachResult ? 'flex w-full flex-col !gap-8 gap-y-2 p-5' : 'hidden')}
              >
                {isSuccess
                  ? [...serachResult?.blog, ...serachResult?.course, ...serachResult?.product]
                      .length < 1 && (
                      <p className="line-clamp-2 p-1 text-center font-medium text-[13px] text-[#505B74]">
                        موردی یافت نشد
                      </p>
                    )
                  : null}
                {/* result */}
                {serachResult?.blog && (
                  <SearchSwiper type="blog" title="بلاگ‌ها" sliders={serachResult?.blog} />
                )}
                {serachResult?.course && (
                  <SearchSwiper type="course" title="دوره‌ها" sliders={serachResult?.course} />
                )}
                {serachResult?.product && (
                  <SearchSwiper type="product" title="محصولات" sliders={serachResult?.product} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {isVisible && (
        <div className="_backdrop-blur-[5px] fixed left-0 top-0 z-50 hidden h-full w-full bg-[#000000] bg-opacity-20 lg:block"></div>
      )}
    </div>
  );
}
