'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { FilterCategory } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import useGlobalStore from '@/store/global-store';
import Button from '../common/Button';
import { Arrow_back_mobile, Delete_icon, Filter_icon, Sort_icon } from '../common/icon';
import ToggleFilter from './ToggleFilter';
import CheckboxFilter from './CheckboxFilter';
import BaseDialog from '../common/BaseDialog';
import SortModal from './SortModal';
import { sorts } from '@/lib/data';

type Props = {
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

const Filters = ({ searchParams, resultFilter }: Props) => {
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
  const { setIsPendingCategory } = useGlobalStore();
  const [openSort, setOpenSort] = useState(false);
  const onToggleSort = () => setOpenSort(!openSort);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onToggle = (checked: boolean, name: string) => {
    startTransition(() => {
      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);

      // Update the specific parameter
      if (checked) {
        searchParams.set(name, 'true');
      } else {
        searchParams.delete(name);
      }
      searchParams.set('page', '1');

      // Construct the new query string
      const newQueryString = searchParams.toString();

      // Navigate to the updated URL
      router.push(`${currentUrl.pathname}/?${newQueryString}`, {
        scroll: false,
      });
    });
  };

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
  const filterMobile = [
    {
      name: 'محدوده قیمت',
      type: 'range',
    },
  ];
  const searchParamsLength = Object.values(searchParams).filter((v) => v !== undefined).length;
  return (
    <>
      <div className="flex w-full items-center gap-3 lg:hidden">
        <Button onClick={() => setModalFilter(true)} className="relative z-10 w-full border">
          <Filter_icon />
          <span>فیلترها</span>
        </Button>
        <Button onClick={onToggleSort} className="relative z-10 w-full border">
          <span className="flex items-center gap-1">
            <Sort_icon />
            <span>{sortName?.name ?? 'پر تخفیف ترین'}</span>
          </span>
          <Arrow_back_mobile className="h-5 w-5 rotate-90" />
        </Button>
      </div>
      <div className="custom_sidebar container_filter hidden !h-[90vh] w-[288px] min-w-[288px] overflow-y-auto overflow-x-hidden lg:block lg:pl-3">
        <div className="flex !h-[56px] items-center justify-between">
          <p className="font-medium text-[20px] text-[#0C0C0C]">فیلتر‌ها</p>
          {searchParamsLength >= 3 && (
            <Button onClick={() => router.push(pathname)} className="w-fit text-main">
              <Delete_icon />
              <span>حذف فیلترها</span>
            </Button>
          )}
        </div>
        <ToggleFilter onToggle={onToggle} searchParams={searchParams} />
        <CheckboxFilter searchParams={searchParams} resultFilter={resultFilter} />
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
            <ToggleFilter onToggle={onToggle} searchParams={searchParams} />
            <div>
              {filterMobile.map((filter, idx) => (
                <Button
                  onClick={() => setSelectFilter(filter)}
                  className="!h-[56px] justify-between border-b border-[#E4E7E9] !px-0 font-regular"
                  key={idx}
                >
                  <span className="!text-[14px]">{filter.name}</span>
                  <span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                        stroke="#393B40"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Button>
              ))}
              <CheckboxFilter searchParams={searchParams} resultFilter={resultFilter} />
            </div>
          </div>
        </div>
      </BaseDialog>
    </>
  );
};

export default Filters;
