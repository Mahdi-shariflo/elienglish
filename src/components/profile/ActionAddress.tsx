'use client';
import React, { useEffect } from 'react';
import BaseDialog from '../common/BaseDialog';
import Textarea from '../common/form/Textarea';
import Input from '../common/form/Input';
import Select from '../common/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddAddress } from '@/hooks/address/useAddAddress';
import { Address, User } from '@/types';
import { useUpdateAddress } from '@/hooks/address/useUpdateAddress';
import { useMedia } from 'react-use';
import { province } from '@/lib/provinces';
import { cities } from '@/lib/cities';
import { AllowNumAndPer } from '@/lib/regexes';
import { removeEmptyFields, toEnglishDigits } from '@/lib/fun';
import { SharedSelection } from '@heroui/react';
import { useSession } from 'next-auth/react';
type Props = {
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: null | Address;
    }>
  >;
  modal: {
    open: boolean;
    info: null | Address;
  };
};
const ActionAddress = ({ modal, setModal }: Props) => {
  const isMobile = useMedia('(max-width: 480px)', false);
  const session = useSession();
  const user = session?.data as User;
  const { mutate, isPending, isSuccess } = useAddAddress();
  const {
    mutate: mutateUodate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateAddress();
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
      other: true,
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
        postalCode: toEnglishDigits(values.postalCode).toString(),
        title: values.title,
        province: findProvince?.slug,
        provinceLabel: findProvince?.name,
        mobileNumber: values.other ? values.mobileNumber.toString() : user?.mobile?.toString()!,
        firstName: values.firstName,
        lastName: values.lastName,
        provinceCode: findProvince?.code,
      };
      if (modal.info) {
        mutateUodate({ data: removeEmptyFields(data), id: modal.info._id! });
      } else {
        mutate({ data });
      }
    },
  });
  const onClose = () => {
    setModal({ open: false, info: null });
    formik.setValues({
      address: '',
      city: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      postalCode: '',
      province: '',
      title: '',
      other: false,
    });
  };

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      onClose();
    }
  }, [isSuccess, isSuccessUpdate]);

  useEffect(() => {
    if (modal.info) {
      formik.setValues({
        ...formik.values,
        ...modal.info,
        firstName: modal.info.firstName,
        lastName: modal.info.lastName,
      });
    }
  }, [modal.info]);

  const findProvince = province.find((item) => item?.slug === formik?.values?.province);

  return (
    <BaseDialog
      isOpen={modal.open}
      title="جزئیات آدرس"
      nameBtnFooter={modal.info ? 'ویرایش آدرس' : 'ثبت آدرس'}
      onClickFooter={formik.handleSubmit}
      onClose={onClose}
      isLoadingFooterBtn={isPending || isPendingUpdate}
      size={isMobile ? 'full' : 'xl'}
    >
      <div>
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
                        label='گیرنده خودم نیستم.'
                        className='lg:col-span-2 mt-4'
                        name='other'
                        // @ts-expect-error error
                        formik={formik}
                        onValueChange={onValueChange}

                    /> */}

          {
            // formik.values.other &&
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
        </div>
      </div>
    </BaseDialog>
  );
};

export default ActionAddress;
