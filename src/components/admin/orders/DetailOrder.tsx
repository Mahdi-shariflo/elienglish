'use client';
import BaseDialog from '@/components/common/BaseDialog';
import { convertDatePer } from '@/lib/convert';
import useOrderStore from '@/store/order-store';
import { Order } from '@/types/home';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { province } from '@/lib/data';
import Textarea from '@/components/common/form/Textarea';
import Input from '@/components/common/form/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import { Edit_icon } from '@/components/common/icon';
import { useSearchParams } from 'next/navigation';
const DetailOrder = ({ order }: { order: Order }) => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const { setAddress, address } = useOrderStore();
  useEffect(() => {
    if (order) {
      setAddress(order?.orderAddress);
    }
  }, [order]);
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
    },
    validationSchema: Yup.object({
      address: Yup.string().required('فیلد اجباری است'),
      city: Yup.string().required('فیلد اجباری است'),
      firstName: Yup.string().required('فیلد اجباری است'),
      lastName: Yup.string().required('فیلد اجباری است'),
      mobileNumber: Yup.string().required('فیلد اجباری است'),
      postalCode: Yup.string().required('فیلد اجباری است'),
      province: Yup.string().required('فیلد اجباری است'),
      title: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const findProvince = province.find((item) => item.value === values.province);
      const data = {
        address: values.address,
        city: values.city,
        mobileNumber: values.mobileNumber,
        postalCode: values.postalCode,
        title: values.title,
        province: findProvince?.value,
        provinceLabel: findProvince?.label,
        firstName: values.firstName,
        lastName: values.lastName,
      };

      setAddress(data);
      setOpen(false);

      // if (modal.info) {
      //     mutateUodate({ data, id: modal.info._id! })
      // } else {
      //     mutate({ data })

      // }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (address) {
      formik.setValues({
        ...formik.values,
        ...address,
      });
    }
  }, [address]);

  const onClose = () => setOpen(!open);
  if (!order) return null;
  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        جزئیات سفارش
      </p>
      <p className="mt-4 font-regular text-[14px] text-[#7D8793]">
        شماره سفارش: <span className="text-[#0C0C0C]">{order?.orderNumber}</span>
      </p>
      <div className="mt-5 flex items-start gap-10">
        <div className="w-full">
          <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
            صورت حساب
          </p>

          <div className="mt-3 space-y-3">
            <p className="font-regular text-[14px] text-[#7D8793]">
              شماره موبایل مشتری: <span className="text-[#0C0C0C]">{order?.author?.mobile}</span>
            </p>
            <p className="font-regular text-[14px] text-[#7D8793]">
              نام‌ونام‌خانوادگی:
              <span className="text-[#0C0C0C]">
                {order?.author?.firstName} {order.author.lastName}
              </span>
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between border-b border-[#E4E7E9] pb-3">
            <p className="font-medium text-[14px] text-[#0C0C0C] lg:text-[18px]">حمل و نقل</p>
            {searchParams.get('status') === 'Review' && (
              <Button className="!h-6 w-fit min-w-fit" onClick={() => setOpen(!open)}>
                <Edit_icon />
              </Button>
            )}
          </div>

          <div className="mt-3 space-y-3">
            <p className="font-regular text-[14px] text-[#7D8793]">
              تاریخ ثبت سفارش:{' '}
              <span className="text-[#0C0C0C]">
                {convertDatePer(order.createdAt)} {convertDatePer(order.createdAt, true)}
              </span>
            </p>

            <p className="font-regular text-[14px] text-[#7D8793]">
              نام‌ونام‌خانوادگی:
              <span className="text-[#0C0C0C]">
                {address?.firstName} {address?.lastName}
              </span>
            </p>
            <p className="font-regular text-[14px] text-[#7D8793]">
              آدرس:{' '}
              <span className="text-[#0C0C0C]">
                {address?.provinceLabel}-{address?.address}
              </span>
            </p>
            <p className="font-regular text-[14px] text-[#7D8793]">
              کد پستی: <span className="text-[#0C0C0C]">{address?.postalCode}</span>
            </p>
            <p className="font-regular text-[14px] text-[#7D8793]">
              تلفن همراه برای آدرس ثبت شده :{' '}
              <span className="text-[#0C0C0C]">{address?.mobileNumber}</span>
            </p>
          </div>
        </div>
      </div>

      <BaseDialog
        onClose={onClose}
        isOpen={open}
        title="ویرایش آدرس"
        onClickFooter={formik.handleSubmit}
        nameBtnFooter="ویرایش"
      >
        <div>
          <p className="font-medium text-[16px] text-[#616A76]">جزئیات آدرس را وارد کنید</p>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 border-b border-[#E4E7E9] pb-4">
              <Textarea
                label={'نشانی پستی'}
                isRequired
                classNameInput="bg-[#F5F6F6]"
                classNameLabel="text-[#616A76] text-[16px] font-medium"
                className="!col-span-2"
                name="address"
                formik={formik}
              />
              <Input
                label={'عنوان آدرس'}
                isRequired
                classNameInput="bg-[#F5F6F6] !h-[48px]"
                classNameLabel="text-[#616A76] text-[16px] font-medium"
                className="col-span-2"
                name="title"
                formik={formik}
              />
              <Select
                label="استان"
                options={province}
                nameLabel="label"
                nameValue="value"
                isRequired
                name="province"
                formik={formik}
              />
              <Input
                label={'شهر'}
                isRequired
                classNameInput="bg-[#F5F6F6] !h-[48px]"
                classNameLabel="text-[#616A76] text-[16px] font-medium"
                name="city"
                formik={formik}
              />
              {/* <Input
                            label={"محله"}
                            isRequired
                            classNameInput='bg-[#F5F6F6] !h-[48px]'
                            classNameLabel='text-[#616A76] text-[16px] font-medium'
                            className='col-span-2'
                        /> */}
              <div className="col-span-2 flex items-center gap-3">
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
                  classNameInput="bg-[#F5F6F6] !h-[48px] "
                  classNameLabel="text-[#616A76] text-[16px] font-medium"
                  formik={formik}
                  name="postalCode"
                />
              </div>
            </div>

            <div className="mt-5">
              <p className="font-medium text-[16px] text-[#616A76]">مشخصات گیرنده سفارش</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {/* <Checkbox
                                label='گیرنده خودم هستم.'
                                className='col-span-2'
                            /> */}
                <Input
                  label={'نام گیرنده'}
                  isRequired
                  classNameInput="bg-[#F5F6F6] !h-[48px]"
                  classNameLabel="text-[#616A76] text-[16px] font-medium"
                  formik={formik}
                  name="firstName"
                />
                <Input
                  label={'نام خانوادگی گیرنده'}
                  isRequired
                  classNameInput="bg-[#F5F6F6] !h-[48px]"
                  classNameLabel="text-[#616A76] text-[16px] font-medium"
                  name="lastName"
                  formik={formik}
                />
                <Input
                  label={'شماره موبایل گیرنده'}
                  isRequired
                  classNameInput="bg-[#F5F6F6] !h-[48px]"
                  classNameLabel="text-[#616A76] text-[16px] font-medium"
                  formik={formik}
                  name="mobileNumber"
                />
              </div>
            </div>
          </div>
        </div>
      </BaseDialog>
    </div>
  );
};

export default DetailOrder;
