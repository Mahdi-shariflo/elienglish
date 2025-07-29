'use client';
import { addCommas, removeNumNumeric } from '@/lib/fun';
import { Textarea as ReactInput } from '@heroui/react';
import { FormikProps, getIn } from 'formik';
import { ReactElement, ReactNode } from 'react';

type Props = {
  placeholder?: string;
  startContent?: React.ReactElement;
  endContent?: React.ReactElement;
  type?: string;
  label?: string | ReactElement;
  subLabel?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  name?: string;
  value?: string;
  formik?: FormikProps<any>;
  disabled?: boolean;
  dir?: 'ltr' | 'rtl';
  url?: boolean;
  defaultValue?: string;
  description?: ReactNode;
  isRequired?: boolean;
  price?: boolean;
  helperText?: string;
  showCommentIcon?: boolean;
  onAction?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Textarea = ({
  price,
  dir,
  isRequired,
  disabled = false,
  description,
  className = '',
  name = '',
  placeholder = '',
  startContent,
  type = 'text',
  label,
  endContent,
  url,
  value,
  formik,
  onAction,
  onChange,
  defaultValue = '',
  classNameInput,
  classNameLabel,
}: Props) => {
  const fieldValue = value ?? (formik ? getIn(formik.values, name) : '');
  const isError = formik ? getIn(formik.touched, name) && getIn(formik.errors, name) : false;
  const errorMessage = formik ? getIn(formik.errors, name) : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onAction) onAction();

    if (url) {
      formik?.setFieldValue('url', e.target.value);
    }

    if (formik) {
      const newValue = price ? addCommas(removeNumNumeric(e.target.value)) : e.target.value;
      formik.setFieldValue(name, newValue);
    }

    if (onChange) onChange(e);
  };

  return (
    <div className={`w-full ${className}`}>
      {typeof label === 'string' ? (
        <p
          className={`mb-[6px] pr-1 font-medium text-[12px] dark:!text-[#8E98A8] lg:text-[14px] ${classNameLabel}`}
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </p>
      ) : (
        label
      )}
      <ReactInput
        defaultValue={defaultValue}
        dir={dir}
        aria-label={name}
        isDisabled={disabled}
        name={name}
        type={type}
        placeholder={placeholder}
        value={fieldValue || ''}
        onChange={handleChange}
        startContent={startContent}
        endContent={endContent}
        isInvalid={!!isError}
        errorMessage={errorMessage as string}
        description={
          price ? (
            <span className="inline-block pr-1 text-[12px]">
              {/* اگر خواستی می‌تونی PN.convert رو اینجا فعال کنی */}
              {/* {PN.convert(Number(removeNumNumeric(fieldValue)))} تومان */}
            </span>
          ) : (
            description
          )
        }
        classNames={{
          input: 'px-2 !border-none !ring-0',
          inputWrapper: `bg-[#F4F6FA] dark:bg-[#0B1524] !h-[150px] text-[#6A7890] dark:!text-[#8E98A8] rounded-[8px] group-data-[focus-visible=true]:!ring-0 !ring-0 dark:border-[#505B74] overflow-hidden font-medium border border-[#E5EAEF]  pl-0  w-full ${classNameInput}`,
        }}
        className="font-light text-[14px]"
      />
    </div>
  );
};

export default Textarea;
