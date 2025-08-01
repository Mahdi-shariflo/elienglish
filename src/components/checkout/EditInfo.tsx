import { useSession } from '@/lib/auth/useSession';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Title from '../common/Title';
import Input from '../common/form/Input';
import Button from '../common/Button';
import { useUpdateUser } from '@/hooks/profile/useUpdateUser';

const EditInfo = () => {
  const { mutate, isPending } = useUpdateUser();
  const session = useSession();
  const [isEdited, setIsEdited] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({ data: values });
    },
  });
  useEffect(() => {
    if (session) {
      formik.setValues({
        firstName: session?.firstName as string,
        lastName: session?.lastName as string,
      });
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;

    const hasChanged =
      formik.values.firstName !== session.firstName || formik.values.lastName !== session.lastName;

    setIsEdited(hasChanged);
  }, [formik.values, session]);
  return (
    <div className="rounded-lg border-[#E5EAEF] dark:border-[#263248] lg:border lg:p-[25px]">
      <Title title="اطلاعات ثبت‌نام کننده" />
      <div className="mt-5 grid grid-cols-2 items-center gap-4 lg:mt-10 lg:flex">
        <Input label={'نام'} formik={formik} name="firstName" />
        <Input label={'نام خانوادگی'} formik={formik} name="lastName" />
        {isEdited && (
          <Button
            isPending={isPending}
            onClick={formik.handleSubmit}
            className="col-span-2 mt-2 w-full bg-main !px-10 text-white lg:mt-7 lg:w-fit"
          >
            ذخیره اطلاعات
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditInfo;
