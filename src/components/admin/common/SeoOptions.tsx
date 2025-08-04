import Input from '@/components/common/form/Input';
import Textarea from '@/components/common/form/Textarea';
import Select from '@/components/common/Select';
import { optionRedirectType } from '@/lib/data';
import { Accordion, AccordionItem } from '@heroui/react';
import { FormikProps } from 'formik';
import React from 'react';
type Props = {
  formik: FormikProps<any>;
};
const SeoOptions = ({ formik }: Props) => {
  return (
    <div className="col-span-2">
      <Accordion>
        <AccordionItem
          title="سئو"
          classNames={{
            base: 'border-b border-[#E4E7E9] !py-0 !px-0',
            title: 'font-medium !text-[16px] text-[#232429]',
            subtitle: 'text-[10px] text-[#7D8793] font-regular line-clamp-1',
            trigger: 'items-start',
            content: '!py-0',
          }}
        >
          <div className="grid grid-cols-2 gap-3 pb-4">
            <Input label="عنوان سئو" classNameInput="!h-[48px] " name="metaTitle" formik={formik} />
            <Input
              label="کلمات کلیدی"
              classNameInput="!h-[48px] "
              name="keyWords"
              formik={formik}
            />
            <Select
              label="انتخاب نوع ریدایرکت"
              options={optionRedirectType}
              formik={formik}
              name="redirectType"
            />
            <Textarea
              label="توضیحات سئو"
              className="lg:col-span-2"
              name="metaDescription"
              formik={formik}
            />

            <Input
              label="canonical"
              classNameInput="!h-[48px] "
              name="canonicalUrl"
              formik={formik}
            />
            <Input label="robots" classNameInput="!h-[48px] " name="robots" formik={formik} />
            <Input
              label="redirecturl"
              classNameInput="!h-[48px] "
              name="redirectUrl"
              formik={formik}
            />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SeoOptions;
