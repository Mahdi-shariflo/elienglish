'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Button from '@/components/common/Button';
import { useGetTickets } from '@/hooks/ticketing/useGetTickets';
import { Ticket } from '@/types/profile';
import { Spinner } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { data, isLoading } = useGetTickets();
  const router = useRouter();
  const tickting: Ticket[] = data?.data?.data?.tickets;

  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 dark:border-[#505B74] dark:bg-[#263248] lg:mb-10 lg:min-h-[90vh] lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile" title="تیکت به پشتیبانی" />

      <div>
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3 border-gray-100">
            <span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 20C28 20.7072 27.719 21.3855 27.219 21.8856C26.7189 22.3857 26.0406 22.6667 25.3333 22.6667H9.33333L4 28V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V20Z"
                  stroke="#6E3DFF"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p className="hidden font-medium text-[14px] text-[#0C0C0C] dark:text-white lg:block lg:!w-full lg:text-[18px]">
              تیکت به پشتیبانی
            </p>
          </div>
          <Link
            href={'/profile/tickets/new'}
            className="flex h-[42px] items-center gap-1 rounded-lg border border-[#E4E7E9] px-2 font-regular text-[14px] text-main lg:w-fit"
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="#6E3DFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18V6"
                  stroke="#6E3DFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            تیکت جدید
          </Link>
        </div>
        <div>
          {isLoading ? (
            <Spinner
              classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
              size="lg"
              className="!mt-20 flex items-center justify-center"
            />
          ) : (
            <div className="mt-5 space-y-4">
              {tickting.map((item, idx) => (
                <div
                  className="flex justify-between rounded-[16px] border border-[#E5EAEF] p-4"
                  key={idx}
                >
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">موضوع درخواست</p>
                    <p className="font-medium text-[12px] text-[#0B1524]">{item.title}</p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">بخش</p>
                    <p className="font-medium text-[12px] text-[#0B1524]">{item.section}</p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">شماره تیکت</p>
                    <p className="font-medium text-[12px] text-[#0B1524]">{item.ticketNumber}</p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">وضعیت</p>
                    <p
                      className={`flex h-[28px] w-[97px] items-center justify-center rounded-lg font-medium text-[12px] text-[#0B1524] ${item.status === 'REVIEW' ? 'bg-[#FF9800] bg-opacity-10 text-[#FF9800]' : ''}`}
                    >
                      {item.status === 'REVIEW' ? 'در حال بررسی' : ''}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">عملیات</p>
                    <Button
                      onClick={() => router.push(`/profile/tickets/view/${item._id}`)}
                      className="h-[32px] w-[89px] rounded-lg bg-main text-white"
                    >
                      <span>
                        <svg
                          width="21"
                          height="16"
                          viewBox="0 0 21 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.4196 7.6C18.3996 2.91 14.5996 0 10.4996 0C6.39958 0 2.59958 2.91 0.579579 7.6C0.524515 7.72617 0.496094 7.86234 0.496094 8C0.496094 8.13766 0.524515 8.27383 0.579579 8.4C2.59958 13.09 6.39958 16 10.4996 16C14.5996 16 18.3996 13.09 20.4196 8.4C20.4746 8.27383 20.5031 8.13766 20.5031 8C20.5031 7.86234 20.4746 7.72617 20.4196 7.6ZM10.4996 14C7.32958 14 4.32958 11.71 2.59958 8C4.32958 4.29 7.32958 2 10.4996 2C13.6696 2 16.6696 4.29 18.3996 8C16.6696 11.71 13.6696 14 10.4996 14ZM10.4996 4C9.70845 4 8.93509 4.2346 8.2773 4.67412C7.6195 5.11365 7.10681 5.73836 6.80406 6.46927C6.50131 7.20017 6.4221 8.00444 6.57644 8.78036C6.73078 9.55628 7.11174 10.269 7.67115 10.8284C8.23056 11.3878 8.94329 11.7688 9.71922 11.9231C10.4951 12.0775 11.2994 11.9983 12.0303 11.6955C12.7612 11.3928 13.3859 10.8801 13.8255 10.2223C14.265 9.56448 14.4996 8.79113 14.4996 8C14.4996 6.93913 14.0782 5.92172 13.328 5.17157C12.5779 4.42143 11.5604 4 10.4996 4ZM10.4996 10C10.104 10 9.71734 9.8827 9.38844 9.66294C9.05954 9.44318 8.80319 9.13082 8.65182 8.76537C8.50044 8.39991 8.46084 7.99778 8.53801 7.60982C8.61518 7.22186 8.80566 6.86549 9.08537 6.58579C9.36507 6.30608 9.72144 6.1156 10.1094 6.03843C10.4974 5.96126 10.8995 6.00087 11.2649 6.15224C11.6304 6.30362 11.9428 6.55996 12.1625 6.88886C12.3823 7.21776 12.4996 7.60444 12.4996 8C12.4996 8.53043 12.2889 9.03914 11.9138 9.41421C11.5387 9.78929 11.03 10 10.4996 10Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="text-[12px]">نمایش</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
