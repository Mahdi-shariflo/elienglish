'use client';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import React, { useEffect } from 'react';
import ReactSelect from '../common/form/ReactSelect';
import Datepicker from '../common/Datepicker';
import { useUpdateUser } from '@/hooks/profile/useUpdateUser';
import { useFormik } from 'formik';
import { namePattern } from '@/lib/regexes';
import * as Yup from 'yup';
import { removeEmptyFields } from '@/lib/fun';
import { addCommaCartBank, removeNumNumeric } from '@/lib/convert';
import { useSession } from 'next-auth/react';
import { User } from '@/types';
type Props = {
  disable?: boolean;
  showEdit?: boolean;
  formik?: unknown;
};
const ActionUser = ({ disable = false }: Props) => {
  const { mutate, isPending } = useUpdateUser();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      nationalCode: '',
      dateOfBirth: '',
      refundMethod: '',
      shabaNumber: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, 'نام باید حداقل دو کاراکتر باشد')
        .matches(namePattern, 'لطفا ادرس را با حروف فارسی وارد کنید')
        .required('فیلد اجباری است'),
      lastName: Yup.string()
        .min(2, 'نام‌خانوادگی باید حداقل دو کارکتر باشد')
        .matches(namePattern, 'لطفا ادرس را با حروف فارسی وارد کنید')
        .required('فیلد اجباری است'),
      dateOfBirth: Yup.string().required('فیلد اجباری است'),
      nationalCode: Yup.string()
        .nullable() // این باعث می‌شود که فیلد اختیاری باشد
        .min(10, 'کد ملی باید دقیقا ۱۰ رقم باشد')
        .max(10, 'کد ملی باید دقیقا ۱۰ رقم باشد')
        .notRequired(), // اجباری نیست
      email: Yup.string()
        .nullable() // اختیاری بودن ایمیل
        .email('فرمت ایمیل صحیح نیست') // بررسی فرمت ایمیل
        .notRequired(), // اختیاری بودن
      shabaNumber: Yup.string()
        .nullable() // اختیاری بودن ایمیل
        .min(19, 'شماره کارت حداقل باید 16 رقم باشد')
        .max(19, 'شماره کارت کداکثر باید  باید 16 رقم باشد')
        .notRequired(), // اختیاری بودن
    }),
    onSubmit: (values) => {
      const data = removeEmptyFields(values);
      mutate({
        data: {
          ...data,
          ...(data.shabaNumber
            ? {
                shabaNumber: removeNumNumeric(`${data.shabaNumber}`).toString(),
                ...(data.nationalCode ? { nationalCode: data.nationalCode.toString() } : null),
              }
            : null),
        },
      });
    },
  });
  const session = useSession();
  const user = session.data as User;
  useEffect(() => {
    if (user) {
      formik.setValues({
        ...formik.values,
        ...user,
        ...(user.shabaNumber
          ? { shabaNumber: addCommaCartBank(removeNumNumeric(user.shabaNumber)) }
          : null),
      });
    }
  }, [user]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-x-4 gap-y-3 lg:gap-x-7">
        <Input
          classNameLabel="text-[#616A76]"
          label={'نام'}
          startContent={
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0001 13.9997C17.2217 13.9997 19.8334 11.388 19.8334 8.16634C19.8334 4.94468 17.2217 2.33301 14.0001 2.33301C10.7784 2.33301 8.16675 4.94468 8.16675 8.16634C8.16675 11.388 10.7784 13.9997 14.0001 13.9997Z"
                  stroke="#7D8793"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.0216 25.6667C24.0216 21.1517 19.5299 17.5 13.9999 17.5C8.46993 17.5 3.97827 21.1517 3.97827 25.6667"
                  stroke="#7D8793"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          }
          classNameInput="bg-[#f5f6f6] border-0"
          disabled={disable}
          name="firstName"
          formik={formik}
        />
        <Input
          classNameLabel="text-[#616A76]"
          label={'نام‌خانوادگی'}
          startContent={
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0001 13.9997C17.2217 13.9997 19.8334 11.388 19.8334 8.16634C19.8334 4.94468 17.2217 2.33301 14.0001 2.33301C10.7784 2.33301 8.16675 4.94468 8.16675 8.16634C8.16675 11.388 10.7784 13.9997 14.0001 13.9997Z"
                  stroke="#7D8793"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.0216 25.6667C24.0216 21.1517 19.5299 17.5 13.9999 17.5C8.46993 17.5 3.97827 21.1517 3.97827 25.6667"
                  stroke="#7D8793"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          }
          classNameInput="bg-[#f5f6f6] border-0"
          disabled={disable}
          name="lastName"
          formik={formik}
        />
        <Input
          label={'شماره موبایل'}
          classNameLabel="text-[#616A76]"
          startContent={
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.6316 21.3847C25.6316 21.8047 25.5383 22.2363 25.3399 22.6563C25.1416 23.0763 24.8849 23.473 24.5466 23.8463C23.9749 24.4763 23.3449 24.9313 22.6333 25.223C21.9333 25.5147 21.1749 25.6663 20.3583 25.6663C19.1683 25.6663 17.8966 25.3863 16.5549 24.8147C15.2133 24.243 13.8716 23.473 12.5416 22.5047C11.1999 21.5247 9.92825 20.4397 8.71492 19.238C7.51325 18.0247 6.42825 16.753 5.45992 15.423C4.50325 14.093 3.73325 12.763 3.17325 11.4447C2.61325 10.1147 2.33325 8.84301 2.33325 7.62967C2.33325 6.83634 2.47325 6.07801 2.75325 5.37801C3.03325 4.66634 3.47659 4.01301 4.09492 3.42967C4.84159 2.69467 5.65825 2.33301 6.52159 2.33301C6.84825 2.33301 7.17492 2.40301 7.46659 2.54301C7.76992 2.68301 8.03825 2.89301 8.24825 3.19634L10.9549 7.01134C11.1649 7.30301 11.3166 7.57134 11.4216 7.82801C11.5266 8.07301 11.5849 8.31801 11.5849 8.53967C11.5849 8.81967 11.5033 9.09967 11.3399 9.36801C11.1883 9.63634 10.9666 9.91634 10.6866 10.1963L9.79992 11.118C9.67158 11.2463 9.61325 11.398 9.61325 11.5847C9.61325 11.678 9.62492 11.7597 9.64825 11.853C9.68325 11.9463 9.71825 12.0163 9.74159 12.0863C9.95159 12.4713 10.3133 12.973 10.8266 13.5797C11.3516 14.1863 11.9116 14.8047 12.5183 15.423C13.1483 16.0413 13.7549 16.613 14.3733 17.138C14.9799 17.6513 15.4816 18.0013 15.8783 18.2113C15.9366 18.2347 16.0066 18.2697 16.0883 18.3047C16.1816 18.3397 16.2749 18.3513 16.3799 18.3513C16.5783 18.3513 16.7299 18.2813 16.8583 18.153L17.7449 17.278C18.0366 16.9863 18.3166 16.7647 18.5849 16.6247C18.8533 16.4613 19.1216 16.3797 19.4133 16.3797C19.6349 16.3797 19.8683 16.4263 20.1249 16.5313C20.3816 16.6363 20.6499 16.788 20.9416 16.9863L24.8033 19.728C25.1066 19.938 25.3166 20.183 25.4449 20.4747C25.5616 20.7663 25.6316 21.058 25.6316 21.3847Z"
                  stroke="#A8AFB8"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M21.5833 10.4993C21.5833 9.79935 21.035 8.72602 20.2183 7.85102C19.4717 7.04602 18.48 6.41602 17.5 6.41602"
                  stroke="#A8AFB8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25.6667 10.4997C25.6667 5.98467 22.015 2.33301 17.5 2.33301"
                  stroke="#A8AFB8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          }
          classNameInput="bg-[#f5f6f6]  !text-gray-500 border-0"
          description={
            <div className="mt-2 flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99992 1.33301C4.32659 1.33301 1.33325 4.32634 1.33325 7.99967C1.33325 11.673 4.32659 14.6663 7.99992 14.6663C11.6733 14.6663 14.6666 11.673 14.6666 7.99967C14.6666 4.32634 11.6733 1.33301 7.99992 1.33301ZM7.49992 5.33301C7.49992 5.05967 7.72659 4.83301 7.99992 4.83301C8.27325 4.83301 8.49992 5.05967 8.49992 5.33301V8.66634C8.49992 8.93967 8.27325 9.16634 7.99992 9.16634C7.72659 9.16634 7.49992 8.93967 7.49992 8.66634V5.33301ZM8.61325 10.9197C8.57992 11.0063 8.53325 11.073 8.47325 11.1397C8.40659 11.1997 8.33325 11.2463 8.25325 11.2797C8.17325 11.313 8.08659 11.333 7.99992 11.333C7.91325 11.333 7.82659 11.313 7.74659 11.2797C7.66659 11.2463 7.59325 11.1997 7.52659 11.1397C7.46659 11.073 7.41992 11.0063 7.38659 10.9197C7.35325 10.8397 7.33325 10.753 7.33325 10.6663C7.33325 10.5797 7.35325 10.493 7.38659 10.413C7.41992 10.333 7.46659 10.2597 7.52659 10.193C7.59325 10.133 7.66659 10.0863 7.74659 10.053C7.90659 9.98634 8.09325 9.98634 8.25325 10.053C8.33325 10.0863 8.40659 10.133 8.47325 10.193C8.53325 10.2597 8.57992 10.333 8.61325 10.413C8.64659 10.493 8.66659 10.5797 8.66659 10.6663C8.66659 10.753 8.64659 10.8397 8.61325 10.9197Z"
                  fill="#7D8793"
                />
              </svg>
              <p className="font-medium text-gray-900 disabled:text-gray-900">
                شماه موبایل غیر قابل ویرایش است.
              </p>
            </div>
          }
          disabled={true}
          name="mobile"
          formik={formik}
          className="col-span-2 lg:col-span-1"
        />
        <Input
          dir="ltr"
          label={'ایمیل'}
          classNameLabel="text-[#616A76]"
          startContent={
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.8333 23.9163H8.16659C4.66659 23.9163 2.33325 22.1663 2.33325 18.083V9.91634C2.33325 5.83301 4.66659 4.08301 8.16659 4.08301H19.8333C23.3333 4.08301 25.6666 5.83301 25.6666 9.91634V18.083C25.6666 22.1663 23.3333 23.9163 19.8333 23.9163Z"
                  stroke="#7D8793"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.8334 10.5L16.1817 13.4167C14.9801 14.3733 13.0084 14.3733 11.8067 13.4167L8.16675 10.5"
                  stroke="#7D8793"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          }
          classNameInput="bg-[#f5f6f6] !pl-5 border-0"
          disabled={disable}
          name="email"
          formik={formik}
          className="col-span-2 lg:col-span-1"
        />
        <Input
          dir="ltr"
          min={1}
          max={10}
          type="tel"
          label={'کد ملی'}
          classNameLabel="text-[#616A76]"
          startContent={
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10.5001" cy="10.5003" r="2.33333" stroke="#7D8793" strokeWidth="1.5" />
                <path
                  d="M15.1666 17.5003C15.1666 18.789 15.1666 19.8337 10.4999 19.8337C5.83325 19.8337 5.83325 18.789 5.83325 17.5003C5.83325 16.2117 7.92259 15.167 10.4999 15.167C13.0772 15.167 15.1666 16.2117 15.1666 17.5003Z"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                />
                <path
                  d="M2.33325 14.0003C2.33325 9.60055 2.33325 7.40066 3.70009 6.03383C5.06692 4.66699 7.26681 4.66699 11.6666 4.66699H16.3333C20.733 4.66699 22.9329 4.66699 24.2997 6.03383C25.6666 7.40066 25.6666 9.60055 25.6666 14.0003C25.6666 18.4001 25.6666 20.6 24.2997 21.9668C22.9329 23.3337 20.733 23.3337 16.3333 23.3337H11.6666C7.26681 23.3337 5.06692 23.3337 3.70009 21.9668C2.33325 20.6 2.33325 18.4001 2.33325 14.0003Z"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                />
                <path
                  d="M22.1667 14H17.5001"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22.1667 10.5H16.3334"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22.1667 17.5H18.6667"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          }
          classNameInput="bg-[#f5f6f6] !pl-5 border-0"
          name="nationalCode"
          disabled={disable}
          formik={formik}
          className="col-span-2 lg:col-span-1"
          description={
            <span className="block text-left font-regular">
              {formik.values.nationalCode.length} / 10
            </span>
          }
        />
        <Datepicker
          name="dateOfBirth"
          formik={formik}
          disabled={disable}
          timepicker={false}
          calendarPosition="top-left"
          minDate={new Date(1921, 0, 1)}
          maxDate={new Date()}
        />

        <ReactSelect
          classNameLabel="text-[#616A76] "
          options={[
            { label: 'رز کارت', value: 'rozCart' },
            { label: 'کارت به کارت به حساب بانکی', value: 'cart' },
          ]}
          label={'روش استرداد'}
          startContent={
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10.5001" cy="10.5003" r="2.33333" stroke="#7D8793" strokeWidth="1.5" />
                <path
                  d="M15.1666 17.5003C15.1666 18.789 15.1666 19.8337 10.4999 19.8337C5.83325 19.8337 5.83325 18.789 5.83325 17.5003C5.83325 16.2117 7.92259 15.167 10.4999 15.167C13.0772 15.167 15.1666 16.2117 15.1666 17.5003Z"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                />
                <path
                  d="M2.33325 14.0003C2.33325 9.60055 2.33325 7.40066 3.70009 6.03383C5.06692 4.66699 7.26681 4.66699 11.6666 4.66699H16.3333C20.733 4.66699 22.9329 4.66699 24.2997 6.03383C25.6666 7.40066 25.6666 9.60055 25.6666 14.0003C25.6666 18.4001 25.6666 20.6 24.2997 21.9668C22.9329 23.3337 20.733 23.3337 16.3333 23.3337H11.6666C7.26681 23.3337 5.06692 23.3337 3.70009 21.9668C2.33325 20.6 2.33325 18.4001 2.33325 14.0003Z"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                />
                <path
                  d="M22.1667 14H17.5001"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22.1667 10.5H16.3334"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22.1667 17.5H18.6667"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          }
          disabled={disable}
          nameLabel="label"
          nameValue="value"
          // @ts-expect-error error
          formik={formik}
          name="refundMethod"
        />
        {formik?.values?.refundMethod === 'cart' && (
          <Input
            dir="ltr"
            label={'شماره کارت'}
            classNameLabel="text-[#616A76]"
            startContent={
              <span>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10.5001"
                    cy="10.5003"
                    r="2.33333"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15.1666 17.5003C15.1666 18.789 15.1666 19.8337 10.4999 19.8337C5.83325 19.8337 5.83325 18.789 5.83325 17.5003C5.83325 16.2117 7.92259 15.167 10.4999 15.167C13.0772 15.167 15.1666 16.2117 15.1666 17.5003Z"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2.33325 14.0003C2.33325 9.60055 2.33325 7.40066 3.70009 6.03383C5.06692 4.66699 7.26681 4.66699 11.6666 4.66699H16.3333C20.733 4.66699 22.9329 4.66699 24.2997 6.03383C25.6666 7.40066 25.6666 9.60055 25.6666 14.0003C25.6666 18.4001 25.6666 20.6 24.2997 21.9668C22.9329 23.3337 20.733 23.3337 16.3333 23.3337H11.6666C7.26681 23.3337 5.06692 23.3337 3.70009 21.9668C2.33325 20.6 2.33325 18.4001 2.33325 14.0003Z"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M22.1667 14H17.5001"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22.1667 10.5H16.3334"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22.1667 17.5H18.6667"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            }
            classNameInput="bg-[#f5f6f6] !pl-5 border-0"
            disabled={disable}
            name="shabaNumber"
            max={19}
            formik={formik}
            onChange={(e) =>
              formik.setFieldValue(
                'shabaNumber',
                addCommaCartBank(removeNumNumeric(e.target.value))
              )
            }
            description={'میبایست نام شماره کارت با نام فرد مطابقت داشته باشد.'}
            className="col-span-2 lg:col-span-1"
            type="tel"
          />
        )}

        <div className="col-span-2 flex justify-end py-4">
          <Button
            isPending={isPending}
            type="submit"
            className="h-[45px] bg-main px-5 text-white lg:h-[64px] lg:w-[140px]"
          >
            ویرایش اطلاعات کاربری
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActionUser;
