'use client';
import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import { useUpdateDigitalOrderById } from '@/hooks/admin/orders/digital/useUpdateDigitalOrderById';

import { Order } from '@/store/types/home';
import { useFormik } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DigitalOrderStatus = ({ order }: { order: Order }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isPending: isLoading, isSuccess } = useUpdateDigitalOrderById();
  const formik = useFormik({
    initialValues: {
      status: '',
      orderTrackingCodeType: '',
      orderTrackingCode: '',
    },
    onSubmit: (values) => {
      const data = {
        status: values.status,
      };
      mutate({ data, id: order._id });
      // TODO: handle form submission
    },
  });
  const onChangeStatus = (e: { value: string }) => {
    router.push(`${pathname}/?status=${e.value}`);
    formik.setFieldValue('status', e.value);
  };

  useEffect(() => {
    if (order && !formik.values.status) {
      router.push(`${pathname}/?status=${order.productDigitalItems?.status}`);

      formik.setFieldValue('status', order.productDigitalItems?.status);
    }
  }, [order]);
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        جزئیات سفارش
      </p>
      <form onSubmit={formik.handleSubmit} className="mt-5 space-y-6">
        <Select
          options={[
            {
              value: 'PENDING',
              label: 'در حال انتظار',
            },
            {
              label: 'در دسترس',
              value: 'AVAILABLE',
            },
            {
              label: 'منقضی شده',
              value: 'EXPIRED',
            },
          ]}
          label="وضعیت"
          name="status"
          nameLabel="label"
          nameValue="value"
          formik={formik}
          // @ts-expect-error error
          onChange={onChangeStatus}
        />

        <Button
          isPending={isLoading}
          onClick={() => setOpen(true)}
          className="!mt-7 bg-main text-white"
        >
          به روز رسانی
        </Button>
      </form>
      {/* <Button disabled={isLoading} onClick={() => setModalStatusSnap(true)} className='border mt-4 hover:bg-green-600 text-[#0c0c0c] hover:text-white'>
        پیگیری سفارش سمت اسنپ
      </Button> */}
      <DialogCantUpdate formik={formik} open={open} setOpen={setOpen} />
    </div>
  );
};

export default DigitalOrderStatus;

type Props = {
  id?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  formik?: unknown;
};

export const DialogCantUpdate = ({ open, setOpen, formik }: Props) => {
  const onClose = () => setOpen(false);
  return (
    <BaseDialog size="md" isOpen={open} onClose={onClose} title="هشدار">
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
          تغیرات اعمال شده قابل بازگشت نیست، آیا مطمئن هستید که میخواهید تغیرات را اعمال کنید؟
        </p>
        {/* @ts-expect-error */}
        <Button onClick={() => formik.handleSubmit()} className="mt-6 bg-main text-white">
          اعمال تغیرات
        </Button>
      </div>
    </BaseDialog>
  );
};
