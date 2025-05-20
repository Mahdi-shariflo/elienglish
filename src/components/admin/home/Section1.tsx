import React, { useEffect } from 'react';
import { useGetCategoriesSliderAdmin } from '../../../hooks/admin/sliders/useGetCategoriesSliderAdmin';
import { Spinner } from '@heroui/react';
import Button from '@/components/common/Button';
import { FormikProps } from 'formik';
import { useGetCategorySliderById } from '../../../hooks/admin/sliders/useGetCategorySliderById';
import Slider from '@/components/common/Slider';
import { Home } from '@/types/home';
type Props = {
  formik: FormikProps<any>;
  data?: Home;
};
const Section1 = ({ formik, data: prevData }: Props) => {
  const { data, isLoading, isSuccess } = useGetCategoriesSliderAdmin({});
  const { data: sliders } = useGetCategorySliderById({ id: formik?.values?.sliderCategory });

  const categories: { title: string; _id: string }[] = data?.data?.data?.picSliderCategories;

  useEffect(() => {
    if (Array.isArray(prevData?.sliderCategories)) {
      formik.setValues({
        sec: prevData.title,
        ...(prevData._id ? { id: prevData._id } : null),
        sliderCategory:
          Number(prevData.sliderCategories.length) > 1 ? prevData.sliderCategories[0]._id : null,
      });
    }
  }, [data, isSuccess]);
  if (isLoading) return <Spinner className="mt-10 flex items-center justify-center" />;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center gap-3 overflow-auto">
        {categories.map((item, idx) => (
          // @ts-expect-error error
          <Button
            onClick={async () => formik?.setFieldValue('sliderCategory', item._id)}
            className={`h-[80px] w-fit !min-w-[80px] !flex-col !gap-1 !text-wrap border px-4 text-[12px] ${formik?.values.sliderCategory === item._id ? 'border-main text-main' : ''}`}
            key={idx}
          >
            <span>دسته‌بندی اسلایدر</span>
            <span>{item.title} </span>
          </Button>
        ))}
      </div>
      <div className="w-full">
        {Array.isArray(sliders?.data?.data?.picSliderCategory) ? (
          <Slider className="!w-full" sliders={sliders?.data?.data?.picSliderCategory[0].sliders} />
        ) : null}
      </div>
    </div>
  );
};

export default Section1;
