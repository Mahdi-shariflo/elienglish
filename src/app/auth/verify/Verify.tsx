'use client';
import Button from '@/components/common/Button';
import { useVerifyAuth } from '@/hooks/auth/useVerifyAuth';
import { toEnglishDigits } from '@/lib/fun';
import { InputOtp } from '@heroui/react';
import { useFormik } from 'formik';
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
      code: Yup.string().required('وارد کردن کد الزامی است').length(5, 'کد باید دقیقاً ۵ رقم باشد'),
    }),
    onSubmit: (data) => {
      mutate({
        code: toEnglishDigits(data.code),
        mobile: searchParams.get('mobile'),
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      startTransaction(() => {
        setTimeout(() => {
          location.href = '/';
        }, 2000);
      });
    }
  }, [isSuccess]);

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
      <div className="mx-auto flex h-fit w-fit flex-col justify-between rounded-xl p-2 dark:bg-[#263248] lg:mt-14 lg:h-fit lg:p-5">
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto flex w-full flex-col justify-between rounded-xl bg-white p-5 dark:bg-[#263248] lg:mt-14 lg:h-fit lg:w-[472px]"
        >
          <div className="w-full">
            <h1 className="font-demibold text-[20px] text-primary dark:text-[#E5EAEF] lg:text-[28px]">
              ثبت نام در الی انگلیش
            </h1>

            <div className="mt-10 flex flex-col">
              <p className="text-right font-medium text-[#263248] dark:text-white">
                کد تایید ۴ رقمی ارسال شده برای شماره {searchParams.get('mobile')} را در کادر زیر
                وارد کنید.{' '}
              </p>
              <InputOtp
                classNames={{
                  errorMessage: 'font-regular',
                  base: '!mx-auto  mt-5',
                  segmentWrapper: '!flex gap-3 lg:gap-3 justify-between',
                  segment:
                    'lg:!w-[53px] font-regular !h-[48px] data-[has-value=true]:!bg-main data-[has-value=true]:!text-white !bg-[#F4F6FA] dark:!bg-[#0B1524] border border-transparent data-[active=true]:border-[#6E3DFF] data-[active=true]:!bg-[#F4F6FA] data-[active=true]:!text-block',
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
          </div>
          <div>
            <Button
              disabled={formik.values.code.length === 5 ? false : true}
              isLoading={isPedingVerify || isPending}
              type="submit"
              className="!mt-[24px] w-full bg-main text-white lg:!h-[48px]"
            >
              وررود به حساب
            </Button>
            <Countdown />
            <div className="mt-7 flex items-center justify-center gap-10 lg:mt-14 lg:hidden">
              <span className="block h-px w-[100px] bg-[#8E98A8] bg-opacity-20"></span>
              <p className="font-medium text-[#8E98A8]">یا</p>
              <span className="block h-px w-[100px] bg-[#8E98A8] bg-opacity-20"></span>
            </div>
            <Link
              href={'/auth'}
              className="mt-5 flex !h-[48px] w-full items-center justify-center rounded-lg border border-[#E5EAEF] font-medium text-[#172334] dark:text-white lg:mt-14 lg:!h-[48px]"
            >
              تعییر شماره یا ثبت نام با ایمیل
            </Link>
          </div>
        </form>
      </div>
    </Suspense>
  );
};

export default Verify;
