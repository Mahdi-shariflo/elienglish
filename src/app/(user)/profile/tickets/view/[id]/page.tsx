'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Button from '@/components/common/Button';
import { useGetTicketById } from '@/hooks/ticketing/useGetTicketById';
import { BASEURL } from '@/lib/variable';
import { Ticket } from '@/types/profile';
import { Spinner } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  const { data, isLoading } = useGetTicketById();
  const ticket: Ticket = data?.data?.data;
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 dark:border-[#505B74] dark:bg-[#263248] lg:mb-10 lg:min-h-[90vh] lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile" title="مشاهده تیکت" />

      <div>
        {isLoading ? (
          <Spinner
            classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
            size="lg"
            className="!mt-20 flex items-center justify-center"
          />
        ) : (
          <>
            <div className="flex items-center justify-between border-b pb-5">
              <div>
                <p className="font-medium text-[24px] text-[#33435A]">{ticket.title}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <p className="font-medium !text-[16px] text-[#33435A]">
                    شماره تیکت:{' '}
                    <span className="text-[16px] text-[#6A7890]">{ticket.ticketNumber}</span>
                  </p>
                  <p className="font-medium text-[16px] text-[#33435A]">
                    بخش: <span className="text-[16px] text-[#6A7890]">{ticket.section}</span>
                  </p>
                  <p className="font-medium text-[16px] text-[#33435A]">
                    تاریخ ایجاد:{' '}
                    <span className="text-[16px] text-[#6A7890]">
                      {new Date(ticket.createdAt).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="flex !h-[42px] !w-[159px] items-center gap-1 rounded-lg border border-[#E4E7E9] px-2 font-regular text-[14px] text-main">
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
                </Button>
                <p
                  className={`mx-auto flex h-[28px] w-[97px] items-center justify-center rounded-lg text-center font-medium text-[12px] ${ticket.status === 'REVIEW' ? 'bg-[#FF9800] bg-opacity-10 text-[#FF9800]' : value === 'ANSWERED' ? 'bg-[#4CAF50] bg-opacity-10 !text-[#4CAF50]' : 'bg-[#F4F6FA] text-[#6A7890]'}`}
                >
                  {ticket.status === 'REVIEW'
                    ? 'در حال بررسی'
                    : ticket.status === 'ANSWERED'
                      ? 'ثبت شده'
                      : 'بسته شده'}
                </p>
              </div>
            </div>
            <div className="mt-5">
              {ticket.messages.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[16px] text-main">{item.fullName}</p>
                    <p className="font-medium text-[14px] text-[#6A7890]">
                      {new Date(item.submitDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <p className="mt-8 font-regular text-[18px] text-[#6A7890]">متن پیام</p>
                  <p className="pt-6 font-regular text-[16px] text-[#0B1524]">{item.content}</p>
                  {item.attachmentUrl ? (
                    <div className="mt-5">
                      <p className="font-regular text-[18px] text-[#6A7890]">فایل پیوست</p>
                      <div className="mt-4 flex h-[67px] items-center justify-between rounded-lg bg-[#F4F6FA] px-3">
                        <div className="flex items-center gap-3">
                          <span>
                            <svg
                              width="43"
                              height="43"
                              viewBox="0 0 43 43"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.5013 25.084C21.0261 25.084 20.5704 25.2727 20.2344 25.6087C19.8984 25.9447 19.7096 26.4005 19.7096 26.8756V30.459C19.7096 30.9342 19.8984 31.3899 20.2344 31.7259C20.5704 32.0619 21.0261 32.2506 21.5013 32.2506C21.9765 32.2506 22.4322 32.0619 22.7682 31.7259C23.1042 31.3899 23.293 30.9342 23.293 30.459V26.8756C23.293 26.4005 23.1042 25.9447 22.7682 25.6087C22.4322 25.2727 21.9765 25.084 21.5013 25.084ZM22.1821 19.8523C21.8578 19.7019 21.4959 19.652 21.143 19.709L20.8205 19.8165L20.498 19.9777L20.2292 20.1927C20.0588 20.3644 19.9249 20.5688 19.8356 20.7935C19.7463 21.0183 19.7035 21.2589 19.7096 21.5006C19.7083 21.7364 19.7535 21.9702 19.8426 22.1885C19.9318 22.4068 20.0632 22.6053 20.2292 22.7727C20.3996 22.9358 20.6005 23.0637 20.8205 23.149C21.0331 23.2493 21.2663 23.2984 21.5013 23.2923C21.7371 23.2937 21.9708 23.2485 22.1891 23.1593C22.4074 23.0702 22.606 22.9388 22.7734 22.7727C22.9394 22.6053 23.0708 22.4068 23.16 22.1885C23.2491 21.9702 23.2943 21.7364 23.293 21.5006C23.2943 21.2649 23.2491 21.0311 23.16 20.8128C23.0708 20.5945 22.9394 20.396 22.7734 20.2286C22.5992 20.0703 22.3993 19.943 22.1821 19.8523ZM35.8346 16.0181C35.816 15.8536 35.7799 15.6914 35.7271 15.5344V15.3731C35.641 15.1889 35.5261 15.0196 35.3867 14.8715L24.6367 4.12148C24.4886 3.98212 24.3193 3.86721 24.1351 3.78107H23.9559C23.7817 3.68791 23.5944 3.62147 23.4005 3.58398H12.543C11.1174 3.58398 9.75028 4.15028 8.74227 5.15829C7.73426 6.16629 7.16797 7.53344 7.16797 8.95898V34.0423C7.16797 35.4679 7.73426 36.835 8.74227 37.843C9.75028 38.851 11.1174 39.4173 12.543 39.4173H30.4596C31.8852 39.4173 33.2523 38.851 34.2603 37.843C35.2683 36.835 35.8346 35.4679 35.8346 34.0423V16.1256C35.8346 16.1256 35.8346 16.1256 35.8346 16.0181ZM25.0846 9.69357L29.725 14.334H26.8763C26.4011 14.334 25.9454 14.1452 25.6094 13.8092C25.2734 13.4732 25.0846 13.0175 25.0846 12.5423V9.69357ZM32.2513 34.0423C32.2513 34.5175 32.0625 34.9732 31.7265 35.3092C31.3905 35.6452 30.9348 35.834 30.4596 35.834H12.543C12.0678 35.834 11.6121 35.6452 11.2761 35.3092C10.9401 34.9732 10.7513 34.5175 10.7513 34.0423V8.95898C10.7513 8.4838 10.9401 8.02809 11.2761 7.69208C11.6121 7.35608 12.0678 7.16732 12.543 7.16732H21.5013V12.5423C21.5013 13.9679 22.0676 15.335 23.0756 16.343C24.0836 17.351 25.4508 17.9173 26.8763 17.9173H32.2513V34.0423Z"
                                fill="#6E3DFF"
                              />
                            </svg>
                          </span>
                          <span className="font-regular text-[16px] text-[#0B1524]">
                            فایل پیوسته شده
                          </span>
                        </div>
                        <a
                          download
                          className="flex h-[32px] w-[119px] items-center justify-center gap-3 rounded-lg bg-main font-medium text-white"
                          href={`${BASEURL}/${item.attachmentUrl}`}
                        >
                          دانلود فایل
                          <span>
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 14.5C20.7348 14.5 20.4804 14.6054 20.2929 14.7929C20.1054 14.9804 20 15.2348 20 15.5V19.5C20 19.7652 19.8946 20.0196 19.7071 20.2071C19.5196 20.3946 19.2652 20.5 19 20.5H5C4.73478 20.5 4.48043 20.3946 4.29289 20.2071C4.10536 20.0196 4 19.7652 4 19.5V15.5C4 15.2348 3.89464 14.9804 3.70711 14.7929C3.51957 14.6054 3.26522 14.5 3 14.5C2.73478 14.5 2.48043 14.6054 2.29289 14.7929C2.10536 14.9804 2 15.2348 2 15.5V19.5C2 20.2956 2.31607 21.0587 2.87868 21.6213C3.44129 22.1839 4.20435 22.5 5 22.5H19C19.7956 22.5 20.5587 22.1839 21.1213 21.6213C21.6839 21.0587 22 20.2956 22 19.5V15.5C22 15.2348 21.8946 14.9804 21.7071 14.7929C21.5196 14.6054 21.2652 14.5 21 14.5ZM11.29 16.21C11.3851 16.301 11.4972 16.3724 11.62 16.42C11.7397 16.4729 11.8691 16.5002 12 16.5002C12.1309 16.5002 12.2603 16.4729 12.38 16.42C12.5028 16.3724 12.6149 16.301 12.71 16.21L16.71 12.21C16.8983 12.0217 17.0041 11.7663 17.0041 11.5C17.0041 11.2337 16.8983 10.9783 16.71 10.79C16.5217 10.6017 16.2663 10.4959 16 10.4959C15.7337 10.4959 15.4783 10.6017 15.29 10.79L13 13.09V3.5C13 3.23478 12.8946 2.98043 12.7071 2.79289C12.5196 2.60536 12.2652 2.5 12 2.5C11.7348 2.5 11.4804 2.60536 11.2929 2.79289C11.1054 2.98043 11 3.23478 11 3.5V13.09L8.71 10.79C8.61676 10.6968 8.50607 10.6228 8.38425 10.5723C8.26243 10.5219 8.13186 10.4959 8 10.4959C7.86814 10.4959 7.73757 10.5219 7.61575 10.5723C7.49393 10.6228 7.38324 10.6968 7.29 10.79C7.19676 10.8832 7.1228 10.9939 7.07234 11.1158C7.02188 11.2376 6.99591 11.3681 6.99591 11.5C6.99591 11.6319 7.02188 11.7624 7.07234 11.8842C7.1228 12.0061 7.19676 12.1168 7.29 12.21L11.29 16.21Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
