'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { FilterCategory } from '@/store/types';
import { usePathname, useRouter } from 'next/navigation';
import useGlobalStore from '@/store/global-store';
import Button from '../common/Button';
import { Arrow_back_mobile, Delete_icon, Sort_icon } from '../common/icon';
import CheckboxFilter from './CheckboxFilter';
import BaseDialog from '../common/BaseDialog';
import SortModal from './SortModal';
import { sorts } from '@/lib/data';
import Title from '../common/Title';
import Loading from '../common/Loading';

type Props = {
  title: string;
  resultFilter?: FilterCategory;
  searchParams: {
    attribiutes?: string;
    available?: string;
    discounted?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  };
};

const Filters = ({ searchParams, resultFilter, title }: Props) => {
  const [modalFilter, setModalFilter] = useState(false);
  const [selectFilter, setSelectFilter] = useState<{
    name: string;
    type: string;
    component?: () => React.JSX.Element;
  }>({
    name: '',
    component: undefined,
    type: '',
  });
  const pathname = usePathname();
  const { setIsPendingCategory, isPendingCategory } = useGlobalStore();
  const [openSort, setOpenSort] = useState(false);
  const onToggleSort = () => setOpenSort(!openSort);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSort = (sort: string) => {
    onToggleSort();
    startTransition(() => {
      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);
      searchParams.set('sort', sort.toString());
      searchParams.set('page', '1');
      const newQueryString = searchParams.toString();
      router.push(`${pathname}/?${newQueryString}`, { scroll: false });
    });
  };
  useEffect(() => {
    setIsPendingCategory(isPending);
  }, [isPending]);

  const onClose = () => {
    setModalFilter(false);
    setSelectFilter({ name: '', component: undefined, type: '' });
  };
  const sortName = sorts.find((item) => item?.sort === searchParams.sort);
  const searchParamsLength = Object.values(searchParams).filter((v) => v !== undefined).length;
  return (
    <div className="mt-3 w-full lg:sticky lg:top-44 lg:mt-0 lg:w-fit">
      {/* mobile sort and filter */}
      <div className="flex w-full items-center gap-3 lg:hidden">
        <Button onClick={() => setModalFilter(true)} className="relative z-10 w-full border">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[#172334] dark:fill-white"
            >
              <path d="M18.332 6.04297H13.332C12.9904 6.04297 12.707 5.75964 12.707 5.41797C12.707 5.0763 12.9904 4.79297 13.332 4.79297H18.332C18.6737 4.79297 18.957 5.0763 18.957 5.41797C18.957 5.75964 18.6737 6.04297 18.332 6.04297Z" />
              <path d="M5.0013 6.04297H1.66797C1.3263 6.04297 1.04297 5.75964 1.04297 5.41797C1.04297 5.0763 1.3263 4.79297 1.66797 4.79297H5.0013C5.34297 4.79297 5.6263 5.0763 5.6263 5.41797C5.6263 5.75964 5.34297 6.04297 5.0013 6.04297Z" />
              <path d="M8.33464 8.95833C6.38464 8.95833 4.79297 7.36667 4.79297 5.41667C4.79297 3.46667 6.38464 1.875 8.33464 1.875C10.2846 1.875 11.8763 3.46667 11.8763 5.41667C11.8763 7.36667 10.2846 8.95833 8.33464 8.95833ZM8.33464 3.125C7.06797 3.125 6.04297 4.15 6.04297 5.41667C6.04297 6.68333 7.06797 7.70833 8.33464 7.70833C9.6013 7.70833 10.6263 6.68333 10.6263 5.41667C10.6263 4.15 9.6013 3.125 8.33464 3.125Z" />
              <path d="M18.3333 15.207H15C14.6583 15.207 14.375 14.9237 14.375 14.582C14.375 14.2404 14.6583 13.957 15 13.957H18.3333C18.675 13.957 18.9583 14.2404 18.9583 14.582C18.9583 14.9237 18.675 15.207 18.3333 15.207Z" />
              <path d="M6.66797 15.207H1.66797C1.3263 15.207 1.04297 14.9237 1.04297 14.582C1.04297 14.2404 1.3263 13.957 1.66797 13.957H6.66797C7.00964 13.957 7.29297 14.2404 7.29297 14.582C7.29297 14.9237 7.00964 15.207 6.66797 15.207Z" />
              <path d="M11.6667 18.1263C9.71667 18.1263 8.125 16.5346 8.125 14.5846C8.125 12.6346 9.71667 11.043 11.6667 11.043C13.6167 11.043 15.2083 12.6346 15.2083 14.5846C15.2083 16.5346 13.6167 18.1263 11.6667 18.1263ZM11.6667 12.293C10.4 12.293 9.375 13.318 9.375 14.5846C9.375 15.8513 10.4 16.8763 11.6667 16.8763C12.9333 16.8763 13.9583 15.8513 13.9583 14.5846C13.9583 13.318 12.9333 12.293 11.6667 12.293Z" />
            </svg>
          </span>
          <span>فیلترها</span>
        </Button>
        <Button onClick={onToggleSort} className="relative z-10 w-full border">
          <span className="flex items-center gap-1">
            <Sort_icon />
            <span>{sortName?.name ?? 'پربازدیدترین‌ها'}</span>
          </span>
          <Arrow_back_mobile className="h-5 w-5 rotate-90" />
        </Button>
      </div>

      {/* title */}
      <div className="mt-5 lg:mt-0">
        <Title className="hidden lg:block" title={title} />
        <div className="mt-5 hidden !max-h-[90vh] w-[288px] min-w-[288px] overflow-hidden overflow-x-hidden rounded-xl bg-[#F4F6FA] !px-6 dark:bg-[#263248] lg:block lg:pl-3">
          <div className="flex !h-[54px] items-center justify-between border-b dark:border-[#505B74]">
            <div className="flex items-center gap-2">
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#172334] dark:fill-white"
                >
                  <path d="M18.332 6.04297H13.332C12.9904 6.04297 12.707 5.75964 12.707 5.41797C12.707 5.0763 12.9904 4.79297 13.332 4.79297H18.332C18.6737 4.79297 18.957 5.0763 18.957 5.41797C18.957 5.75964 18.6737 6.04297 18.332 6.04297Z" />
                  <path d="M5.0013 6.04297H1.66797C1.3263 6.04297 1.04297 5.75964 1.04297 5.41797C1.04297 5.0763 1.3263 4.79297 1.66797 4.79297H5.0013C5.34297 4.79297 5.6263 5.0763 5.6263 5.41797C5.6263 5.75964 5.34297 6.04297 5.0013 6.04297Z" />
                  <path d="M8.33464 8.95833C6.38464 8.95833 4.79297 7.36667 4.79297 5.41667C4.79297 3.46667 6.38464 1.875 8.33464 1.875C10.2846 1.875 11.8763 3.46667 11.8763 5.41667C11.8763 7.36667 10.2846 8.95833 8.33464 8.95833ZM8.33464 3.125C7.06797 3.125 6.04297 4.15 6.04297 5.41667C6.04297 6.68333 7.06797 7.70833 8.33464 7.70833C9.6013 7.70833 10.6263 6.68333 10.6263 5.41667C10.6263 4.15 9.6013 3.125 8.33464 3.125Z" />
                  <path d="M18.3333 15.207H15C14.6583 15.207 14.375 14.9237 14.375 14.582C14.375 14.2404 14.6583 13.957 15 13.957H18.3333C18.675 13.957 18.9583 14.2404 18.9583 14.582C18.9583 14.9237 18.675 15.207 18.3333 15.207Z" />
                  <path d="M6.66797 15.207H1.66797C1.3263 15.207 1.04297 14.9237 1.04297 14.582C1.04297 14.2404 1.3263 13.957 1.66797 13.957H6.66797C7.00964 13.957 7.29297 14.2404 7.29297 14.582C7.29297 14.9237 7.00964 15.207 6.66797 15.207Z" />
                  <path d="M11.6667 18.1263C9.71667 18.1263 8.125 16.5346 8.125 14.5846C8.125 12.6346 9.71667 11.043 11.6667 11.043C13.6167 11.043 15.2083 12.6346 15.2083 14.5846C15.2083 16.5346 13.6167 18.1263 11.6667 18.1263ZM11.6667 12.293C10.4 12.293 9.375 13.318 9.375 14.5846C9.375 15.8513 10.4 16.8763 11.6667 16.8763C12.9333 16.8763 13.9583 15.8513 13.9583 14.5846C13.9583 13.318 12.9333 12.293 11.6667 12.293Z" />
                </svg>
              </span>
              <p className="font-medium text-[18px] text-[#172334] dark:text-white">فیلتر‌</p>
            </div>
            {searchParamsLength >= 1 && (
              <Button onClick={() => router.push(pathname)} className="w-fit text-main">
                <Delete_icon />
                <span>حذف فیلترها</span>
              </Button>
            )}
          </div>
          {/* <ToggleFilter onToggle={onToggle} searchParams={searchParams} /> */}
          <CheckboxFilter searchParams={searchParams} resultFilter={resultFilter} />
        </div>
      </div>
      {/* sort */}
      <SortModal
        onSort={onSort}
        onToggleSort={onToggleSort}
        openSort={openSort}
        searchParams={searchParams}
      />

      <BaseDialog
        isOpen={modalFilter}
        size="full"
        title={selectFilter.name ? selectFilter.name : 'فیلتر'}
        classBody="px-[24px] w-full mx-auto overflow-x-hidden"
        onClickFooter={() => setModalFilter(false)}
        nameBtnFooter="اعمال"
        onClose={
          selectFilter?.name
            ? () => setSelectFilter({ name: '', component: undefined, type: '' })
            : onClose
        }
      >
        <div>
          <div>
            {/* <ToggleFilter onToggle={onToggle} searchParams={searchParams} /> */}

            <CheckboxFilter searchParams={searchParams} resultFilter={resultFilter} />
          </div>
        </div>
      </BaseDialog>
    </div>
  );
};

export default Filters;
