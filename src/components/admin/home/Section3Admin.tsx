'use client';

import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Checkbox from '@/components/common/form/Checkbox';
import { removeNumNumeric } from '@/lib/convert';
import Link from 'next/link';
import { Delete_icon, Toman_Icon } from '@/components/common/icon';

type Props = {
  formik: FormikProps<any>;
  data?: any;
};

const Section3Admin = ({ formik, data }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useFormik({
    initialValues: {
      title: '',
      subTitle: '',
      price: '',
      special: false,
      btn: {
        title: '',
        href: '',
      },
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      formik.setValues({
        sec: 'section3',
        id: formik.values._id,
        section3: [
          ...formik?.values?.section3,
          { ...values, price: removeNumNumeric(values.price) },
        ],
      });
      resetForm();
      setOpen(false);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: 'section3',
        _id: formik.values._id,
        section3: data,
      });
    }
  }, [data]);

  const onOpen = () => {
    setOpen(true);
  };
  const onDelete = (index: number) => {
    const updated = [...formik.values.section3];
    updated.splice(index, 1);
    formik.setFieldValue('section3', updated);
  };
  return (
    <>
      <Button onClick={onOpen}>ویرایش سکشن ۳</Button>

      {formik?.values?.section3?.map((item: any, idx: number) => (
        <Link
          key={idx}
          href={item?.btn?.href}
          className="relative flex w-full cursor-pointer flex-col rounded-xl border border-[#E5EAEF] bg-white p-4 transition-all duration-400 hover:border-main hover:bg-transparent"
        >
          <p className="font-bold text-[20px]">{item?.title}</p>
          <div className="mt-3 flex items-center justify-between">
            <p className="font-medium text-[16px] text-main">{item?.subTitle}</p>
            <p className="flex items-center gap-1 font-medium text-[18px]">
              {Number(item?.price).toLocaleString()} <Toman_Icon />
            </p>
          </div>
          <div className="mt-2 flex h-[35px] w-[185px] items-center justify-center gap-2 self-end rounded-lg bg-main font-medium text-white">
            <span className="text-[14px]">{item?.btn?.title}</span>
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5402 9.00027L8.88021 3.46027C8.3575 3.15843 7.76421 3.00031 7.16061 3.00197C6.557 3.00362 5.96459 3.165 5.44354 3.46971C4.92249 3.77442 4.49137 4.2116 4.19396 4.73685C3.89655 5.2621 3.74345 5.8567 3.75021 6.46027V17.5803C3.75021 18.4873 4.11053 19.3572 4.75191 19.9986C5.39328 20.6399 6.26317 21.0003 7.17021 21.0003C7.77065 20.9993 8.3603 20.8406 8.88021 20.5403L18.5402 15.0003C19.0593 14.6999 19.4902 14.2682 19.7898 13.7487C20.0894 13.2292 20.2471 12.64 20.2471 12.0403C20.2471 11.4405 20.0894 10.8514 19.7898 10.3318C19.4902 9.8123 19.0593 9.38068 18.5402 9.08027V9.00027ZM17.5402 13.1903L7.88021 18.8103C7.6637 18.933 7.41908 18.9975 7.17021 18.9975C6.92135 18.9975 6.67673 18.933 6.46021 18.8103C6.24431 18.6856 6.06503 18.5063 5.9404 18.2904C5.81576 18.0745 5.75017 17.8296 5.75021 17.5803V6.42027C5.75017 6.17097 5.81576 5.92605 5.9404 5.71013C6.06503 5.49422 6.24431 5.31492 6.46021 5.19027C6.67762 5.06943 6.92151 5.00416 7.17021 5.00027C7.41875 5.00537 7.66235 5.07056 7.88021 5.19027L17.5402 10.7703C17.7562 10.8949 17.9356 11.0741 18.0603 11.2901C18.185 11.506 18.2506 11.7509 18.2506 12.0003C18.2506 12.2496 18.185 12.4946 18.0603 12.7105C17.9356 12.9264 17.7562 13.1057 17.5402 13.2303V13.1903Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
          {onDelete && (
            <button
              className="absolute left-6 top-3 flex !h-[40px] !w-[40px] !min-w-[40px] items-center justify-center rounded-full bg-white p-1"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(idx);
              }}
            >
              <Delete_icon />
            </button>
          )}
        </Link>
      ))}

      <BaseDialog
        onClose={() => setOpen(false)}
        title="افزودن دوره جدید"
        isOpen={open}
        onClickFooter={() => form.handleSubmit()}
        classBody="!overflow-visible px-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="عنوان"
            name="title"
            formik={form}
            classNameInput="!h-[45px] !bg-[#f5f6f6]"
          />
          <Input
            label="زیرعنوان"
            name="subTitle"
            formik={form}
            classNameInput="!h-[45px] !bg-[#f5f6f6]"
          />
          <Input
            label="قیمت"
            name="price"
            price
            formik={form}
            classNameInput="!h-[45px] !bg-[#f5f6f6]"
          />

          <Input
            label="عنوان دکمه"
            name="btn.title"
            formik={form}
            classNameInput="!h-[45px] !bg-[#f5f6f6]"
          />
          <Input
            label="لینک دکمه"
            name="btn.href"
            formik={form}
            classNameInput="!h-[45px] !bg-[#f5f6f6]"
          />
          {/* @ts-expect-error error */}
          <Checkbox
            className="col-span-2"
            label="ایا جز دوره خاص است؟"
            formik={form}
            name="special"
          />
        </div>
      </BaseDialog>
    </>
  );
};

export default Section3Admin;
