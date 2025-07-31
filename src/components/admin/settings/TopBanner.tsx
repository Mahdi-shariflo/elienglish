import Media from '@/components/admin/common/Media';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import { useActionSetting } from '@/hooks/admin/settings/useActionSetting';
import { useGetSetting } from '@/hooks/admin/settings/useGetSetting';
import { BASEURL } from '@/lib/variable';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';

const TopBanner = () => {
  const { data, isSuccess } = useGetSetting();
  const { mutate, isPending } = useActionSetting();
  const formik = useFormik({
    initialValues: {
      desktopImageUrl: '',
      mobileImageUrl: '',
      href: '',
    },
    onSubmit: (values) => {
      const mainData = {
        desktopImageUrl:
          typeof values?.desktopImageUrl === 'object'
            ? // @ts-expect-error error
              values.desktopImageUrl.url
            : values.desktopImageUrl,

        mobileImageUrl:
          typeof values?.mobileImageUrl === 'object'
            ? // @ts-expect-error error
              values.mobileImageUrl.url
            : values.mobileImageUrl,
        href: values.href,
      };
      mutate({ data: { BannerUpHeader: mainData } });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const loginSlider = data?.data?.data?.BannerUpHeader;
      formik.setValues(loginSlider);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={formik.handleSubmit} className="mt-20 w-full space-y-8">
      {/* تصویر دسکتاپ */}
      <Media
        withModal
        className="!flex !w-full flex-1"
        onSelect={(media) => formik.setFieldValue('desktopImageUrl', media)}
      >
        <div className="flex h-[68px] !w-full items-center justify-center rounded-lg border border-dashed font-regular">
          {formik.values?.desktopImageUrl ? (
            <picture className="w-full">
              <source
                type="image/webp"
                // @ts-expect-error ERROR
                srcSet={`${BASEURL}/${typeof formik.values.desktopImageUrl === 'object' ? formik.values?.desktopImageUrl?.url : formik.values.mobileImageUrl}`}
              />
              <source
                type="image/jpeg"
                // @ts-expect-error ERROR

                srcSet={`${BASEURL}/${typeof formik.values.desktopImageUrl === 'object' ? formik.values?.desktopImageUrl?.url : formik.values.mobileImageUrl}`}
              />
              <img
                className="inline-block h-full w-full cursor-pointer overflow-hidden rounded-xl object-cover"
                // @ts-expect-error ERROR

                src={`${BASEURL}/${typeof formik.values.desktopImageUrl === 'object' ? formik.values?.desktopImageUrl?.url : formik.values.mobileImageUrl}`}
              />
            </picture>
          ) : (
            <p>انتخاب بنر برای دسکتاپ</p>
          )}
        </div>
      </Media>

      {/* تصویر موبایل */}
      <Media
        onSelect={(media) => formik.setFieldValue('mobileImageUrl', media)}
        withModal
        className="!w-full flex-1"
      >
        <div className="flex h-[48px] !w-full items-center justify-center rounded-lg border border-dashed font-regular">
          {formik.values?.mobileImageUrl ? (
            <picture className="w-full">
              <source
                type="image/webp"
                // @ts-expect-error ERROR
                srcSet={`${BASEURL}/${typeof formik.values?.mobileImageUrl === 'object' ? formik.values?.mobileImageUrl?.url : formik.values.mobileImageUrl}`}
              />
              <source
                type="image/jpeg"
                // @ts-expect-error ERROR

                srcSet={`${BASEURL}/${typeof formik.values?.mobileImageUrl === 'object' ? formik.values?.mobileImageUrl?.url : formik.values.mobileImageUrl}`}
              />
              <img
                className="inline-block h-full w-full cursor-pointer overflow-hidden rounded-xl object-cover"
                // @ts-expect-error ERROR

                src={`${BASEURL}/${typeof formik.values?.mobileImageUrl === 'object' ? formik.values?.mobileImageUrl?.url : formik.values.mobileImageUrl}`}
              />
            </picture>
          ) : (
            <p>انتخاب بنر برای موبایل</p>
          )}
        </div>
      </Media>

      {/* لینک بنر */}
      <div>
        <Input type="text" name="href" placeholder="لینک بنر" formik={formik} />
      </div>

      {/* دکمه ارسال */}
      <div>
        <Button
          isPending={isPending}
          type="submit"
          className="rounded-lg bg-main px-6 py-2 font-regular text-white"
        >
          ذخیره بنر
        </Button>
      </div>
    </form>
  );
};

export default TopBanner;
