import React, { Dispatch, SetStateAction, useEffect } from 'react';
import BaseDialog from '../common/BaseDialog';
import ActionUser from './ActionUser';
import { useUpdateUser } from '@/hooks/profile/useUpdateUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { removeEmptyFields } from '@/lib/fun';
import { namePattern } from '@/lib/regexes';
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const ModalInformation = ({ open, setOpen }: Props) => {
  const { mutate, isPending, isSuccess } = useUpdateUser();
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
        .matches(namePattern, 'لطفا ادرس را با حروف فارسی وارد کنید')
        .required('فیلد اجباری است'),
      lastName: Yup.string()
        .matches(namePattern, 'لطفا ادرس را با حروف فارسی وارد کنید')
        .required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      mutate({ data: removeEmptyFields(values) });
    },
  });
  const onClose = () => setOpen(!open);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);
  return (
    <div>
      <BaseDialog
        isOpen={open}
        title="ویرایش اطلاعات کاربری"
        onClickFooter={() => formik.handleSubmit()}
        size="3xl"
        onClose={onClose}
        isLoadingFooterBtn={isPending}
      >
        <ActionUser showEdit formik={formik} disable={false} />
      </BaseDialog>
    </div>
  );
};

export default ModalInformation;
