import Media from '@/components/admin/common/Media';
import { BASEURL } from '@/lib/variable';
import { Home } from '@/types/home';
import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const TopBanner = ({ formik, data }: Props) => {
  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: data.title,
        ...(data._id ? { id: data._id } : null),
        bannerTopHeaderDesktop: data.bannerTopHeaderDesktop,
        bannerTopHeaderMobile: data.bannerTopHeaderMobile,
      });
    }
  }, [data]);
  return (
    <div className="w-full space-y-8">
      <Media
        withModal
        className="!flex !w-full flex-1"
        onSelect={(media) => formik.setFieldValue('bannerTopHeaderDesktop', media)}
      >
        <div className="flex h-[68px] !w-full items-center justify-center rounded-lg border border-dashed font-regular">
          {formik.values?.bannerTopHeaderDesktop ? (
            <picture className="w-full">
              <source
                type="image/webp"
                srcSet={`${BASEURL}/${formik.values?.bannerTopHeaderDesktop?.url}`}
              />
              <source
                type="image/jpeg"
                srcSet={`${BASEURL}/${formik.values?.bannerTopHeaderDesktop?.url}`}
              />
              <img
                className="inline-block h-full w-full cursor-pointer overflow-hidden rounded-xl object-cover"
                src={`${BASEURL}/${formik.values?.bannerTopHeaderDesktop?.url}`}
              />
            </picture>
          ) : (
            <p>انتخاب بنر برای دسکتاپ</p>
          )}
        </div>
      </Media>
      <Media
        onSelect={(media) => formik.setFieldValue('bannerTopHeaderMobile', media)}
        withModal
        className="!w-full flex-1"
      >
        <div className="flex h-[48px] !w-full items-center justify-center rounded-lg border border-dashed font-regular">
          {formik.values?.bannerTopHeaderMobile ? (
            <picture className="w-full">
              <source
                type="image/webp"
                srcSet={`${BASEURL}/${formik.values?.bannerTopHeaderMobile?.url}`}
              />
              <source
                type="image/jpeg"
                srcSet={`${BASEURL}/${formik.values?.bannerTopHeaderMobile?.url}`}
              />
              <img
                className="inline-block h-full w-full cursor-pointer overflow-hidden rounded-xl object-cover"
                src={`${BASEURL}/${formik.values?.bannerTopHeaderMobile?.url}`}
              />
            </picture>
          ) : (
            <p>انتخاب بنر برای موبایل</p>
          )}
        </div>
      </Media>
    </div>
  );
};

export default TopBanner;
