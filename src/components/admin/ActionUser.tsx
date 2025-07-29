import BaseDialog from '@/components/common/BaseDialog';
import Datepicker from '@/components/common/Datepicker';
import Input from '@/components/common/form/Input';
import ReactSelect from '@/components/common/form/ReactSelect';
import { useActionUserAdmin } from '@/hooks/admin/users/useActionUserAdmin';
import { converDateGre } from '@/lib/convert';
import { User } from '@/store/types';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
type Props = {
  modal: {
    open: boolean;
    info: null | User;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: null | User;
    }>
  >;
};
const ActionUser = ({ modal, setModal }: Props) => {
  const { mutate, isPending, isSuccess } = useActionUserAdmin();
  const onClose = () => setModal({ open: false, info: null });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      Role: '',
      nationalCode: '',
      dateOfBirth: '',
      email: '',
      shabanumber: '',
      wallet: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('فیلد اجباری است'),
      lastName: Yup.string().required('فیلد اجباری است'),
      mobile: Yup.string().required('فیلد اجباری است'),
      Role: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        mobile: values.mobile,
        nationalCode: values.nationalCode,
        email: values.email,
        wallet: values.wallet,
        dateOfBirth: converDateGre(values.dateOfBirth),
        shabanumber: `${values.shabanumber}`,
        Role: values.Role,
      };
      mutate({ data, id: modal.info?._id });
    },
  });

  useEffect(() => {
    if (modal.info) {
      formik.setValues({
        ...formik.values,
        ...modal.info,
      });
    }
  }, [modal.info]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);
  return (
    <BaseDialog
      isOpen={modal.open}
      title="جزئیات کاربر"
      size="xl"
      onClickFooter={() => formik.handleSubmit()}
      onClose={onClose}
      isLoadingFooterBtn={isPending}
      nameBtnFooter={modal.info ? 'ویرایش' : 'ایجاد'}
      classBody="!overflow-visible w-[94%] mx-auto"
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          formik={formik}
          label="نام کاربر"
          placeholder=" "
          name="firstName"
          classNameInput={'!h-[45px] bg-[#f5f6f6]'}
          classNameLabel="!text-[12px]"
        />
        <Input
          formik={formik}
          label="نام‌خانوادگی کاربر"
          placeholder=" "
          name="lastName"
          classNameInput={'!h-[45px] bg-[#f5f6f6]'}
          classNameLabel="!text-[12px]"
        />
        <ReactSelect
          // @ts-expect-error error
          formik={formik}
          label="نقش کاربر"
          options={[
            { label: 'ادمین', value: 'ADMIN' },
            { label: 'کاربر عادی', value: 'USERS' },
            { label: 'سوپر ادمین', value: 'SUPERAD' },
            { label: 'سوپر ادمین', value: 'SUPERADMIN' },
          ]}
          name="Role"
          triggerClass="!h-[45px] bg-[#f5f6f6] !rounded-lg"
          classNameLabel="!text-[12px]"
        />
        <Input
          disabled={modal.info ? true : false}
          formik={formik}
          label="موبایل کاربر"
          placeholder=" "
          name="mobile"
          classNameInput={'!h-[45px] bg-[#f5f6f6]'}
          classNameLabel="!text-[12px]"
        />
        <Input
          formik={formik}
          label="کدملی کاربر"
          placeholder=" "
          name="nationalCode"
          classNameInput={'!h-[45px] bg-[#f5f6f6]'}
          classNameLabel="!text-[12px]"
          type="tel"
        />
        <Input
          formik={formik}
          label="ایمیل کاربر"
          placeholder=" "
          name="email"
          classNameInput={'!h-[45px] bg-[#f5f6f6]'}
          classNameLabel="!text-[12px]"
        />

        <Input
          formik={formik}
          label="شبا کاربر"
          placeholder=" "
          name="shabanumber"
          classNameInput={'!h-[45px] bg-[#f5f6f6]'}
          classNameLabel="!text-[12px]"
          type="tel"
        />
        <Datepicker
          formik={formik}
          label="تاریخ تولد کاربر"
          name="dateOfBirth"
          inputClass="!h-[45px]"
        />
        {/* <Input
                    className='col-span-2'
                    formik={formik}
                    label='ولت کاربر'
                    placeholder=' '
                    name="wallet"
                    classNameInput={"!h-[45px] bg-[#f5f6f6]"}
                    classNameLabel='!text-[12px]'

                /> */}
      </div>
    </BaseDialog>
  );
};

export default ActionUser;
