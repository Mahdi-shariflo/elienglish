'use client';
import Address from '@/components/checkout/Address';
import Button from '@/components/common/Button';
import { Location_icon } from '@/components/common/icon';
import ActionAddress from '@/components/profile/ActionAddress';
import DeleteAddress from '@/components/profile/DeleteAddress';
import { useGetAddress } from '@/hooks/address/useGetAddress';
import useBasket from '@/hooks/basket/useBasket';
import { useTransport } from '@/hooks/checkout/useTransport';
import { BASEURL, freeShippingPrice } from '@/lib/variable';
import { useCheckoutStore } from '@/store/checkout-store';
import { Address as AddressType, shippingMethod, Transport } from '@/types';
import { addToast, Spinner } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMedia } from 'react-use';

const Page = () => {
  const isMobile = useMedia('(max-width: 480px)', false);
  const router = useRouter();
  const { data, isPending } = useGetAddress();
  const { total } = useBasket();
  const address: AddressType[] = data?.data?.data?.address;
  const [selectAddress, setSelectAddress] = useState<AddressType | null>(null);

  const { setCheckout, checkout } = useCheckoutStore();
  const { mutate, isPending: isPendingTransport, data: transport } = useTransport();
  const [modalAddress, setModalAddress] = useState<{ open: boolean; info: AddressType | null }>({
    open: false,
    info: null,
  });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; info: AddressType | null }>({
    open: false,
    info: null,
  });

  const onSelectAddress = (address: AddressType) => {
    setSelectAddress(address);
    mutate({ city: address.province! });
    setCheckout({ ...checkout, address });
  };

  const transports: Transport[] = transport?.data?.data?.response;

  // برای سلکت کردن آیتم حمل و نقل:
  const onSelectTransport = (transport: shippingMethod) => {
    // بررسی اینکه آیا transport جدید با قبلی متفاوت است
    if (checkout.transport?._id !== transport._id) {
      setCheckout({ ...checkout, transport }); // فقط وقتی transport تغییر می‌کند، بروزرسانی انجام می‌شود
    }
  };

  useEffect(() => {
    if (checkout?.address?._id && checkout?.address?._id !== selectAddress?._id && total) {
      mutate({ city: checkout?.address?.province! });
    }
  }, [checkout?.address, total]);
  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const onNewAddress = () => {
    if (address.length === 5)
      return addToast({ title: 'حداقل 5 آدرس قابل ثبت است', color: 'danger' });
    if (isMobile) return router.push(`/profile/address/new/`);
    setModalAddress({ open: true, info: null });
  };

  useEffect(() => {
    setCheckout({ transport: null, address: null });
  }, []);

  return (
    <>
      <div className="lg:m mt-14 w-full space-y-8">
        <div>
          {/* title */}
          <div className="flex items-center justify-between gap-2 border-b border-[#E4E7E9] px-3 pb-3 font-medium text-[14px] text-[#616A76]">
            <span className="flex items-center gap-2">
              <Location_icon />
              <span className="pt-1">اطلاعات آدرس تحویل</span>
            </span>
            <Button onClick={onNewAddress} className="!h-fit w-fit min-w-fit px-2">
              <span className="text-[12px] text-main">افزودن آدرس جدید</span>
            </Button>
          </div>
          <Address
            isPending={isPending}
            selectAddress={checkout.address!}
            setDeleteModal={setDeleteModal}
            setModalAddress={setModalAddress}
            address={address}
            onSelectAddress={onSelectAddress}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 border-b border-[#E4E7E9] px-3 pb-3 font-medium text-[14px] text-[#616A76]">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2.92V11.23C14 12.25 13.17 13.08 12.15 13.08H3C2.45 13.08 2 12.63 2 12.08V5.69C2 3.65 3.65 2 5.69 2H13.07C13.59 2 14 2.41 14 2.92Z"
                  fill="#616A76"
                />
                <path
                  d="M21.5 15.5C21.78 15.5 22 15.72 22 16V17C22 18.66 20.66 20 19 20C19 18.35 17.65 17 16 17C14.35 17 13 18.35 13 20H11C11 18.35 9.65 17 8 17C6.35 17 5 18.35 5 20C3.34 20 2 18.66 2 17V15C2 14.45 2.45 14 3 14H12.5C13.88 14 15 12.88 15 11.5V6C15 5.45 15.45 5 16 5H16.84C17.56 5 18.22 5.39 18.58 6.01L19.22 7.13C19.31 7.29 19.19 7.5 19 7.5C17.62 7.5 16.5 8.62 16.5 10V13C16.5 14.38 17.62 15.5 19 15.5H21.5Z"
                  fill="#616A76"
                />
                <path
                  d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                  fill="#616A76"
                />
                <path
                  d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                  fill="#616A76"
                />
                <path
                  d="M22 12.53V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L21.74 11.54C21.91 11.84 22 12.18 22 12.53Z"
                  fill="#616A76"
                />
              </svg>
            </span>
            <span>روش ارسال </span>
          </div>
          {/* no-select-address */}
          {!transports && (
            <div className="mt-4 rounded-lg bg-[#F9F9F9] p-[18px] font-regular text-[14px]">
              <span>برای تعین روش ارسال ابتدا آدرس را انتخاب کنید.</span>
            </div>
          )}

          <>
            {isPendingTransport ? (
              <Spinner className="mt-4" />
            ) : (
              <div className="mt-4 space-y-3">
                {transports?.map((transport) =>
                  transport.shippingMethod.map((item, idx) => (
                    <Button
                      onClick={() => onSelectTransport(item)}
                      key={idx}
                      className={`!max-h-fit !min-h-[73px] justify-between rounded-lg border ${checkout.transport?._id === item._id ? 'border-main bg-[#FDF2F9]' : 'border-transparent bg-[#F6F6F6]'}`}
                    >
                      <div className="flex h-full flex-col items-start justify-center space-y-2 px-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-[20px] w-[20px] items-center justify-center rounded-full border ${checkout.transport?._id === item._id ? 'border-main' : 'border-[#7D8793]'}`}
                          >
                            {checkout.transport?._id === item._id && (
                              <span className="block h-[14px] w-[14px] rounded-full bg-main"></span>
                            )}
                          </span>
                          <p className="font-regular text-[14px] text-[#232429]">{item.type}</p>
                        </div>
                        <p className="font-regular text-[#545A66]">{item.shippingTime}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 px-2">
                        {item?.icon?.url && (
                          <Image
                            width={25}
                            height={25}
                            src={`${BASEURL}/${item?.icon?.url}`}
                            className="object-contain"
                            alt=""
                          />
                        )}
                        <p className="font-regular text-[#545A66]">
                          {item?.isShippingFree && Number(total) >= freeShippingPrice
                            ? 'رایگان'
                            : `${item.shippingPrice.toLocaleString()} تومان`}
                        </p>
                      </div>
                    </Button>
                  ))
                )}
              </div>
            )}
          </>
        </div>

        {transport?.data?.data?.congestionSending ? (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-main px-3 py-3 font-medium text-[14px] lg:rounded-none lg:border-0 lg:border-b">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2.92V11.23C14 12.25 13.17 13.08 12.15 13.08H3C2.45 13.08 2 12.63 2 12.08V5.69C2 3.65 3.65 2 5.69 2H13.07C13.59 2 14 2.41 14 2.92Z"
                  fill="#DD338B"
                />
                <path
                  d="M21.5 15.5C21.78 15.5 22 15.72 22 16V17C22 18.66 20.66 20 19 20C19 18.35 17.65 17 16 17C14.35 17 13 18.35 13 20H11C11 18.35 9.65 17 8 17C6.35 17 5 18.35 5 20C3.34 20 2 18.66 2 17V15C2 14.45 2.45 14 3 14H12.5C13.88 14 15 12.88 15 11.5V6C15 5.45 15.45 5 16 5H16.84C17.56 5 18.22 5.39 18.58 6.01L19.22 7.13C19.31 7.29 19.19 7.5 19 7.5C17.62 7.5 16.5 8.62 16.5 10V13C16.5 14.38 17.62 15.5 19 15.5H21.5Z"
                  fill="#DD338B"
                />
                <path
                  d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                  fill="#DD338B"
                />
                <path
                  d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                  fill="#DD338B"
                />
                <path
                  d="M22 12.53V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L21.74 11.54C21.91 11.84 22 12.18 22 12.53Z"
                  fill="#DD338B"
                />
              </svg>
            </span>
            <p className="text-[13px] text-main">
              با توجه به تغییرات زیرساختی، ارسال بسته‌ها بعد از سه روز کاری آینده انجام خواهد شد، از
              شکیبایی شما سپاسگزاریم.
            </p>
          </div>
        ) : null}
      </div>

      <ActionAddress modal={modalAddress} setModal={setModalAddress} />
      <DeleteAddress open={deleteModal} setOpen={setDeleteModal} />
    </>
  );
};

export default Page;
