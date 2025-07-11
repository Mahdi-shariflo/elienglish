// components/Section1CardList.tsx
'use client';

import Input from '@/components/common/form/Input';
type Props = {
  formik: any;
};
const Section1CardList = ({ formik }: Props) => {
  return (
    <div className="col-span-2 mt-4 rounded-lg border p-3">
      <p className="mb-3 font-bold text-[14px]">لطفا اطلاعات شمارش‌گرها را وارد کنید</p>

      <div className="grid grid-cols-2 gap-4">
        {/* @ts-expect-error error */}
        {formik.values?.section1?.card.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <Input
              formik={formik}
              name={`section1.card[${index}].title`}
              label={`عنوان ${index + 1}`}
            />
            <Input
              formik={formik}
              name={`section1.card[${index}].count`}
              label={`عدد ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          const current = formik.values.section1.card;
          const updated = [...current, { title: '', count: '' }];
          formik.setFieldValue('section1.card', updated);
        }}
        className="mt-4 font-medium text-sm text-blue-500"
      >
        + افزودن شمارش‌گر
      </button>
    </div>
  );
};

export default Section1CardList;
