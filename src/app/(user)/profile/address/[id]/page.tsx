'use client';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddAddress } from '@/hooks/address/useAddAddress';
// import { Address } from "@/types";
import { useUpdateAddress } from '@/hooks/address/useUpdateAddress';
import { province } from '@/lib/provinces';
import { cities } from '@/lib/cities';
import { AllowNumAndPer } from '@/lib/regexes';
import { toEnglishDigits } from '@/lib/fun';
import Input from '@/components/common/form/Input';
// import Checkbox from "@/components/common/form/Checkbox";
import Select from '@/components/common/Select';
import Textarea from '@/components/common/form/Textarea';
import BackPrevPage from '@/components/common/BackPrevPage';
import Button from '@/components/common/Button';
import { useParams, useRouter } from 'next/navigation';
import { useGetAddressById } from '@/hooks/address/useGetAddressById';
import Loading from '@/components/common/Loading';
import { SharedSelection } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { User } from '@/store/types';

const ActionAddress = () => {
  const { id } = useParams();
  const { isSuccess: isSuccessSingleId, data, isLoading } = useGetAddressById();
  const session = useSession();
  const user = session.data as User;
  const { mutate, isPending, isSuccess } = useAddAddress();
  const {
    mutate: mutateUodate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateAddress();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      address: '',
      city: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      postalCode: '',
      province: '',
      title: '',
      other: false,
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .matches(AllowNumAndPer, 'لطفا ادرس را با حروف فارسی وارد کنید')
        .required('فیلد اجباری است'),
      city: Yup.string().required('فیلد اجباری است'),
      postalCode: Yup.string()
        .min(10, 'نباید کمتر از 10 رقم باشد')
        .max(10, 'نباید بیش از 10 رقم باشد')
        .matches(AllowNumAndPer, 'فقط عدد میتوانید وارد کنید')
        .required('فیلد اجباری است'),
      province: Yup.string().required('فیلد اجباری است'),
      firstName: Yup.string().required('فیلد اجباری است'),
      lastName: Yup.string().required('فیلد اجباری است'),
      mobileNumber: Yup.string().required('فیلد اجباری است'),
      title: Yup.string()
        .matches(AllowNumAndPer, 'لطفا ادرس را با حروف فارسی وارد کنید')
        .required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const findProvince = province.find((item) => item.slug === values.province);
      const data = {
        address: values.address,
        city: values.city,
        postalCode: toEnglishDigits(values.postalCode),
        title: values.title,
        province: findProvince?.slug,
        provinceLabel: findProvince?.name,
        mobileNumber: values.other ? values.mobileNumber : user?.mobile!,
        firstName: values.firstName,
        lastName: values.lastName,
        provinceCode: findProvince?.code,
      };
      if (id === 'new') {
        mutate({ data });
      } else {
        mutateUodate({ data, id: id?.toString() });
      }
    },
  });

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      router.back();
    }
  }, [isSuccess, isSuccessUpdate]);

  useEffect(() => {
    if (isSuccessSingleId && id !== 'new') {
      const address = data?.data?.data?.address;
      formik.setValues({
        ...formik.values,
        ...address,
      });
    } else {
      formik.resetForm();
    }
  }, [isSuccessSingleId, id]);

  //   const onValueChange = (value: boolean) => {
  //     const element = document.getElementById("body-modal");

  //     if (element) {
  //       setTimeout(() => {
  //         element.scrollTo({
  //           top: element.scrollHeight,
  //           behavior: "smooth", // اسکرول نرم~
  //         });
  //       }, 100); // تاخیر برای اطمینان از لود شدن کامل محتوا
  //     }

  //     formik.setFieldValue("other", value);
  //   };

  const findProvince = province.find((item) => item?.slug === formik?.values?.province);
  if (isLoading) return <Loading />;
  return (
    <div className="mb-32 pt-3">
      <BackPrevPage title="جزئیات آدرس" />
      <div className="container_page pt-5">
        <p className="font-medium text-[16px] text-[#616A76]">جزئیات آدرس را وارد کنید</p>
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-4 border-b border-[#E4E7E9] pb-4 lg:grid-cols-2">
            <Textarea
              label={'نشانی پستی'}
              isRequired
              classNameInput="bg-[#F5F6F6]"
              classNameLabel="text-[#616A76] text-[14px] lg:text-[16px] font-medium"
              className="lg:!col-span-2"
              name="address"
              formik={formik}
            />
            <Input
              label={'عنوان آدرس'}
              isRequired
              classNameInput="bg-[#F5F6F6] !h-[48px]"
              classNameLabel="text-[#616A76] text-[14px] lg:text-[16px] font-medium"
              className="lg:col-span-2"
              name="title"
              formik={formik}
            />
            <Select
              label="استان"
              options={province}
              nameLabel="name"
              nameValue="slug"
              isRequired
              name="province"
              formik={formik}
              onChange={(value) => {
                // @ts-expect-error ERROR
                formik?.setFieldValue('province', value.value);
                formik?.setFieldValue('city', '');
              }}
            />
            <Select
              label="شهر"
              options={cities.filter((item) => item.province_id === findProvince?.id)}
              nameLabel="name"
              nameValue="name"
              isRequired
              name="city"
              formik={formik}
              emptyMessage="ابتدا استان مورد نظر خود را انتخاب کنید"
            />

            {/* <Input
                            label={"محله"}
                            isRequired
                            classNameInput='bg-[#F5F6F6] !h-[48px]'
                            classNameLabel='text-[#616A76] text-[16px] font-medium'
                            className='col-span-2'
                        /> */}
            <div className="flex items-center gap-3 lg:col-span-2">
              {/* <Input
                                label={"پلاک"}
                                isRequired
                                classNameInput='bg-[#F5F6F6] !h-[48px]'
                                classNameLabel='text-[#616A76] text-[16px] font-medium'
                            />
                            <Input
                                label={"واحد"}
                                classNameInput='bg-[#F5F6F6] !h-[48px]'
                                classNameLabel='text-[#616A76] text-[16px] font-medium'
                            /> */}
              <Input
                label={'کدپستی'}
                classNameInput="bg-[#F5F6F6] !pl-5 !h-[48px] "
                classNameLabel="text-[#616A76] text-[14px] lg:text-[16px]font-medium"
                dir="ltr"
                min={10}
                max={10}
                formik={formik}
                type="tel"
                name="postalCode"
                description="کد پستی ده رقمی و بدون فاصله باشد"
                isRequired
              />
            </div>
          </div>
          {/* <Checkbox
            label="گیرنده خودم نیستم."
            className="lg:col-span-2 mt-4"
            name="other"
            // @ts-expect-error error
            formik={formik}
            onValueChange={onValueChange}
          /> */}

          {
            <div className="mt-5">
              <p className="font-medium text-[16px] text-[#616A76]">مشخصات گیرنده سفارش</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <Input
                  label={'نام گیرنده'}
                  isRequired
                  classNameInput="bg-[#F5F6F6] !h-[48px]"
                  classNameLabel="text-[#616A76] text-[14px] lg:text-[16px] font-medium"
                  formik={formik}
                  name="firstName"
                />
                <Input
                  label={'نام خانوادگی گیرنده'}
                  isRequired
                  classNameInput="bg-[#F5F6F6] !h-[48px]"
                  classNameLabel="text-[#616A76] text-[14px] lg:text-[16px] font-medium"
                  name="lastName"
                  formik={formik}
                />
                <Input
                  label={'شماره موبایل گیرنده'}
                  isRequired
                  classNameInput="bg-[#F5F6F6] !pl-5 !h-[48px]"
                  classNameLabel="text-[#616A76] text-[14px] lg:text-[16px] font-medium"
                  type="tel"
                  formik={formik}
                  name="mobileNumber"
                />
              </div>
            </div>
          }

          <Button
            isLoading={isPending || isPendingUpdate}
            onClick={() => formik.handleSubmit()}
            className="mt-5 bg-main text-white"
          >
            {id !== 'new' ? 'ویرایش آدرس' : 'ثبت آدرس'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionAddress;
