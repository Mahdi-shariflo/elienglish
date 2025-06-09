import useBasket from '@/hooks/basket/useBasket';
import { useCheckAvailability } from '@/hooks/basket/useCheckAvailability';
import { useCreateCheckout } from '@/hooks/checkout/useCreateCheckout';
import { useDiscount } from '@/hooks/discount/useDiscount';
import { freeShippingPrice } from '@/lib/variable';
import { useCheckoutStore } from '@/store/checkout-store';
import useGlobalStore from '@/store/global-store';
import { addToast } from '@heroui/react';
import { useFormik } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BaseDialog from '../common/BaseDialog';
import Button from '../common/Button';
import Input from '../common/form/Input';
import Loading from '../common/Loading';
import DiscountResult from './DiscountResult';

const Factor = () => {
  const { data: availabilityData, isSuccess: isSuccessAvailability } = useCheckAvailability();
  const { checkout: checkoutData, setCheckout } = useCheckoutStore();
  const { mutate: mutateCheckout, isPending: isPendingCheckout } = useCreateCheckout();
  const {
    totalCountBasket,
    totalProductPriceWithoutDiscount,
    total,
    baskets,
    discountPrice,
    totalProductPriceWithDiscount,
  } = useBasket();
  const { isIpIran } = useGlobalStore();
  const router = useRouter();
  const pathname = usePathname();
  const formik = useFormik({
    initialValues: {
      code: checkoutData?.discountCode ? checkoutData?.discountCode?.code : '',
    },

    enableReinitialize: true,
    // @ts-expect-error error
    onSubmit: (values) => {
      if (checkoutData.discountCode) {
        setCheckout({ ...checkoutData, discountCode: null });
        formik.setFieldValue('code', '');
      } else {
        if (!values.code) return null;
        mutate({ code: values.code! });
      }
    },
  });
  const { mutate, isPending, isSuccess, data, error } = useDiscount();
  const [open, setOpen] = useState(false);
  const [openUnavailable, setOpenUnavailable] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setOpen(!open);
    }
  }, [isSuccess]);
  const discountData = data?.data?.data;

  const avliableProducts = isSuccessAvailability
    ? [...availabilityData?.data?.availableProducts, ...availabilityData?.data?.unavailableProducts]
    : [];
  const filteredProductsUnavailable = avliableProducts.filter((product) => {
    // پیدا کردن محصول متناظر در سبد خرید
    const basketItem = baskets.find((item) => item.product._id === product.product);

    // اگر محصول در سبد خرید وجود نداشت، آن را نگه دارید
    if (!basketItem) return true;

    // مقایسه موجودی با تعداد در سبد خرید
    const available = Number(product.availableCount);
    const inBasket = Number(basketItem.count);

    return available < inBasket;
  });

  const onNextLevel = () => {
    if (pathname === '/cart/') {
      if (filteredProductsUnavailable.length > 0) {
        setOpenUnavailable(true);
        return;
      }
      router.push('/address/');
    } else if (pathname === '/address/') {
      if (!checkoutData?.transport)
        return addToast({
          title: 'لطفا آدرس و نحوه ارسال را وارد کنید',
          color: 'danger',
        });
      router.push('/checkout/');
    } else {
      if (!checkoutData.payment)
        return addToast({
          title: 'لطفا نحوه پرداخت خود را مشخص کنید',
          color: 'danger',
        });

      const checkoutFields = {
        basket: baskets.map((item) => {
          return { id: item.product._id, count: item.count };
        }),
        orderAddressId: checkoutData.address?._id,
        postPrice: Number(total) >= freeShippingPrice ? 0 : checkoutData.transport?.shippingPrice,
        postType: checkoutData.transport?.type,
        ...(checkoutData.discountCode?.code
          ? { discountCodeId: checkoutData.discountCode._id }
          : null),
      };

      if (checkoutData?.payment?.entitle === 'Zarinpal') {
        mutateCheckout({ data: checkoutFields, url: '/payment/paymentpost' });
      } else if (checkoutData?.payment?.entitle === 'Snapppay') {
        mutateCheckout({
          data: checkoutFields,
          url: '/snapppayment/snappgetway',
        });
      }
    }
  };

  return (
    <>
      <div className="mt-4 w-full rounded-lg border border-[#E4E7E9] p-[24px]">
        <p className="font-medium text-[18px] text-[#0C0C0C]">جزئیات پرداخت</p>
        <div className="border-b border-[#E4E7E9] pb-4">
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-regular text-[16px] text-[#616A76]">
                قیمت محصولات ({totalCountBasket})
              </p>
              <p className="font-medium text-[16px] text-[#0C0C0C]">
                {totalProductPriceWithoutDiscount.toLocaleString()} تومان
              </p>
            </div>
            {/* <div className='flex items-center justify-between'>
                            <p className='text-[#616A76] text-[16px] font-regular'>جمع سبد خرید</p>
                            <p className='text-[#0C0C0C] text-[16px] font-medium'>{total.toLocaleString()} تومان</p>
                        </div> */}
            <div className="flex items-center justify-between">
              <p className="font-regular text-[16px] text-[#ED2E2E]">مجموع تخفیف روی کالا ها</p>
              <p className="font-medium text-[16px] text-[#ED2E2E]">
                {Number(
                  totalProductPriceWithoutDiscount - totalProductPriceWithDiscount
                ).toLocaleString()}{' '}
                تومان
              </p>
            </div>
            {checkoutData?.discountCode ? (
              <div className="flex items-center justify-between">
                <p className="font-regular text-[16px] text-[#616A76]">مبلغ کد تخفیف</p>
                <p className="font-medium text-[16px] text-[#0C0C0C]">
                  {Number(discountPrice).toLocaleString()} تومان
                </p>
              </div>
            ) : null}
            {pathname !== '/cart/' ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-regular text-[16px] text-[#616A76]">هزینه ارسال</p>
                  <p className="font-medium text-[16px] text-[#0C0C0C]">
                    {total >= freeShippingPrice && checkoutData?.transport?.isShippingFree
                      ? 'رایگان'
                      : checkoutData?.transport
                        ? `${checkoutData?.transport?.shippingPrice.toLocaleString()} تومان`
                        : 'تعین نشده'}
                  </p>
                </div>
              </>
            ) : null}
            <div className="flex items-center justify-between border-t border-[#E4E7E9] pt-3">
              <p className="font-regular text-[16px] text-[#0C0C0C]">مجموع</p>
              <p className="font-medium text-[16px] text-[#0C0C0C]">
                {Number(total).toLocaleString()} تومان
              </p>
            </div>
          </div>
          <Button
            isPending={isPendingCheckout}
            onClick={onNextLevel}
            className="mt-5 hidden bg-main text-white lg:flex"
          >
            تائید و تکمیل سفارش
          </Button>
        </div>
        {pathname === '/checkout/' ? (
          <div className="pt-3">
            <p className="pb-2 font-regular text-[#232429]">کد تخفیف</p>
            <div className="flex items-start gap-3">
              <Input
                disabled={checkoutData.discountCode ? true : false}
                value={formik.values.code}
                name="code"
                formik={formik}
                classNameInput="!h-[48px] bg-[#F5F6F6]"
                description={
                  error ? (
                    <div className="flex items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99992 1.33301C4.32659 1.33301 1.33325 4.32634 1.33325 7.99967C1.33325 11.673 4.32659 14.6663 7.99992 14.6663C11.6733 14.6663 14.6666 11.673 14.6666 7.99967C14.6666 4.32634 11.6733 1.33301 7.99992 1.33301ZM7.49992 5.33301C7.49992 5.05967 7.72659 4.83301 7.99992 4.83301C8.27325 4.83301 8.49992 5.05967 8.49992 5.33301V8.66634C8.49992 8.93967 8.27325 9.16634 7.99992 9.16634C7.72659 9.16634 7.49992 8.93967 7.49992 8.66634V5.33301ZM8.61325 10.9197C8.57992 11.0063 8.53325 11.073 8.47325 11.1397C8.40659 11.1997 8.33325 11.2463 8.25325 11.2797C8.17325 11.313 8.08659 11.333 7.99992 11.333C7.91325 11.333 7.82659 11.313 7.74659 11.2797C7.66659 11.2463 7.59325 11.1997 7.52659 11.1397C7.46659 11.073 7.41992 11.0063 7.38659 10.9197C7.35325 10.8397 7.33325 10.753 7.33325 10.6663C7.33325 10.5797 7.35325 10.493 7.38659 10.413C7.41992 10.333 7.46659 10.2597 7.52659 10.193C7.59325 10.133 7.66659 10.0863 7.74659 10.053C7.90659 9.98634 8.09325 9.98634 8.25325 10.053C8.33325 10.0863 8.40659 10.133 8.47325 10.193C8.53325 10.2597 8.57992 10.333 8.61325 10.413C8.64659 10.493 8.66659 10.5797 8.66659 10.6663C8.66659 10.753 8.64659 10.8397 8.61325 10.9197Z"
                          fill="#ef4444"
                        />
                      </svg>
                      <p className="font-regular text-[12px] text-red-500">
                        {/* @ts-expect-error  error*/}
                        {error?.response?.data?.errors?.message}
                      </p>
                    </div>
                  ) : undefined
                }
              />
              <Button
                isPending={isPending}
                onClick={() => formik.handleSubmit()}
                className="w-[100px] min-w-[100px] border text-main"
              >
                {checkoutData?.discountCode ? 'حذف کد' : 'اعمال کد'}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      {pathname !== '/checkout' && (
        <div className="mt-4 rounded-xl bg-[#FFF3D0] p-[24px]">
          <span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M14.0002 25.6673C20.4435 25.6673 25.6668 20.444 25.6668 14.0007C25.6668 7.55733 20.4435 2.33398 14.0002 2.33398C7.55684 2.33398 2.3335 7.55733 2.3335 14.0007C2.3335 20.444 7.55684 25.6673 14.0002 25.6673Z"
                fill="#DB8110"
              />
              <path
                d="M14 16.0423C14.4783 16.0423 14.875 15.6457 14.875 15.1673V9.33398C14.875 8.85565 14.4783 8.45898 14 8.45898C13.5217 8.45898 13.125 8.85565 13.125 9.33398V15.1673C13.125 15.6457 13.5217 16.0423 14 16.0423Z"
                fill="#DB8110"
              />
              <path
                d="M15.0735 18.2234C15.0152 18.0834 14.9335 17.955 14.8285 17.8384C14.7118 17.7334 14.5835 17.6517 14.4435 17.5934C14.1635 17.4767 13.8368 17.4767 13.5568 17.5934C13.4168 17.6517 13.2885 17.7334 13.1718 17.8384C13.0668 17.955 12.9852 18.0834 12.9268 18.2234C12.8685 18.3634 12.8335 18.515 12.8335 18.6667C12.8335 18.8184 12.8685 18.97 12.9268 19.11C12.9852 19.2617 13.0668 19.3784 13.1718 19.495C13.2885 19.6 13.4168 19.6817 13.5568 19.74C13.6968 19.7984 13.8485 19.8334 14.0002 19.8334C14.1518 19.8334 14.3035 19.7984 14.4435 19.74C14.5835 19.6817 14.7118 19.6 14.8285 19.495C14.9335 19.3784 15.0152 19.2617 15.0735 19.11C15.1318 18.97 15.1668 18.8184 15.1668 18.6667C15.1668 18.515 15.1318 18.3634 15.0735 18.2234Z"
                fill="#DB8110"
              />
            </svg>
          </span>

          <div className="space-y-3">
            <div className="flex items-start gap-2 font-regular">
              <p className="mt-3 h-2 w-2 rounded-full bg-[#7D8793]"></p>
              <p>در صورت اتمام موجودی‌، کالاها از سبد خرید حذف می‌شوند.</p>
            </div>

            {isIpIran ? null : (
              <div className="flex items-start gap-2 font-regular">
                <p className="mt-3 h-2 w-2 rounded-full bg-[#7D8793]"></p>
                <p>لطفا در طول مراحل خرید فیلتر شکن خود را خاموش کنید.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-[0rem] left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-between border-b border-t bg-white px-6 py-3 lg:hidden">
        <Button onClick={onNextLevel} className="w-fit bg-main px-3 text-white">
          تائید و تکمیل سفارش
        </Button>
        <div className="flex flex-col items-center justify-between gap-1 border-[#E4E7E9] pt-3 lg:border-t">
          <p className="font-regular text-[16px] text-[#0C0C0C]">مجموع</p>
          <p className="font-medium text-[16px] text-[#0C0C0C]">
            {Number(Number(total)).toLocaleString()} تومان
          </p>
        </div>
      </div>

      {isPendingCheckout && <Loading />}

      {open && <DiscountResult discountData={discountData} open={open} setOpen={setOpen} />}
      {openUnavailable && (
        <BaseDialog
          size="lg"
          isOpen={openUnavailable}
          onClose={() => setOpenUnavailable(false)}
          title="هشدار"
        >
          <div>
            <span className="flex justify-center">
              <svg
                width="70"
                height="70"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M14.0002 25.6673C20.4435 25.6673 25.6668 20.444 25.6668 14.0007C25.6668 7.55733 20.4435 2.33398 14.0002 2.33398C7.55684 2.33398 2.3335 7.55733 2.3335 14.0007C2.3335 20.444 7.55684 25.6673 14.0002 25.6673Z"
                  fill="#DB8110"
                />
                <path
                  d="M14 16.0423C14.4783 16.0423 14.875 15.6457 14.875 15.1673V9.33398C14.875 8.85565 14.4783 8.45898 14 8.45898C13.5217 8.45898 13.125 8.85565 13.125 9.33398V15.1673C13.125 15.6457 13.5217 16.0423 14 16.0423Z"
                  fill="#DB8110"
                />
                <path
                  d="M15.0735 18.2234C15.0152 18.0834 14.9335 17.955 14.8285 17.8384C14.7118 17.7334 14.5835 17.6517 14.4435 17.5934C14.1635 17.4767 13.8368 17.4767 13.5568 17.5934C13.4168 17.6517 13.2885 17.7334 13.1718 17.8384C13.0668 17.955 12.9852 18.0834 12.9268 18.2234C12.8685 18.3634 12.8335 18.515 12.8335 18.6667C12.8335 18.8184 12.8685 18.97 12.9268 19.11C12.9852 19.2617 13.0668 19.3784 13.1718 19.495C13.2885 19.6 13.4168 19.6817 13.5568 19.74C13.6968 19.7984 13.8485 19.8334 14.0002 19.8334C14.1518 19.8334 14.3035 19.7984 14.4435 19.74C14.5835 19.6817 14.7118 19.6 14.8285 19.495C14.9335 19.3784 15.0152 19.2617 15.0735 19.11C15.1318 18.97 15.1668 18.8184 15.1668 18.6667C15.1668 18.515 15.1318 18.3634 15.0735 18.2234Z"
                  fill="#DB8110"
                />
              </svg>
            </span>
            <p className="mt-3 text-center font-medium">
              کالا های موجود در سبد خرید شما ناموجود هستند، لطفا از سبد خرید خود حذف کنید.
            </p>
            <Button onClick={() => setOpenUnavailable(false)} className="mt-6 bg-main text-white">
              متوجه شدم
            </Button>
          </div>
        </BaseDialog>
      )}
    </>
  );
};

export default Factor;
