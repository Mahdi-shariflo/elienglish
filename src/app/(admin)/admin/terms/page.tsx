'use client';
import Editor from '@/components/admin/common/Editor';
import Button from '@/components/common/Button';
import { useActionSetting } from '@/hooks/admin/settings/useActionSetting';
import { useGetSetting } from '@/hooks/admin/settings/useGetSetting';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
const Page = () => {
  const editorRef = useRef<HTMLInputElement | null>(null);
  const { data, isSuccess } = useGetSetting();
  const { mutate, isPending } = useActionSetting();
  const formik = useFormik({
    initialValues: {
      siteRules: '',
    },
    onSubmit: () => {
      mutate({
        data: {
          // @ts-expect-error error
          siteRules: editorRef?.current?.getContent(),
        },
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.setFieldValue('siteRules', data.data?.data?.siteRules);
    }
  }, [isSuccess]);
  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        صفحه شرایط و قوانین
      </p>
      <form onSubmit={formik.handleSubmit}>
        {/* @ts-expect-error error */}
        <Editor value={formik.values.siteRules} editorRef={editorRef} />
        <div className="flex justify-end">
          <Button isPending={isPending} className="mt-5 w-[120px] bg-main text-white" type="submit">
            ثبت
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
