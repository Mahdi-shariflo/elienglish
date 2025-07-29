import React, { useEffect, useState } from 'react';
import BaseDialog from '../common/BaseDialog';
import ReactSelect from '../common/form/ReactSelect';
import { province } from '@/lib/provinces';
import Input from '../common/form/Input';
import Media from './common/Media';
import Checkbox from '../common/form/Checkbox';
import Button from '../common/Button';
import { useFormik } from 'formik';
import { removeNumNumeric } from '@/lib/convert';
import { BASEURL } from '@/lib/variable';
import { Delete_icon, Edit_icon } from '../common/icon';
import { useActionTransport } from '@/hooks/admin/transports/useActionTransport';
import { Transport } from '@/store/types';
import { useGetTransportByIdAdmin } from '@/hooks/admin/transports/useGetTransportByIdAdmin';
type Props = {
  modal: {
    open: boolean;
    info: null | Transport;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: null | Transport;
    }>
  >;
};
const ActionTransportAdmin = ({ modal, setModal }: Props) => {
  const {
    isSuccess: isSuccessById,
    isLoading,
    data,
  } = useGetTransportByIdAdmin({ id: modal.info?._id! });
  const [editIndex, setEditIndex] = useState<number | null>(null); // ایندکس آیتم در حال ویرایش
  const { mutate, isPending, isSuccess } = useActionTransport();
  const onClose = () => setModal({ info: null, open: false });
  const formik = useFormik<any>({
    initialValues: {
      city: '',
      shippingMethod: [],
      type: '',
      shippingPrice: '',
      shippingTime: '',
      isShippingFree: false,
    },
    onSubmit: (values) => {
      const data = {
        shippingMethod: values.shippingMethod.map((item: any) => {
          return {
            ...item,
            icon: item.icon?._id,
            shippingPrice: Number(removeNumNumeric(item?.shippingPrice)),
          };
        }),
        city: values.city,
      };

      mutate({ data, id: modal?.info?._id! });
      // if (modal.info) {
      //     mutateUpdate({ data, id: modal.info._id })
      // } else {
      //     mutate(data)
      // }
    },
  });

  const onAdd = () => {
    if (formik.values.type && formik.values.shippingPrice) {
      const transport = {
        type: formik.values.type,
        shippingPrice: formik.values.shippingPrice,
        shippingTime: formik.values.shippingTime,
        isShippingFree: formik.values.isShippingFree,
        ...(formik.values?.icon ? { icon: formik.values.icon } : null),
      };

      if (editIndex !== null) {
        const updatedShippingMethod = [...formik.values.shippingMethod];
        updatedShippingMethod[editIndex] = transport;
        formik.setValues({
          ...formik.values,
          shippingMethod: updatedShippingMethod,
          type: '',
          shippingPrice: '',
          shippingTime: '',
          isShippingFree: false,
          icon: null,
        });
        setEditIndex(null); // بازگشت به حالت عادی
      } else {
        formik.setValues({
          ...formik.values,
          type: '',
          shippingPrice: '',
          shippingTime: '',
          isShippingFree: false,
          icon: null,
          shippingMethod: [...formik.values.shippingMethod, transport],
        });
      }
    }
  };

  const onEdit = (item: any, index: number) => {
    setEditIndex(index);
    formik.setValues({
      ...formik.values,
      type: item.type,
      shippingPrice: item.shippingPrice,
      shippingTime: item.shippingTime,
      isShippingFree: item.isShippingFree,
      icon: item?.icon,
    });
  };

  const onRemove = (editIndex: number) => {
    const filterArr = formik.values.shippingMethod.filter(
      (_: string, idx: number) => idx !== editIndex
    );
    formik.setFieldValue('shippingMethod', filterArr);
    setEditIndex(null);
  };

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessById) {
      const transport = data.data.data.transports[0];
      formik.setValues({
        ...formik.values,
        city: transport.city,
        shippingMethod: transport.shippingMethod,
      });
    }
  }, [isSuccessById]);

  return (
    <BaseDialog
      isOpen={modal.open}
      title={'ایجاد حمل و نقل'}
      onClickFooter={() => formik.handleSubmit()}
      onClose={onClose}
      isLoadingFooterBtn={isPending}
      isLoading={isLoading}
    >
      <div>
        <div className="grid grid-cols-2 gap-3">
          <ReactSelect
            label="انتخاب استان"
            // @ts-expect-error options
            options={province}
            nameLabel="name"
            nameValue="slug"
            triggerClass="!h-[45px]"
            className="col-span-2"
            name="city"
            formik={formik}
          />
          <Input
            classNameInput={'!h-[45px] bg-[#f5f6f6]'}
            label={'نوع پست'}
            name="type"
            formik={formik}
          />
          <Input
            classNameInput={'!h-[45px] bg-[#f5f6f6]'}
            label={'مدت زمان ارسال کالا'}
            placeholder="2 تا 3"
            name="shippingTime"
            formik={formik}
          />
          <Input
            classNameInput={'!h-[45px] bg-[#f5f6f6]'}
            label={'هزینه'}
            price
            name="shippingPrice"
            formik={formik}
          />
          <Media withModal onSelect={(media) => formik.setFieldValue('icon', media)}>
            <p className="pb-2 text-right font-regular">انتخاب ایکن</p>
            <div className="flex h-[45px] w-full items-center justify-start rounded-lg border border-gray-200 bg-[#f5f6f6] px-2 font-regular text-[12px] text-gray-300">
              {formik.values.icon ? (
                <img
                  className="block h-10 w-10 rounded-full object-cover"
                  src={`${BASEURL}/${formik.values.icon?.url}`}
                />
              ) : (
                'انتخاب کنید (50px * 50px)'
              )}
            </div>
          </Media>
          <Checkbox
            formik={formik}
            name="isShippingFree"
            label="اگر سبد خرید کاربر 850 هزارتومان به بالا بود، قیمت صفر شود"
          />
          <Button
            onClick={onAdd}
            className="border border-main bg-opacity-50 text-main hover:bg-main hover:text-white"
          >
            {editIndex === null ? 'ایجاد' : 'ویرایش'}
          </Button>
        </div>
        {formik?.values?.shippingMethod?.length === 0 ? null : (
          <div className="mt-5 space-y-2">
            {formik?.values?.shippingMethod?.map((item: any, idx: number) => (
              <div
                className="font-num grid w-full grid-cols-3 gap-2 rounded-lg bg-green-400 bg-opacity-15 p-3 text-[12px]"
                key={idx}
              >
                <p className="whitespace-nowrap font-bold">
                  نوع پست: <span className="font-medium text-gray-700">{item.type}</span>
                </p>

                <p className="whitespace-nowrap font-medium">
                  هزینه ارسال:{' '}
                  <span className="font-num font-medium text-gray-700">
                    {Number(removeNumNumeric(item.shippingPrice)).toLocaleString()} تومان
                  </span>
                </p>

                <p className="font-bold">
                  مدت زمان: <span className="font-medium text-gray-700">{item.shippingTime}</span>
                </p>

                <p className="font-medium">
                  اگر سبد خرید کاربر 850 هزار تومان به بالا بود، قیمت صفر شود?
                  <span className="font-medium text-gray-700">
                    {item.isShippingFree ? 'بله' : 'خیر'}
                  </span>
                </p>
                {item?.icon && (
                  <p className="flex items-center gap-2 font-bold">
                    آیکن:
                    <img
                      className="block h-10 w-10 rounded-full object-cover"
                      src={`${BASEURL}/${item?.icon?.url}`}
                    />
                  </p>
                )}
                <div className="flex gap-2">
                  <Button onClick={() => onEdit(item, idx)} className="w-fit min-w-fit">
                    <Edit_icon />
                  </Button>
                  <Button onClick={() => onRemove(idx)} className="w-fit min-w-fit">
                    <Delete_icon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseDialog>
  );
};

export default ActionTransportAdmin;
