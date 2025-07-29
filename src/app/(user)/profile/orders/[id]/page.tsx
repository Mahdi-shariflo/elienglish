import Image from 'next/image';
import React from 'react';
import { Toman_Icon } from '@/components/common/icon';
import { Order } from '@/store/types/profile';
import { BASEURL } from '@/lib/variable';
import { discountCalculation } from '@/lib/utils';
import BackPrevPage from '@/components/common/BackPrevPage';
import { safeRequest } from '@/lib/safeClient';
import { statusIcon } from '@/lib/data';
type Props = {
  params: Promise<{
    id: string;
  }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await safeRequest({ url: `/order/product-physical/${id}` });
  const order: Order = data?.data?.data;
  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 lg:mb-10 lg:mt-5 lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage url="/profile/orders" title="همه سفارشات" />

      <p className="container_page font-medium text-[18px] text-[#0C0C0C] lg:w-full">
        جزئیات سفارش
      </p>
      <div className="mt-5 px-5 lg:!mt-10">
        {/* title */}
        {/* <div className='flex items-center justify-between '>
                    <p className='font-regular text-[#393B40]'>جزئیات ثبت سفارش و گیرنده</p>
                    <Button className='text-main px-0 w-fit'>
                        مشاهده فاکتور
                    </Button>
                </div> */}
        <div className="flex h-[56px] items-center bg-[#F5F6F6] px-4">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">کد پیگیری سفارش</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C]">
            {order.orderNumber}
          </p>
        </div>
        <div className="flex h-[56px] items-center bg-white px-4">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">تاریخ ثبت سفارش</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C]">
            {new Date(order.createdAt).toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex h-[56px] items-center bg-[#F5F6F6] px-4">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">تحویل گیرنده</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C]">
            {order?.productPhysicalItems?.orderAddress?.firstName}{' '}
            {order?.productPhysicalItems?.orderAddress?.lastName}
          </p>
        </div>
        <div className="flex h-[56px] items-center bg-white px-4">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">شماره موبایل</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C]">
            {order?.productPhysicalItems?.orderAddress?.mobileNumber}
          </p>
        </div>
        <div className="flex min-h-[56px] items-center bg-[#F5F6F6] px-4 py-4">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">آدرس</p>
          <p className="font-regular text-[14px] text-[#0C0C0C]">
            {order?.productPhysicalItems?.orderAddress?.address}
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-[#E4E7E9]" />

      <div className="!mt-10 px-5">
        {/* title */}
        <p className="mb-3 font-regular text-[#393B40]">جزئیات پرداخت و مرسوله </p>
        <div className="flex h-[56px] items-center bg-[#F5F6F6] px-4">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">مبلغ سفارش</p>
          <p className="whitespace-nowrap font-regular text-[14px] text-[#0C0C0C]">
            {Number(order?.totalAmount).toLocaleString()} تومان
          </p>
        </div>

        <div className="flex h-[56px] items-center bg-[#F5F6F6] px-4">
          <p className="w-[240px] font-regular text-[14px] text-[#7D8793]">وضعیت </p>
          <div className="flex items-center gap-2 lg:p-[16px]">
            <span>
              {statusIcon.find((item) => item.status === order.productPhysicalItems.status)?.icon}
            </span>
            <span className="font-regular text-[14px] text-[#393B40]">
              {statusIcon.find((item) => item.status === order.productPhysicalItems.status)?.name}
            </span>
          </div>
        </div>
        {/* <div className='bg-white h-[56px] flex items-center px-4'>
                    <p className='text-[#7D8793] w-[240px] font-regular text-[14px]'>امتیاز رز کلاب</p>
                    <div className='flex items-center gap-1'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.81542 10.5716C7.69542 10.6807 7.54459 10.7349 7.39459 10.7349C7.22459 10.7349 7.05542 10.6657 6.93209 10.5307L5.41292 8.86408C5.18042 8.60908 5.19876 8.21323 5.45376 7.98156C5.70792 7.7474 6.10376 7.76656 6.33709 8.02155L7.85626 9.68825C8.08876 9.94408 8.07042 10.3391 7.81542 10.5716ZM17.5596 7.35073L15.1087 3.75156C14.7279 3.18823 14.0946 2.85156 13.4137 2.85156H6.59126C5.91126 2.85156 5.27792 3.18822 4.89792 3.74989L2.43876 7.35073C1.90459 8.13406 1.97709 9.17825 2.61626 9.89075L8.70458 16.5741C9.03542 16.9382 9.50708 17.1474 9.99875 17.1474C10.4904 17.1474 10.9621 16.9382 11.2921 16.5732L17.3812 9.88241C18.0229 9.17908 18.0962 8.13823 17.5596 7.35073Z" fill="#FFA216" />
                        </svg>

                        <p className='text-[#0C0C0C] font-regular text-[14px] whitespace-nowrap'>۵۴</p>
                    </div>
                </div> */}
      </div>

      <div className="h-px w-full bg-[#E4E7E9]" />

      <div className="container_page flex flex-col !gap-5 lg:w-full">
        {order.productPhysicalItems.products.map((product, idx) => (
          <div key={idx} className="flex items-start gap-3 border-b border-[#E4E7E9] pb-3">
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
                <p className="flex items-center gap-1 font-regular text-[14px] text-[#0C0C0C]">
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
