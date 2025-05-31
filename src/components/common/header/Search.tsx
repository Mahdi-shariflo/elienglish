'use client';
import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Input, Spinner } from '@heroui/react';
import { SearchIcon } from '../icon';
import Image from 'next/image';
import { useSerach } from '@/hooks/serach/useSearch';
import { Product } from '@/types/home';
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

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // اطمینان از اینکه هنگام خروج از کامپوننت، overflow به حالت عادی برمی‌گرده
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
    }
  }, [isMobile]);

  if (isPending) return <Loading />;
  return (
    <div className="w-full">
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
        className={`w-full !rounded-t-sm border ${
          isVisible
            ? 'fixed left-0 right-0 top-0 z-[9999] w-full lg:relative lg:h-fit'
            : 'relative hidden border-transparent lg:block lg:h-fit'
        }`}
      >
        <Input
          value={inputValue}
          onValueChange={(value: string) => onValueChange(value)}
          startContent={<SearchIcon className="h-6 w-6 stroke-[#616A76]" />}
          endContent={
            inputValue.length >= 2 || isMobile ? (
              <Button
                onClick={() => {
                  setInputValue('');
                  setIsVisible(false);
                  router.push('/');
                }}
                className="w-fit min-w-fit"
              >
                <CgClose className="h-6 w-6 text-[#616A76]" />
              </Button>
            ) : null
          }
          className="w-full"
          classNames={{
            inputWrapper: `!h-[48px] ${
              isVisible ? 'group-data-[has-value=true]:bg-white' : '!bg-[#E4E7E9]'
            }`,
            input: 'font-medium !rounded-none lg:!rounded-lg',
          }}
          placeholder="جستجو"
          //   isClearable={true}
          //   onClear={() => {
          //     setInputValue("");
          //     setIsVisible(false);
          //   }}
          onKeyDown={onKeyDown}
        />
        {isVisible && (
          <div className="custom_sidebar top-12 !z-[9999] h-[90vh] w-full overflow-auto rounded-b-sm border border-t-[#1DA1F3] bg-white px-2 py-3 md:left-auto md:right-auto lg:absolute lg:left-1/2 lg:h-[556px] lg:max-h-[556px] lg:-translate-x-1/2 lg:pb-0">
            {isLoading ? (
              <Spinner className="mx-auto mt-10 w-full" size="lg" />
            ) : (
              <>
                {/* result */}
                <div className="mt-2 space-y-2 lg:space-y-0">
                  {serachResult?.searchresult?.slice(0, 4).map((result, idx) => {
                    const parts = result.title.split(inputValue);
                    return (
                      <Button
                        onClick={() => onRedirect(`/result?search=${result.title}`)}
                        key={idx}
                        className="flex !h-fit items-center justify-start gap-2 font-medium text-[12px] hover:bg-gray-50 lg:p-1 lg:text-[14px]"
                      >
                        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-md bg-[#FCE7F5] lg:h-[40px] lg:w-[40px]">
                          <SearchIcon className="h-4 w-4 stroke-main" />
                        </div>
                        {parts.map((part, index) => (
                          <React.Fragment key={index}>
                            {part}
                            {index < parts.length - 1 && (
                              <span className="text-main">{inputValue}</span>
                            )}
                          </React.Fragment>
                        ))}
                      </Button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-start gap-4">
                  {serachResult?.categories?.length >= 1 && (
                    <div className="!w-[50%] flex-1 border-l border-[#E4E7E9]">
                      <p className="font-medium text-xs text-[#7D8793]">دسته بندی‌های مرتبط</p>
                      <div className="mt-4 space-y-4">
                        {serachResult.categories.slice(0, 3).map((result, idx) => (
                          <Button
                            onClick={() => onRedirect(`/product-category/${result.url}`)}
                            key={idx}
                            className="block !h-fit !w-fit !min-w-fit !justify-start whitespace-pre-line px-2 font-medium text-[12px] lg:text-[14px]"
                          >
                            دسته <span className="text-main"> {result.title}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {serachResult?.brands?.length >= 1 && (
                    <div className="!w-[50%] flex-1">
                      <p className="font-medium text-xs text-[#7D8793]">برندهای مرتبط</p>
                      <div className="mt-4 space-y-4">
                        {serachResult?.brands?.map((brand, idx) => (
                          <Button
                            onClick={() => onRedirect(`/product_brand/${brand.url}`)}
                            key={idx}
                            className="block !h-fit !w-fit !min-w-fit !justify-start whitespace-pre-line px-2 font-medium text-[12px] lg:text-[14px]"
                          >
                            {' '}
                            برند <span className="text-main"> {brand.title}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* products */}
                {serachResult?.products?.length >= 1 && (
                  <div>
                    <p className="mt-8 font-medium">جستجو در میان محصولات</p>
                    <div className="custom_scroll_gallery mt-4 flex items-center gap-4 overflow-auto pb-3">
                      {serachResult?.products?.map((result, idx) => (
                        <Button
                          onClick={() => onRedirect(`/product/${result.url}`)}
                          key={idx}
                          className="custom-line-clamp flex h-[78px] w-[227px] min-w-[227px] items-center overflow-hidden rounded-lg border border-[#E4E7E9] px-3"
                        >
                          <span className="relative !h-[70px] !w-[70px]">
                            <Image
                              className="object-contain"
                              fill
                              alt=""
                              src={`${BASEURL}/${result?.thumbnailImage?.url}`}
                            />
                          </span>
                          <p className="line-clamp-2 font-medium text-[12px] lg:text-[14px]">
                            {result.title}
                          </p>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {isVisible && (
        <div className="fixed left-0 top-20 z-50 hidden h-full w-full bg-[#0C0C0C99] bg-opacity-60 backdrop-blur-[1px] lg:block"></div>
      )}
    </div>
  );
}
