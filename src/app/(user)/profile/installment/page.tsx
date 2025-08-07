'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import { Toman_Icon } from '@/components/common/icon';
import { useGetInstallment } from '@/hooks/admin/installment/useGetInstallment';
import { Installment } from '@/store/types';
import { Spinner } from '@heroui/react';
import React from 'react';

const Page = () => {
  const { data, isLoading } = useGetInstallment();
  const installment: Installment[] = data?.data?.data?.installment;
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white dark:border-[#263248] dark:bg-[#172334] lg:mb-10 lg:min-h-[90vh] lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile" title="اقساط" />
      <div>
        <div className="hidden items-center gap-3 lg:flex">
          <span>
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.625 20.625H13.75C14.1147 20.625 14.4644 20.4801 14.7223 20.2223C14.9801 19.9644 15.125 19.6147 15.125 19.25C15.125 18.8853 14.9801 18.5356 14.7223 18.2777C14.4644 18.0199 14.1147 17.875 13.75 17.875H9.625C9.26033 17.875 8.91059 18.0199 8.65273 18.2777C8.39487 18.5356 8.25 18.8853 8.25 19.25C8.25 19.6147 8.39487 19.9644 8.65273 20.2223C8.91059 20.4801 9.26033 20.625 9.625 20.625ZM26.125 6.875H6.875C5.78098 6.875 4.73177 7.3096 3.95818 8.08318C3.1846 8.85677 2.75 9.90598 2.75 11V23.375C2.75 24.469 3.1846 25.5182 3.95818 26.2918C4.73177 27.0654 5.78098 27.5 6.875 27.5H26.125C27.219 27.5 28.2682 27.0654 29.0418 26.2918C29.8154 25.5182 30.25 24.469 30.25 23.375V11C30.25 9.90598 29.8154 8.85677 29.0418 8.08318C28.2682 7.3096 27.219 6.875 26.125 6.875ZM27.5 23.375C27.5 23.7397 27.3551 24.0894 27.0973 24.3473C26.8394 24.6051 26.4897 24.75 26.125 24.75H6.875C6.51033 24.75 6.16059 24.6051 5.90273 24.3473C5.64487 24.0894 5.5 23.7397 5.5 23.375V15.125H27.5V23.375ZM27.5 12.375H5.5V11C5.5 10.6353 5.64487 10.2856 5.90273 10.0277C6.16059 9.76987 6.51033 9.625 6.875 9.625H26.125C26.4897 9.625 26.8394 9.76987 27.0973 10.0277C27.3551 10.2856 27.5 10.6353 27.5 11V12.375Z"
                fill="#6E3DFF"
              />
            </svg>
          </span>
          <p className="container_page !my-6 hidden font-medium text-[14px] text-[#0C0C0C] dark:text-white lg:block lg:!w-full lg:text-[18px]">
            اقساط
          </p>
        </div>
        {isLoading ? (
          <Spinner
            classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
            size="lg"
            className="!mt-20 flex items-center justify-center"
          />
        ) : (
          <div className="px-4 lg:px-0">
            <div className="hidden items-center justify-between border-b border-[#EDEDED] pb-3 dark:border-[#263248] lg:flex">
              <p className="flex-1 text-center font-regular text-[16px] text-[#505B74] dark:text-white">
                شماره سفارش
              </p>
              <p className="flex-1 text-center font-regular text-[16px] text-[#505B74] dark:text-white">
                شماره قسط
              </p>

              <p className="flex-1 text-center font-regular text-[16px] text-[#505B74] dark:text-white">
                مبلغ قسط
              </p>

              <p className="flex-1 text-center font-regular text-[16px] text-[#505B74] dark:text-white">
                سررسید قسط
              </p>

              <p className="flex-1 text-center font-regular text-[16px] text-[#505B74] dark:text-white">
                وضعیت{' '}
              </p>
            </div>
            <div className="mt-5 space-y-5">
              {installment?.map((item, idx) => (
                <div
                  key={idx}
                  className="grid h-fit grid-cols-2 gap-4 rounded-[12px] border border-[#E5EAEF] bg-[#F4F6FA] p-2 dark:border-[#263248] dark:bg-transparent lg:flex lg:h-[84px] lg:items-center lg:justify-between lg:p-0"
                >
                  <div className="flex-1 border-b border-gray-300 pb-3 dark:border-[#263248] lg:border-none">
                    <p className="text-center font-regular text-[14px] text-[#505B74] dark:text-white lg:hidden">
                      شماره سفارش
                    </p>
                    <p className="flex-1 pt-2 text-center font-regular text-[#0B1524] dark:text-white lg:pt-0">
                      {item?.orderId}
                    </p>
                  </div>
                  <div className="flex-1 border-b border-gray-300 pb-3 dark:border-[#263248] lg:border-none">
                    <p className="text-center font-regular text-[14px] text-[#505B74] dark:text-white lg:hidden">
                      شماره قسط
                    </p>
                    <p className="flex-1 pt-2 text-center font-regular text-[#0B1524] dark:text-white lg:pt-0">
                      قسط شماره {item.installmentNumber}
                    </p>
                  </div>
                  <div className="flex-1 border-b border-gray-300 pb-3 dark:border-[#263248] lg:border-none">
                    <p className="text-center font-regular text-[14px] text-[#505B74] dark:text-white lg:hidden lg:pt-0">
                      شماره سفارش
                    </p>
                    <p className="flex flex-1 items-center justify-center gap-1 pt-2 text-center font-regular text-[#0B1524] dark:text-white lg:pt-0">
                      {Number(item.amount).toLocaleString()} <Toman_Icon />
                    </p>
                  </div>
                  <div className="flex-1 border-b border-gray-300 pb-3 dark:border-[#263248] lg:border-none">
                    <p className="text-center font-regular text-[14px] text-[#505B74] dark:text-white lg:hidden">
                      سررسید قسط
                    </p>
                    <p className="flex-1 pt-2 text-center font-regular text-[#0B1524] dark:text-white lg:pt-0">
                      {new Date(item.createdAt).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-center font-regular text-[14px] text-[#505B74] dark:text-white lg:hidden">
                      وضعیت
                    </p>
                    <p
                      className={`mx-auto mt-2 flex h-[28px] w-[97px] items-center justify-center rounded-lg text-center font-medium text-[12px] lg:mt-0 ${item.status === 'AWAITING' ? 'bg-[#FF9800] bg-opacity-10 text-[#FF9800]' : item.status === 'PAID' ? 'bg-[#4CAF50] bg-opacity-10 !text-[#4CAF50]' : 'bg-[#F4F6FA] text-[#6A7890]'}`}
                    >
                      {item.status === 'AWAITING'
                        ? 'در انتظار پرداخت'
                        : item.status === 'PAID'
                          ? 'پرداخت شده'
                          : 'بسته شده'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
