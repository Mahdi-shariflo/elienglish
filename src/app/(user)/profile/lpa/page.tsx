'use client';
import React from 'react';
import Pagination from '@/components/common/Pagination';
import BackPrevPage from '@/components/common/BackPrevPage';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@heroui/react';
import { Order } from '@/types/profile';
import EmptyOrder from '@/components/profile/EmptyOrder';
import { useGetLpa } from '@/hooks/profile/useGetLpa';
import Button from '@/components/common/Button';

const Page = () => {
  const searchParams = useSearchParams();
  const { data, isPending } = useGetLpa({
    page: searchParams.get('page')!,
  });
  const orders: { order: Order[]; totalPages: number; totalItems: number } = data?.data?.data;

  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 dark:border-[#505B74] dark:bg-[#263248] lg:mb-10 lg:min-h-[90vh] lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile" title="تاریخچه سفارش‌ها" />

      <div>
        <div className="flex items-center gap-3 border-b">
          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33203 9.33268H22.6654C23.019 9.33268 23.3581 9.47316 23.6082 9.72321C23.8582 9.97326 23.9987 10.3124 23.9987 10.666C23.9987 11.0196 23.8582 11.3588 23.6082 11.6088C23.3581 11.8589 23.019 11.9993 22.6654 11.9993H9.33203C8.97841 11.9993 8.63927 11.8589 8.38922 11.6088C8.13917 11.3588 7.9987 11.0196 7.9987 10.666C7.9987 10.3124 8.13917 9.97326 8.38922 9.72321C8.63927 9.47316 8.97841 9.33268 9.33203 9.33268ZM9.33203 14.666H22.6654C23.019 14.666 23.3581 14.8065 23.6082 15.0565C23.8582 15.3066 23.9987 15.6457 23.9987 15.9993C23.9987 16.353 23.8582 16.6921 23.6082 16.9422C23.3581 17.1922 23.019 17.3327 22.6654 17.3327H9.33203C8.97841 17.3327 8.63927 17.1922 8.38922 16.9422C8.13917 16.6921 7.9987 16.353 7.9987 15.9993C7.9987 15.6457 8.13917 15.3066 8.38922 15.0565C8.63927 14.8065 8.97841 14.666 9.33203 14.666ZM6.66536 2.66602H25.332C26.3929 2.66602 27.4103 3.08744 28.1605 3.83759C28.9106 4.58773 29.332 5.60515 29.332 6.66602V19.9993C29.332 21.0602 28.9106 22.0776 28.1605 22.8278C27.4103 23.5779 26.3929 23.9993 25.332 23.9993H9.8787L4.94536 28.946C4.82077 29.0696 4.67302 29.1674 4.51057 29.2337C4.34812 29.3001 4.17417 29.3337 3.9987 29.3327C3.82379 29.3372 3.65027 29.3007 3.49203 29.226C3.24854 29.126 3.0401 28.9561 2.89299 28.7378C2.74588 28.5195 2.66668 28.2626 2.66536 27.9993V6.66602C2.66536 5.60515 3.08679 4.58773 3.83694 3.83759C4.58708 3.08744 5.6045 2.66602 6.66536 2.66602ZM5.33203 24.786L8.38536 21.7193C8.50995 21.5958 8.6577 21.498 8.82015 21.4317C8.9826 21.3653 9.15656 21.3317 9.33203 21.3327H25.332C25.6857 21.3327 26.0248 21.1922 26.2748 20.9422C26.5249 20.6921 26.6654 20.353 26.6654 19.9993V6.66602C26.6654 6.31239 26.5249 5.97326 26.2748 5.72321C26.0248 5.47316 25.6857 5.33268 25.332 5.33268H6.66536C6.31174 5.33268 5.9726 5.47316 5.72255 5.72321C5.4725 5.97326 5.33203 6.31239 5.33203 6.66602V24.786Z"
                fill="#6E3DFF"
              />
            </svg>
          </span>
          <p className="container_page !my-6 hidden font-medium text-[14px] text-[#0C0C0C] dark:text-white lg:block lg:!w-full lg:text-[18px]">
            تعین سطح
          </p>
        </div>

        {isPending ? (
          <Spinner
            classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
            size="lg"
            className="!mt-20 flex items-center justify-center"
          />
        ) : orders.order?.length >= 1 ? (
          <div className="container_page mt-5 flex flex-col gap-5 lg:!w-full">
            {orders.order.map((order, idx) => {
              return (
                <div className="flex justify-between rounded-lg border p-4" key={idx}>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">نوع جلسه</p>
                    <p className="font-medium text-[12px] text-[#0B1524]">
                      {order.levelItems.title}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">قیمت</p>
                    <p className="font-medium text-[12px] text-[#0B1524]">
                      {Number(order.levelItems.price).toLocaleString()} تومان
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">تاریخ</p>
                    <p className="font-medium text-[12px] text-[#0B1524]">
                      {new Date(order.levelItems.date).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">زمان</p>
                    <p className="font-medium text-[12px] text-[#0B1524]">
                      {order.levelItems.time}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">استاد</p>
                    <p className="font-medium text-[12px] text-[#0B1524]">
                      {order.levelItems.teacherName}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">وضعیت</p>
                    <p
                      className={`flex h-[28px] w-[78px] items-center justify-center rounded-md p-1 text-center font-medium text-[12px] text-[#0B1524] ${order.levelItems.status === 'PENDING' ? 'bg-[#2196F3] bg-opacity-10 text-[#2196F3]' : order.levelItems.status === 'SUBMITTED' ? 'bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]' : ''}`}
                    >
                      {order.levelItems.status === 'PENDING'
                        ? 'در حال انتظار'
                        : order.levelItems.status === 'SUBMITTED'
                          ? 'ثبت شده'
                          : 'لغو شد'}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-regular text-[14px] text-[#6A7890]">گزارش تعیین سطح</p>
                    <Button className="h-[32px] w-[89px] rounded-lg bg-main text-white">
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
              );
            })}
          </div>
        ) : (
          <EmptyOrder />
        )}
      </div>
      {orders?.totalPages > 1 && <Pagination top={0} total={data?.data?.data?.totalPages} />}
    </div>
  );
};

export default Page;
