'use client';
import SectionCategoryBlog from '@/components/admin/blog/SectionCategoryBlog';
import Media from '@/components/admin/common/Media';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import Select from '@/components/common/Select';
import Title from '@/components/common/Title';
import { useActionSetting } from '@/hooks/admin/settings/useActionSetting';
import { useGetSetting } from '@/hooks/admin/settings/useGetSetting';
import { BASEURL } from '@/lib/variable';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';

const Page = () => {
  const { data, isSuccess } = useGetSetting();
  const { mutate, isPending } = useActionSetting();
  const formik = useFormik({
    initialValues: {
      recommendSection: {
        imageUrl: '',
        title: '',
        href: '',
      },
      section3: {
        title: '',
        count: '',
        sort: '',
      },
      section2: {
        title: '',
        cards: [],
      },
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const mainData = {
        ...values,
        section3: {
          ...values.section3,
          count: Number(values.section3.count),
        },
      };
      mutate({ data: { blogSidebar: mainData } });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const blogSlider = data?.data?.data?.blogSidebar;
      formik.setValues(blogSlider);
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between border-b pb-2">
        <Title title="تنظیمات بلاگ" />
        <Button
          isLoading={isPending}
          onClick={() => formik.handleSubmit()}
          className="w-fit bg-main !px-3 text-white"
        >
          ثبت اطلاعات
        </Button>
      </div>
      <div className="flex items-start gap-10 border-b">
        <div className="flex-1 pb-5">
          <Media
            title="انتخاب عکس پیشنهادی"
            className="w-full"
            withModal
            onSelect={(img) =>
              formik.setFieldValue('recommendSection', {
                ...formik.values.recommendSection,
                // @ts-expect-error error
                imageUrl: `${BASEURL}/${img.url}`,
              })
            }
          >
            <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-xl border">
              {formik.values?.recommendSection?.imageUrl ? (
                <img
                  className="h-full w-full object-contain"
                  src={`${formik.values?.recommendSection.imageUrl}`}
                  alt="thumbnail"
                />
              ) : (
                <p className="text-center font-regular text-lg">
                  انتخاب عکس پیشنهادی <span className="text-red-500">*</span>
                </p>
              )}
            </div>
          </Media>
          <Input
            value={formik.values.recommendSection.title}
            formik={formik}
            name="recommendSection.title"
            label="عنوان"
          />
          <Input
            value={formik.values.recommendSection.href}
            formik={formik}
            name="recommendSection.href"
            label="لینک"
          />
        </div>
        <div className="flex-1">
          <p className="font-bold text-xl">تنظیمات باکس مقاله</p>
          <div className="mt-10 space-y-3">
            <Input
              value={formik.values.section3.title}
              formik={formik}
              name="section3.title"
              label="عنوان"
            />
            <Select
              value={formik.values.section3.sort}
              nameLabel="label"
              nameValue="value"
              options={[
                { label: 'جدید ترین', value: 'createdAt_desc' },
                { label: 'قدیمی ترین', value: 'createdAt_asc' },
              ]}
              formik={formik}
              name="section3.sort"
              label="سورت"
            />
            <Input
              value={formik.values.section3.count}
              type="number"
              formik={formik}
              name="section3.count"
              label="تعداد نمایش بلاگ"
            />
          </div>
        </div>
      </div>
      <SectionCategoryBlog formik={formik} data={formik.values.section2 as any} />
      {/* <CreateSectionBlog formik={formik} data={null} /> */}
    </div>
  );
};

export default Page;
