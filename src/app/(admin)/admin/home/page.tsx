'use client';
import Select from '@/components/common/Select';
import { landingOptions } from '@/lib/data';
import { useFormik } from 'formik';
import React, { JSX, useEffect } from 'react';
import Button from '@/components/common/Button';
import { useActionHomePage } from '@/hooks/admin/home/useActionHomePage';
import { useGetHomePage } from '@/hooks/admin/home/useGetHomePage';
import Section1Admin from '@/components/admin/home/Section1Admin';
import Section2Admin from '@/components/admin/home/Section2Admin';
import Section3Admin from '@/components/admin/home/Section3Admin';
import Section4Admin from '@/components/admin/home/Section4Admin';
import Section5Admin from '@/components/admin/home/Section5Admin';
import Section7Admin from '@/components/admin/home/Section7Admin';
import { removeEmptyFields } from '@/lib/fun';

// تعریف یک Map از کامپوننت‌های قابل نمایش

const Page = () => {
  const { mutate, isPending } = useActionHomePage();
  const { data, isSuccess } = useGetHomePage();
  const formik = useFormik<any>({
    initialValues: {
      section1: {
        colorTitle: '',
        title: '',
        description: '',
        picture: {
          url: '',
          href: '',
        },
        activeBtn: {
          title: '',
          href: '',
        },
        btn: {
          title: '',
          href: '',
        },
        card: [
          { title: '', count: '' }, // حداقل یک مقدار پیش‌فرض
        ],
      },
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const sectionKey = values.sec; // مثلاً "section4"
      const sectionData = { ...values[sectionKey] };

      // فیلدهایی که باید فقط آرایه‌ای از id باشن
      const arrayFields = ['course', 'product', 'blog'];

      arrayFields.forEach((key) => {
        if (Array.isArray(sectionData[key])) {
          sectionData[key] = sectionData[key].map((item: any) => item?.id || item?._id || item);
        }
      });

      mutate({
        data: {
          [sectionKey]: removeEmptyFields(sectionData),
        },
        id: values._id || values.id,
      });
    },
  });
  const sections = data?.data?.data;
  const sectionComponents: Record<string, JSX.Element> = {
    // 'top-banner': <TopBanner formik={formik} data={findItem('top-banner')} />,
    section1: <Section1Admin formik={formik} />,
    section2: <Section2Admin data={sections?.section2} formik={formik} />,
    section3: <Section3Admin data={sections?.section3} formik={formik} />,
    section4: <Section4Admin data={sections?.section4} formik={formik} />,
    section5: <Section5Admin data={sections?.section5} formik={formik} />,
    section7: <Section7Admin data={sections?.section7} formik={formik} />,
    // sec3: <SectionDiscountAdmin data={findItem('sec3')} formik={formik} />,
    // sec4: <CarouselSections data={findItem('sec4')} formik={formik} />,
    // sec5: <BannersSection data={findItem('sec5')} formik={formik} />,
    // sec6: <CarouselSections data={findItem('sec6')} formik={formik} />,
    // sec7: <BannersSection data={findItem('sec7')} formik={formik} />,
    // sec8: <CarouselSections data={findItem('sec8')} formik={formik} />,
    // sec9: <BannersSection data={findItem('sec9')} formik={formik} />,
    // sec10: <CarouselSections data={findItem('sec10')} formik={formik} />,
    // sec11: <BannersSection data={findItem('sec11')} formik={formik} />,
  };
  useEffect(() => {
    if (isSuccess) {
      const home = data.data.data;
      formik.setValues(home);
    }
  }, [isSuccess]);

  return (
    <div>
      <p className="hidden border-b border-[#E4E7E9] pb-3 font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        صفحه اصلی
      </p>

      <div className="mt-5">
        <div className="flex items-center gap-10">
          <Select
            label="انتخاب سکشن"
            options={landingOptions}
            formik={formik}
            name="sec"
            nameLabel="label"
            nameValue="value"
            className="z-50 w-full"
          />
          {formik.values.sec ? (
            <Button
              isPending={isPending}
              onClick={() => formik.handleSubmit()}
              className="!mt-6 !w-fit bg-main px-5 text-white"
            >
              ثبت تغیرات
            </Button>
          ) : null}
        </div>

        <div className="mt-6">
          {/* نمایش کامپوننت مرتبط با سکشن انتخاب شده */}
          {sectionComponents[formik.values.sec] || null}
        </div>
      </div>
    </div>
  );
};

export default Page;
