'use client';
import { STATUSCOUNTS } from '@/types/profile';
import { Button, Tab, Tabs } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useMedia } from 'react-use';

type Props = {
  orderStatusCounts: STATUSCOUNTS;
};
const FilterDownloads = ({ orderStatusCounts }: Props) => {
  const isMobile = useMedia('(max-width: 480px)', false);

  const searchParams = useSearchParams();
  const activeItem = searchParams.get('sort') ?? 'PENDING';
  const filters = [
    {
      name: 'در انتظار پرداخت',
      status: 'PENDING',
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
      count: orderStatusCounts?.PENDING,
      color: '#FFA216',
    },

    {
      name: 'پرداخت شده',
      status: 'AVAILABLE',
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
      count: orderStatusCounts?.AVAILABLE,
      color: '#FFA216',
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
            tab: 'max-w-full px-2 !text-[12px] lg:px-0 h-10',
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

export default FilterDownloads;
