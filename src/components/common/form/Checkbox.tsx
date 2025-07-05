import React from 'react';
import { Checkbox as ReactCheckbox } from '@heroui/react';
import { FormikProps } from 'formik';
type Props = {
  formik?: FormikProps<{ [key: string]: string | number | boolean }>;
  name?: string;
  label?: string;
  className?: string;
  isRequired?: boolean;
  isSelected?: boolean;
  onValueChange?: (value: boolean) => void;
};
const Checkbox = ({ className, formik, label, name, onValueChange, isSelected }: Props) => {
  const isInvalid = formik ? (formik.touched[name!] && formik.errors[name!] ? true : false) : false;
  return (
    <div className={className}>
      <ReactCheckbox
        size="lg"
        name={name}
        // @ts-expect-error error
        isSelected={isSelected ? isSelected : formik?.values[name!]}
        onValueChange={
          onValueChange ? onValueChange : (value) => formik?.setFieldValue(name!, value)
        }
        isInvalid={isInvalid}
        classNames={{
          label:
            'pr-3 text-[14px] line-clamp-2 whitespace-nowrap dark:text-[#8E98A8] !font-regular text-[#0C0C0C]',

          wrapper: 'after:!bg-main',
        }}
      >
        {label}
      </ReactCheckbox>
    </div>
  );
};

export default Checkbox;
