import BaseDialog from '@/components/common/BaseDialog';
import React, { Dispatch, useState } from 'react';
import { FormikProps, useFormik } from 'formik';
import Input from '@/components/common/form/Input';
import Checkbox from '@/components/common/form/Checkbox';
import * as Yup from 'yup';
import Button from '@/components/common/Button';
import { Chip } from '@heroui/react';
import { Delete_icon } from '@/components/common/icon';
type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<any>;
};
const SelectPropertyModal = ({ open, setOpen, formik }: Props) => {
  const [properties, setProperties] = useState<
    { property: string; attribiute: string; main: boolean }[]
  >([]);
  const form = useFormik({
    initialValues: {
      property: '',
      attribiute: '',
      main: false,
    },
    validationSchema: Yup.object({
      property: Yup.string().required('نام اجباری است'),
      attribiute: Yup.string().required('مقدار اجباری است'),
    }),
    onSubmit: (values, { resetForm }) => {
      setProperties([...properties, values]);
      resetForm();
    },
  });

  const handleDelete = (index: number) => {
    const updated = [...properties];
    updated.splice(index, 1);
    setProperties(updated);
  };

  const onSubmit = () => {
    setOpen(false);
    formik.setFieldValue('properties', properties);
  };

  return (
    <>
      <BaseDialog
        classBody="!min-h-[500px] !px-3"
        nameBtnFooter="ادامه فرایند"
        onClickFooter={onSubmit}
        size="3xl"
        nameBtnBack="بستن"
        isOpen={open}
        onClose={() => {
          setOpen(!open);
        }}
        title=" ویژگی برای محصول"
      >
        <div className="container_category">
          <form onSubmit={form.handleSubmit} className="grid grid-cols-2 gap-4">
            <Input formik={form} label={'نام'} name="property" />
            <Input formik={form} label={'مقدار'} name="attribiute" />
            {/* @ts-expect-error Error */}
            <Checkbox formik={form} name="main" label="جز مقادیر اصلی" />
            <Button type="submit" className="bg-main text-white">
              اضافه کردن
            </Button>
          </form>
          <div className="mt-8 space-y-3">
            {properties?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-white p-3 py-1 shadow-medium"
              >
                <p className="font-medium">
                  <span>{item.property}:</span>
                  <span>{item.attribiute}</span>
                </p>
                <div className="flex items-center gap-4">
                  {item.main && <p className="font-medium">جز متغیر اصلی</p>}
                  <Button onClick={() => handleDelete(idx)} className="w-fit min-w-fit">
                    <Delete_icon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseDialog>
    </>
  );
};

export default SelectPropertyModal;
