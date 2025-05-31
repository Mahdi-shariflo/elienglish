'use client';
import Logo from '@/../public/icons/logo.svg';
import Button from '@/components/common/Button';
import {
  Arrow_back_desktop,
  Arrow_back_mobile,
  Checkbox_blue,
  Checkbox_Green,
} from '@/components/common/icon';
import { useVerifyAuth } from '@/hooks/auth/useVerifyAuth';
import { toEnglishDigits } from '@/lib/fun';
import { InputOtp } from '@heroui/react';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useTransition } from 'react';
import * as Yup from 'yup';
import Countdown from './Countdown';

const Verify = () => {
  const [isPending, startTransaction] = useTransition();
  const { mutate, isPending: isPedingVerify, isSuccess } = useVerifyAuth();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      code: '',
    },

    validationSchema: Yup.object({
      code: Yup.string().length(5).required('فیلد اجبار ی است'),
    }),
    onSubmit: (data) => {
      mutate({
        code: toEnglishDigits(data.code),
        mobile: searchParams.get('mobile'),
      });
    },
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     startTransaction(() => {
  //       setTimeout(() => {
  //       location.href= "/"
  //       }, 2000);
  //     });
  //   }
  // }, [isSuccess]);

  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          // @ts-expect-error SMS
          otp: { transport: ['sms'] }, // transport برای درخواست OTP از طریق SMS
          signal: ac.signal,
        })
        .then((otp) => {
          if (otp && 'code' in otp) {
            formik.setFieldValue('code', otp.code);
            formik.handleSubmit();
          } else {
            console.error('OTP code is not available.');
          }
        })
        .catch((err) => {
          setError(JSON.stringify(err));
          console.error('WebOTP Error:', err);
        });

      return () => ac.abort();
    } else {
      setError('WebOTP not supported in this browser.');
    }
  }, []);

  const isError = formik.touched.code && formik.errors.code ? true : false;

  return (
    <Suspense>
      <form
        onSubmit={formik.handleSubmit}
        className="flex h-[85vh] flex-col justify-between lg:mt-10 lg:h-fit lg:w-[524px]"
      >
        <div className="w-full">
          <div className="relative h-[56px] w-full border-b lg:border-none">
            <Link className="absolute right-0 top-1/2 -translate-y-1/2" href={'/auth/'}>
              <Arrow_back_desktop className="hidden lg:block" />
              <Arrow_back_mobile className="h-6 w-6 stroke-[#545A66] lg:hidden" />
            </Link>
            <Image className="mx-auto hidden h-[56px] w-[327px] lg:block" src={Logo} alt="لوگو" />
          </div>
          <Image className="mx-auto mt-[14px] h-[56px] w-[327px] lg:hidden" src={Logo} alt="لوگو" />
          <div className="mt-10 flex flex-col">
            <p className="text-center font-medium">لطفا کد پنج رقمی ارسال شده را وارد نمایید</p>
            <InputOtp
              classNames={{
                errorMessage: 'font-regular',
                base: '!mx-auto  mt-5',
                segmentWrapper: '!flex gap-3 lg:gap-5 justify-between',
                segment:
                  '!w-[50px] font-regular !h-[50px] data-[has-value=true]:!bg-main data-[has-value=true]:!text-white !bg-gray-200 border border-transparent data-[active=true]:!bg-gray-300 data-[active=true]:!text-block',
              }}
              name="code"
              onValueChange={(e) => formik.setFieldValue('code', e)}
              value={formik.values.code}
              length={5}
              errorMessage={formik.errors.code}
              isInvalid={isError}
              autoFocus
              onComplete={() => formik.handleSubmit()}
              autoComplete="one-time-code"
              dir="ltr"
              id="otp-input"
            />
          </div>

          <div className="mt-14 rounded-sm bg-[#F0F8FF] p-4 lg:static lg:bg-[#EBFEF6]">
            <span className="flex items-center justify-center gap-2">
              <Checkbox_Green className="hidden lg:block" />
              <Checkbox_blue className="lg:hidden" />
              <span className="whitespace-nowrap font-medium text-sm text-[#0176C8] lg:text-[#045040]">
                کد تائیدی به شماره <span>{searchParams.get('mobile')}</span> ارسال شد.
              </span>
            </span>

            <Link
              href={'/auth'}
              className="mt-5 flex items-center justify-center gap-2 font-medium text-main"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22H15.5C20.5 22 22.5 20 22.5 15V13"
                  stroke="#DD338B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.54 3.01976L8.66 10.8998C8.36 11.1998 8.06 11.7898 8 12.2198L7.57 15.2298C7.41 16.3198 8.18 17.0798 9.27 16.9298L12.28 16.4998C12.7 16.4398 13.29 16.1398 13.6 15.8398L21.48 7.95976C22.84 6.59976 23.48 5.01976 21.48 3.01976C19.48 1.01976 17.9 1.65976 16.54 3.01976Z"
                  stroke="#DD338B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.41 4.1499C16.08 6.5399 17.95 8.4099 20.35 9.0899"
                  stroke="#DD338B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[14px]">تغیر شماره موبایل</span>
            </Link>
          </div>
        </div>
        <div>
          <Countdown />
          <Button
            disabled={formik.values.code.length === 5 ? false : true}
            isLoading={isPedingVerify || isPending}
            type="submit"
            className="!h-[48px] w-full bg-main text-white lg:!h-[64px]"
          >
            وررود به حساب
          </Button>
          <span className="text-center text-[12px]">{error}</span>
        </div>
      </form>
    </Suspense>
  );
};

export default Verify;
