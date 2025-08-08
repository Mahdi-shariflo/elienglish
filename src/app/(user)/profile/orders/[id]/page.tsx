import Image from 'next/image';
import React from 'react';
import { Toman_Icon } from '@/components/common/icon';
import { Order } from '@/store/types/profile';
import { BASEURL } from '@/lib/variable';
import { discountCalculation } from '@/lib/utils';
import BackPrevPage from '@/components/common/BackPrevPage';
import { safeRequest } from '@/lib/safeClient';
import { statusIcon } from '@/lib/data';
import Link from 'next/link';
import { GoArrowLeft } from 'react-icons/go';
type Props = {
  params: Promise<{
    id: string;
  }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await safeRequest({ url: `/order/product-physical/${id}` });
  const order: Order = data?.data?.data;
  const paymentDetails = [
    { label: 'مبلغ سفارش', value: Number(order?.totalAmount).toLocaleString() + ' تومان' },
    { label: 'کد تخفیف', value: order?.productPhysicalItems?.productPhysicalDiscountCode },
    {
      label: 'نوع کد تخفیف',
      value:
        order?.productPhysicalItems?.productPhysicalDiscountType === 'PERCENT' ? 'درصدی' : 'ثابت',
    },
    {
      label: 'مقدار کد تخفیف',
      value:
        Number(order?.productPhysicalItems?.productPhysicalDiscountPrice).toLocaleString() +
        ' تومان',
    },
    { label: 'نوع ارسال', value: order?.productPhysicalItems?.orderTrackingCodeType },
    { label: 'کد رهگیری', value: order?.productPhysicalItems?.orderTrackingCode },
    {
      label: 'هزینه ارسال',
      value: Number(order?.productPhysicalItems?.orderTrackingPrice).toLocaleString() + ' تومان',
    },
    {
      label: 'وضعیت',
      value: (
        <div className="flex items-center gap-2">
          <span>
            {statusIcon.find((item) => item.status === order?.productPhysicalItems?.status)?.icon}
          </span>
          <span>
            {statusIcon.find((item) => item.status === order?.productPhysicalItems?.status)?.name}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 dark:border-[#263248] dark:bg-[#172334] lg:mb-10 lg:mt-5 lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile/orders" title="همه سفارشات" />
      <div className="flex items-center justify-between">
        <p className="container_page font-medium text-[18px] text-[#0C0C0C] dark:text-white lg:w-full">
          جزئیات سفارش
        </p>
        <Link href={'/profile/orders'}>
          <GoArrowLeft className="text-white" size={24} />
        </Link>
      </div>
      <div className="mt-5 px-5 lg:!mt-10">
        {/* title */}
        {/* <div className='flex items-center justify-between '>
                    <p className='font-regular text-[#393B40]'>جزئیات ثبت سفارش و گیرنده</p>
                    <Button className='text-main px-0 w-fit'>
                        مشاهده فاکتور
                    </Button>
                </div> */}
        <div className="flex h-[56px] items-center bg-[#f5f6f6] px-4 dark:bg-gray-800">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">کد پیگیری سفارش</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C] dark:text-white">
            {order.orderNumber}
          </p>
        </div>
        <div className="flex h-[56px] items-center bg-white px-4 dark:bg-gray-600">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">تاریخ ثبت سفارش</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C] dark:text-white">
            {new Date(order.createdAt).toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex h-[56px] items-center bg-[#f5f6f6] px-4 dark:bg-gray-800">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">تحویل گیرنده</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C] dark:text-white">
            {order?.productPhysicalItems?.orderAddress?.firstName}{' '}
            {order?.productPhysicalItems?.orderAddress?.lastName}
          </p>
        </div>
        <div className="flex h-[56px] items-center bg-white px-4 dark:bg-gray-600">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">شماره موبایل</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C] dark:text-white">
            {order?.productPhysicalItems?.orderAddress?.mobileNumber}
          </p>
        </div>
        <div className="flex min-h-[56px] items-center bg-[#F5F6F6] px-4 py-4 dark:bg-gray-800">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">آدرس</p>
          <p className="font-regular text-[14px] text-[#0C0C0C] dark:text-white">
            {order?.productPhysicalItems?.orderAddress?.address}
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-[#E4E7E9] dark:bg-[#263248]" />

      <div>
        <p className="mb-3 font-regular text-[#393B40] dark:text-white">جزئیات پرداخت و مرسوله </p>

        {paymentDetails
          .filter((item) => item.value && item.value !== 'NaN تومان') // فقط وقتی مقدار وجود داره
          .map((item, i) => (
            <div
              key={i}
              className="flex h-[56px] items-center px-4 odd:bg-white even:bg-[#f5f6f6] dark:odd:bg-gray-800 dark:even:bg-gray-800"
            >
              <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">{item.label}</p>
              <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C] dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
      </div>

      <div className="h-px w-full bg-[#E4E7E9] dark:bg-[#263248]" />

      <div className="container_page flex flex-col !gap-5 lg:w-full">
        {order.productPhysicalItems.products.map((product, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 border-b border-[#E4E7E9] pb-3 dark:border-[#263248]"
          >
            <div>
              <span className="relative block h-[116px] w-[116px]">
                <Image
                  fill
                  className="object-contain"
                  src={`${BASEURL}/${product.thumbnailImage.url}`}
                  alt=""
                />
              </span>
            </div>
            <div className="w-full">
              <div className="space-y-3 font-regular text-[14px] text-[#616A76]">
                <p>{product?.title}</p>
                <p>x{product?.count}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="flex items-center gap-1 font-regular text-[14px] text-[#0C0C0C] dark:text-white">
                  {product.discountPrice
                    ? Number(product.discountPrice).toLocaleString()
                    : Number(product.price).toLocaleString()}
                  <Toman_Icon />
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {product.discountPrice ? (
                    <>
                      <p className="font-regular text-[14px] text-[#A8AFB8] line-through">
                        {Number(product.price).toLocaleString()}
                      </p>
                      <p className="flex h-[20px] w-[35px] items-center justify-center rounded bg-main/10 font-regular text-[12px] text-main">
                        {discountCalculation(product.discountPrice, product.price)}%
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
