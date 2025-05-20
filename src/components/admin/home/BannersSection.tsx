import BaseDialog from '@/components/common/BaseDialog';
import { Delete_icon, Edit_icon } from '@/components/common/icon';
import Banners from '@/components/home/Banners';
import { Home, Slider } from '@/types/home';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Media from '../common/Media';
import Input from '@/components/common/form/Input';
import { BASEURL } from '@/lib/variable';
import { Media as MediaType } from '@/types';
import * as Yup from 'yup';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};

const BannersSection = ({ formik, data }: Props) => {
  const [modal, setModal] = useState(false);
  const banners: Slider[] = formik.values.pictures;
  const form = useFormik<{ url: MediaType | null; href: string; _id?: string }>({
    initialValues: {
      url: null,
      href: '',
      _id: '',
    },
    validationSchema: Yup.object({
      url: Yup.object().required('فیلد اجباری است'),
      href: Yup.string().required('فیلد اجباری است'),
    }),
    onSubmit: (values) => {
      if (values?._id) {
        const updatedBanners = banners.map((banner) => {
          if (banner._id === values?._id) {
            return {
              ...values.url,
              href: values.href,
            };
          }
          return banner;
        });
        formik.setFieldValue('pictures', updatedBanners);
      } else {
        // اضافه کردن بنر جدید
        const newBanner = {
          href: values?.href,
          ...values.url,
        };
        formik.setFieldValue('pictures', [...(Array.isArray(banners) ? banners : []), newBanner]);
      }
      form.resetForm();
      setModal(false);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        sec: data.title,
        pictures: data.pictures,
        ...(data._id ? { id: data._id } : null),
      });
    } else {
      formik.setValues({
        sec: formik.values.sec,
      });
    }
  }, [data]);

  const onClose = () => setModal(false);
  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, banner: MediaType) => {
    e.preventDefault();
    e.stopPropagation();
    form.setValues({
      url: banner,
      href: banner.href,
      _id: banner._id,
    });
    setModal(true);
  };
  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, banner: Slider) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedBanners = banners.filter((b) => b._id !== banner._id);
    formik.setFieldValue('pictures', updatedBanners);
  };

  return (
    <div>
      <button
        onClick={() => setModal(true)}
        className="mb-5 h-20 w-32 rounded-lg border border-dashed font-regular"
      >
        بنر جدید
      </button>
      {banners?.length > 0 ? (
        <Banners
          ActionBanner={({ banner }) => (
            <div className="absolute top-0 z-50 flex w-full items-center gap-2">
              {/* @ts-expect-error */}
              <button onClick={(e) => onEdit(e, banner)}>
                <Edit_icon />
              </button>
              <button onClick={(e) => onDelete(e, banner)}>
                <Delete_icon />
              </button>
            </div>
          )}
          className="relative !w-full"
          banners={banners}
        />
      ) : null}

      <BaseDialog
        onClose={onClose}
        isOpen={modal}
        title={'ایجاد بنر'}
        onClickFooter={() => form.handleSubmit()}
      >
        <div className="flex flex-col gap-3 py-6">
          <Media
            withModal
            className="w-full"
            // @ts-expect-error media
            onSelect={(media: MediaType) => form.setFieldValue('url', media)}
          >
            <div className="flex !h-[389px] w-full items-center justify-center rounded-lg border border-dashed">
              {form.values.url ? (
                <picture className="w-full">
                  <source
                    type="image/jpeg"
                    srcSet={`${BASEURL}/${form.values?.url?.url ?? form.values?.url}`}
                  />
                  <source
                    type="image/webp"
                    srcSet={`${BASEURL}/${form.values?.url?.url ?? form.values?.url}`}
                  />
                  <img
                    className="inline-block h-full w-full cursor-pointer overflow-hidden rounded-xl object-cover"
                    src={`${BASEURL}/${form.values?.url?.url ?? form.values?.url}`}
                  />
                </picture>
              ) : (
                <span className="font-regular">انتخاب بنر</span>
              )}
            </div>
          </Media>
          <Input
            label={'لینک بنر'}
            classNameInput="!h-[42px] !bg-[#f5f6f6]"
            formik={form}
            name="href"
          />
        </div>
      </BaseDialog>
    </div>
  );
};

export default BannersSection;
