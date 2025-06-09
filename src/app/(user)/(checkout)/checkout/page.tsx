'use client';
import Button from '@/components/common/Button';
import ImageComponent from '@/components/common/Image';
import useBasket from '@/hooks/basket/useBasket';
import { useGetPayment } from '@/hooks/checkout/useGetPayment';
import { useGetSnapAvaviable } from '@/hooks/checkout/useGetSnapAvaviable';
import { BASEURL } from '@/lib/variable';
import { useCheckoutStore } from '@/store/checkout-store';
import { Payment } from '@/types';
import { Spinner } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const { setCheckout, checkout } = useCheckoutStore();
  const router = useRouter();
  const { baskets } = useBasket();
  const { data, isSuccess } = useGetPayment();
  const paymenyList: Payment[] = data?.data?.data?.paymentList;
  const { data: snap, isLoading } = useGetSnapAvaviable();
  const checkSnapAvaliable = snap?.data?.data?.CheckSnappResult?.response;
  const onSelectPayment = (payment: Payment) => {
    setCheckout({ ...checkout, payment });
  };

  useEffect(() => {
    if (isSuccess) {
      setCheckout({ ...checkout, payment: paymenyList[0] });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!checkout.address) return router.push('/address/');
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [checkout.address]);

  return (
    <div className="mt-14 w-full lg:mt-0">
      <div className="flex items-center gap-2 border-b border-[#E4E7E9] px-3 pb-3 font-medium text-[#616A76]">
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 7.55039C22 8.21039 21.46 8.75039 20.8 8.75039H3.2C2.54 8.75039 2 8.21039 2 7.55039V7.54039C2 5.25039 3.85 3.40039 6.14 3.40039H17.85C20.14 3.40039 22 5.26039 22 7.55039Z"
              fill="#7D8793"
            />
            <path
              d="M2 11.45V16.46C2 18.75 3.85 20.6 6.14 20.6H17.85C20.14 20.6 22 18.74 22 16.45V11.45C22 10.79 21.46 10.25 20.8 10.25H3.2C2.54 10.25 2 10.79 2 11.45ZM8 17.25H6C5.59 17.25 5.25 16.91 5.25 16.5C5.25 16.09 5.59 15.75 6 15.75H8C8.41 15.75 8.75 16.09 8.75 16.5C8.75 16.91 8.41 17.25 8 17.25ZM14.5 17.25H10.5C10.09 17.25 9.75 16.91 9.75 16.5C9.75 16.09 10.09 15.75 10.5 15.75H14.5C14.91 15.75 15.25 16.09 15.25 16.5C15.25 16.91 14.91 17.25 14.5 17.25Z"
              fill="#7D8793"
            />
          </svg>
        </span>
        <span>انتخاب شیوه پرداخت</span>
      </div>
      <div className="border-b border-[#E4E7E9] pb-4">
        {isLoading ? (
          <Spinner
            size="lg"
            classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
            className="mt-5 flex items-center justify-center"
          />
        ) : (
          <div className="relative !mt-6 flex flex-col flex-wrap items-center justify-center gap-4">
            {paymenyList?.map((payment, idx) => {
              if (payment.entitle === 'Snapppay' && !checkSnapAvaliable?.eligible) return null;
              return (
                <Button
                  onClick={() => onSelectPayment(payment)}
                  key={idx}
                  className={`!max-h-fit !min-h-[73px] justify-between rounded-lg border ${payment.entitle === checkout.payment?.entitle ? 'border-main bg-[#FDF2F9]' : 'border-transparent bg-[#F6F6F6]'}`}
                >
                  <div className="flex h-full flex-row items-center justify-center gap-3 space-y-2 px-2">
                    <Image
                      width={40}
                      height={40}
                      src={`${BASEURL}/${payment.logo}`}
                      className="object-contain"
                      alt=""
                    />

                    <div className="flex flex-col items-start gap-2">
                      <p className="font-regular text-[14px] text-[#232429]">
                        {payment.entitle === 'Snapppay'
                          ? checkSnapAvaliable.title_message
                          : payment.title}
                      </p>
                      <p className="font-regular text-[#545A66]">
                        {payment.entitle === 'Snapppay'
                          ? checkSnapAvaliable.description
                          : payment.description}
                      </p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* products */}
      <div className="mt-4 rounded-lg bg-[#F9F9F9] p-4 font-medium">
        <div className="flex items-center gap-2 text-[12px] text-[#7D8793] lg:text-[14px]">
          <span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 2.5H6C3 2.5 2 4.29 2 6.5V7.5V21.5C2 22.33 2.94 22.8 3.6 22.3L5.31 21.02C5.71 20.72 6.27 20.76 6.63 21.12L8.29 22.79C8.68 23.18 9.32 23.18 9.71 22.79L11.39 21.11C11.74 20.76 12.3 20.72 12.69 21.02L14.4 22.3C15.06 22.79 16 22.32 16 21.5V4.5C16 3.4 16.9 2.5 18 2.5H7ZM5.97 14.51C5.42 14.51 4.97 14.06 4.97 13.51C4.97 12.96 5.42 12.51 5.97 12.51C6.52 12.51 6.97 12.96 6.97 13.51C6.97 14.06 6.52 14.51 5.97 14.51ZM5.97 10.51C5.42 10.51 4.97 10.06 4.97 9.51C4.97 8.96 5.42 8.51 5.97 8.51C6.52 8.51 6.97 8.96 6.97 9.51C6.97 10.06 6.52 10.51 5.97 10.51ZM12 14.26H9C8.59 14.26 8.25 13.92 8.25 13.51C8.25 13.1 8.59 12.76 9 12.76H12C12.41 12.76 12.75 13.1 12.75 13.51C12.75 13.92 12.41 14.26 12 14.26ZM12 10.26H9C8.59 10.26 8.25 9.92 8.25 9.51C8.25 9.1 8.59 8.76 9 8.76H12C12.41 8.76 12.75 9.1 12.75 9.51C12.75 9.92 12.41 10.26 12 10.26Z"
                fill="#A8AFB8"
              />
              <path
                d="M18.01 2.5V4C18.67 4 19.3 4.27 19.76 4.72C20.24 5.21 20.5 5.84 20.5 6.5V8.92C20.5 9.66 20.17 10 19.42 10H17.5V4.51C17.5 4.23 17.73 4 18.01 4V2.5ZM18.01 2.5C16.9 2.5 16 3.4 16 4.51V11.5H19.42C21 11.5 22 10.5 22 8.92V6.5C22 5.4 21.55 4.4 20.83 3.67C20.1 2.95 19.11 2.51 18.01 2.5C18.01 2.5 18.02 2.5 18.01 2.5Z"
                fill="#A8AFB8"
              />
            </svg>
          </span>
          <span>خلاصه سفارش</span>
        </div>

        <div className="mt-4 w-full space-y-3 text-[12px] lg:text-[14px]">
          <p className="font-regular">
            آدرس:
            <span className="text-[#7D8793]">
              {checkout?.address?.provinceLabel}-{checkout?.address?.city} -{' '}
              {checkout.address?.address}
            </span>
          </p>
          <p className="font-regular">
            شیوه ارسال‌وزمان‌حدودی:
            <span className="text-[#7D8793]">
              {checkout?.transport?.type}-{checkout?.transport?.shippingTime}
            </span>
          </p>
          <p className="font-regular">سبد خرید:</p>
          <div className="custom_scroll_gallery mt-4 flex w-full items-center gap-3 overflow-x-auto">
            {baskets?.map((basket, idx) => (
              <Link
                href={`${`/product/${basket?.product?.url}/`}`}
                className="relative min-w-[80px] overflow-hidden rounded-lg border border-[#E4E7E9]"
              >
                <ImageComponent
                  className="h-[80px] w-[80px]"
                  key={idx}
                  src={basket?.product?.thumbnailImage?.url}
                  alt=""
                />
                <span className="absolute bottom-0 left-0 flex h-5 w-4 items-center justify-center rounded-full bg-main font-medium text-[12px] text-white">
                  {basket.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
