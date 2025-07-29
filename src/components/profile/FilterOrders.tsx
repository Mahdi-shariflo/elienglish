'use client';
import { STATUSCOUNTS } from '@/store/types/profile';
import { Button, Tab, Tabs } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useMedia } from 'react-use';

type Props = {
  orderStatusCounts: STATUSCOUNTS;
};
const FilterOrders = ({ orderStatusCounts }: Props) => {
  const isMobile = useMedia('(max-width: 480px)', false);

  const searchParams = useSearchParams();
  const activeItem = searchParams.get('sort') ?? 'AWITING';
  const filters = [
    {
      name: 'در انتظار پرداخت',
      status: 'AWITING',
      icon: (
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.666626" width="32" height="32" rx="16" fill="#FFA216" />
          <path
            d="M26.6666 25.25C26.6666 25.66 26.3266 26 25.9166 26H7.41663C7.00663 26 6.66663 25.66 6.66663 25.25C6.66663 24.84 7.00663 24.5 7.41663 24.5H25.9166C26.3266 24.5 26.6666 24.84 26.6666 25.25Z"
            fill="white"
          />
          <path
            d="M20.0566 8.51977L9.31657 19.2598C8.90657 19.6698 8.24657 19.6698 7.84657 19.2598H7.83657C6.44657 17.8598 6.44657 15.5998 7.83657 14.2098L14.9866 7.05977C16.3866 5.65977 18.6466 5.65977 20.0466 7.05977C20.4566 7.44977 20.4566 8.11977 20.0566 8.51977Z"
            fill="white"
          />
          <path
            d="M25.4866 12.4903L22.4366 9.44031C22.0266 9.03031 21.3666 9.03031 20.9666 9.44031L10.2266 20.1803C9.81657 20.5803 9.81657 21.2403 10.2266 21.6503L13.2766 24.7103C14.6766 26.1003 16.9366 26.1003 18.3366 24.7103L25.4766 17.5603C26.8966 16.1603 26.8966 13.8903 25.4866 12.4903ZM17.4266 21.5203L16.2166 22.7403C15.9666 22.9903 15.5566 22.9903 15.2966 22.7403C15.0466 22.4903 15.0466 22.0803 15.2966 21.8203L16.5166 20.6003C16.7566 20.3603 17.1766 20.3603 17.4266 20.6003C17.6766 20.8503 17.6766 21.2803 17.4266 21.5203ZM21.3966 17.5503L18.9566 20.0003C18.7066 20.2403 18.2966 20.2403 18.0366 20.0003C17.7866 19.7503 17.7866 19.3403 18.0366 19.0803L20.4866 16.6303C20.7266 16.3903 21.1466 16.3903 21.3966 16.6303C21.6466 16.8903 21.6466 17.3003 21.3966 17.5503Z"
            fill="white"
          />
        </svg>
      ),
      count: orderStatusCounts?.AWAITING,
      color: '#FFA216',
    },
    {
      name: 'در حال انجام',
      status: 'DOING',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="-6.10352e-05" width="32" height="32" rx="16" fill="#1DA1F3" />
          <path
            d="M21.3899 19.67L17.3499 16H14.6399L10.5999 19.67C9.46992 20.69 9.09992 22.26 9.64992 23.68C10.1999 25.09 11.5399 26 13.0499 26H18.9399C20.4599 26 21.7899 25.09 22.3399 23.68C22.8899 22.26 22.5199 20.69 21.3899 19.67ZM17.8199 22.14H14.1799C13.7999 22.14 13.4999 21.83 13.4999 21.46C13.4999 21.09 13.8099 20.78 14.1799 20.78H17.8199C18.1999 20.78 18.4999 21.09 18.4999 21.46C18.4999 21.83 18.1899 22.14 17.8199 22.14Z"
            fill="white"
          />
          <path
            d="M22.3499 8.32C21.7999 6.91 20.4599 6 18.9499 6H13.0499C11.5399 6 10.1999 6.91 9.64992 8.32C9.10992 9.74 9.47992 11.31 10.6099 12.33L14.6499 16H17.3599L21.3999 12.33C22.5199 11.31 22.8899 9.74 22.3499 8.32ZM17.8199 11.23H14.1799C13.7999 11.23 13.4999 10.92 13.4999 10.55C13.4999 10.18 13.8099 9.87 14.1799 9.87H17.8199C18.1999 9.87 18.4999 10.18 18.4999 10.55C18.4999 10.92 18.1899 11.23 17.8199 11.23Z"
            fill="white"
          />
        </svg>
      ),
      count: orderStatusCounts?.DOING,
      color: '#1DA1F3',
    },
    {
      name: 'در انتظار بررسی',
      status: 'REVIEW',
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="-6.10352e-05" width="32" height="32" rx="16" fill="#1DA1F3" />
          <path
            d="M21.3899 19.67L17.3499 16H14.6399L10.5999 19.67C9.46992 20.69 9.09992 22.26 9.64992 23.68C10.1999 25.09 11.5399 26 13.0499 26H18.9399C20.4599 26 21.7899 25.09 22.3399 23.68C22.8899 22.26 22.5199 20.69 21.3899 19.67ZM17.8199 22.14H14.1799C13.7999 22.14 13.4999 21.83 13.4999 21.46C13.4999 21.09 13.8099 20.78 14.1799 20.78H17.8199C18.1999 20.78 18.4999 21.09 18.4999 21.46C18.4999 21.83 18.1899 22.14 17.8199 22.14Z"
            fill="white"
          />
          <path
            d="M22.3499 8.32C21.7999 6.91 20.4599 6 18.9499 6H13.0499C11.5399 6 10.1999 6.91 9.64992 8.32C9.10992 9.74 9.47992 11.31 10.6099 12.33L14.6499 16H17.3599L21.3999 12.33C22.5199 11.31 22.8899 9.74 22.3499 8.32ZM17.8199 11.23H14.1799C13.7999 11.23 13.4999 10.92 13.4999 10.55C13.4999 10.18 13.8099 9.87 14.1799 9.87H17.8199C18.1999 9.87 18.4999 10.18 18.4999 10.55C18.4999 10.92 18.1899 11.23 17.8199 11.23Z"
            fill="white"
          />
        </svg>
      ),
      count: orderStatusCounts?.REVIEW,
      color: '#FFA216',
    },
    {
      name: 'تحویل پست',
      status: 'DELIVERY',
      icon: (
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.666626" width="32" height="32" rx="16" fill="#1DA1F3" />
          <path
            d="M23.0067 18.13L20.8267 16.38C20.5167 16.14 20.1267 16 19.7267 16H17.4167V13H21.8867C22.8567 13 23.6367 12.22 23.6367 11.25V7.75C23.6367 6.78 22.8567 6 21.8867 6H13.6267C13.2367 6 12.8467 6.14 12.5367 6.38L10.3467 8.13C9.47665 8.83 9.47665 10.17 10.3467 10.87L12.5367 12.62C12.8467 12.86 13.2367 13 13.6267 13H15.9167V16H11.4667C10.4967 16 9.71665 16.78 9.71665 17.75V21.25C9.71665 22.22 10.4967 23 11.4667 23H15.9167V25.25H13.6667C13.2567 25.25 12.9167 25.59 12.9167 26C12.9167 26.41 13.2567 26.75 13.6667 26.75H19.6667C20.0767 26.75 20.4167 26.41 20.4167 26C20.4167 25.59 20.0767 25.25 19.6667 25.25H17.4167V23H19.7267C20.1267 23 20.5167 22.86 20.8267 22.62L23.0067 20.87C23.8867 20.17 23.8867 18.83 23.0067 18.13Z"
            fill="white"
          />
        </svg>
      ),
      count: orderStatusCounts?.DELIVERY,
      color: '#1DA1F3',
    },
    {
      name: 'ارسال شده',
      status: 'POSTED',
      icon: (
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.666626" width="32" height="32" rx="16" fill="#1DA1F3" />
          <path
            d="M23.0067 18.13L20.8267 16.38C20.5167 16.14 20.1267 16 19.7267 16H17.4167V13H21.8867C22.8567 13 23.6367 12.22 23.6367 11.25V7.75C23.6367 6.78 22.8567 6 21.8867 6H13.6267C13.2367 6 12.8467 6.14 12.5367 6.38L10.3467 8.13C9.47665 8.83 9.47665 10.17 10.3467 10.87L12.5367 12.62C12.8467 12.86 13.2367 13 13.6267 13H15.9167V16H11.4667C10.4967 16 9.71665 16.78 9.71665 17.75V21.25C9.71665 22.22 10.4967 23 11.4667 23H15.9167V25.25H13.6667C13.2567 25.25 12.9167 25.59 12.9167 26C12.9167 26.41 13.2567 26.75 13.6667 26.75H19.6667C20.0767 26.75 20.4167 26.41 20.4167 26C20.4167 25.59 20.0767 25.25 19.6667 25.25H17.4167V23H19.7267C20.1267 23 20.5167 22.86 20.8267 22.62L23.0067 20.87C23.8867 20.17 23.8867 18.83 23.0067 18.13Z"
            fill="white"
          />
        </svg>
      ),
      count: orderStatusCounts?.POSTED,
      color: '#1DA1F3',
    },
    {
      name: 'لغو شده',
      status: 'CANCELED',
      icon: (
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.666626" width="32" height="32" rx="16" fill="#1DA1F3" />
          <path
            d="M23.0067 18.13L20.8267 16.38C20.5167 16.14 20.1267 16 19.7267 16H17.4167V13H21.8867C22.8567 13 23.6367 12.22 23.6367 11.25V7.75C23.6367 6.78 22.8567 6 21.8867 6H13.6267C13.2367 6 12.8467 6.14 12.5367 6.38L10.3467 8.13C9.47665 8.83 9.47665 10.17 10.3467 10.87L12.5367 12.62C12.8467 12.86 13.2367 13 13.6267 13H15.9167V16H11.4667C10.4967 16 9.71665 16.78 9.71665 17.75V21.25C9.71665 22.22 10.4967 23 11.4667 23H15.9167V25.25H13.6667C13.2567 25.25 12.9167 25.59 12.9167 26C12.9167 26.41 13.2567 26.75 13.6667 26.75H19.6667C20.0767 26.75 20.4167 26.41 20.4167 26C20.4167 25.59 20.0767 25.25 19.6667 25.25H17.4167V23H19.7267C20.1267 23 20.5167 22.86 20.8267 22.62L23.0067 20.87C23.8867 20.17 23.8867 18.83 23.0067 18.13Z"
            fill="white"
          />
        </svg>
      ),
      count: orderStatusCounts?.CANCELED,
      color: '#1DA1F3',
    },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const onSort = (sort: string) => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    searchParams.set('sort', sort.toString());
    const newQueryString = searchParams.toString();
    router.push(`${pathname}/?${newQueryString}`, { scroll: false });
  };
  return (
    <>
      <div className="container_page overflow-hidden lg:!w-full"></div>

      {isMobile ? (
        <Tabs
          onSelectionChange={(key) => onSort(key as string)}
          selectedKey={activeItem}
          variant="underlined"
          classNames={{
            base: 'w-full !pr-2 lg:hidden',
            tabList: ' w-full pr-2 font-regular relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full h-[1.3px]  bg-[#FFA216]',
            tab: 'max-w-fit px-2 !text-[12px] lg:px-0 h-10',
            tabContent: 'group-data-[selected=true]:text-[#FFA216]',
          }}
        >
          {filters.map((filter) => (
            <Tab key={filter.status} title={filter.name}></Tab>
          ))}
        </Tabs>
      ) : (
        <div className="hidden items-center gap-5 border-b border-[#EDEDED] pb-4 dark:border-[#505B74] lg:flex">
          {filters.map((filter, idx) => (
            <Button
              onPress={() => onSort(filter.status)}
              key={idx}
              className={`flex !h-[32px] !min-w-[135px] rounded-lg bg-transparent !bg-opacity-10 px-0 pt-1 ${activeItem === filter.status ? 'bg-main bg-opacity-15 text-main' : ''}`}
            >
              <span className="font-medium text-[14px]">{filter.name}</span>
              <span className="font-regular text-[10px]">({filter.count})</span>
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterOrders;
