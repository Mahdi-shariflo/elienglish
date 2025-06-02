'use client';
import { Input as ReactInput } from '@heroui/react';
import { FormikProps } from 'formik';
// @ts-ignore
import PN from 'persian-number';
import { KeyboardEventHandler, ReactElement, ReactNode, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { BiEditAlt } from 'react-icons/bi';
import { addCommas, removeNumNumeric } from '@/lib/convert';
import { createURL } from '@/lib/fun';

type Props = {
  placeholder?: string;
  startContent?: any;
  endContent?: any;
  type?: string;
  label?: string | ReactElement;
  classNameInput?: string | ReactElement;
  subLabel?: string;
  className?: string;
  classNameLabel?: string;
  name?: string;
  value?: string;
  formik?: FormikProps<any>;
  disabled?: boolean;
  dir?: 'ltr' | 'rtl';
  url?: boolean;
  isClear?: boolean;
  defaultValue?: string;
  description?: string | ReactNode;
  isRequired?: boolean;
  price?: boolean;
  helperText?: string;
  min?: number;
  max?: number;
  onClear?: () => void;
  showCommentIcon?: boolean;
  onAction?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAvailable?: boolean;
  onKeyDown?: (KeyboardEventHandler<HTMLInputElement> & ((e: KeyboardEvent) => void)) | undefined;
};

const Input = ({
  classNameInput,
  price,
  dir,
  classNameLabel,
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
  helperText,
  onChange,
  defaultValue = '',
  isAvailable,
  onKeyDown,
  min,
  max,
  onClear,
  isClear = false,
}: Props) => {
  const [show, setShow] = useState(false);
  const isError = formik ? formik.touched[name] && formik.errors[name] : false;
  const onClose = () => {
    formik?.setFieldValue('url', null);
    setShow(!show);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) return onChange(e);
    if (onAction) onAction();

    if (url && !isAvailable && name === 'title') {
      formik?.setFieldValue('url', createURL(e.target.value));
    }

    if (formik) {
      const newValue = price ? addCommas(removeNumNumeric(e.target.value)) : e.target.value;

      formik.setFieldValue(name, newValue);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
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
        aria-labelledby={name || 'input field'}
        aria-label={name || 'input field'}
        minLength={min}
        maxLength={max}
        defaultValue={defaultValue}
        dir={dir}
        isClearable={disabled || isClear ? false : true}
        isDisabled={disabled}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value || (formik ? formik.values[name] : '')}
        onChange={handleChange}
        startContent={startContent}
        onKeyDown={onKeyDown}
        isInvalid={!!isError}
        endContent={endContent}
        errorMessage={formik?.errors[name] as string}
        description={
          url ? (
            <div className="flex items-center justify-end gap-1">
              {show ? (
                <CgClose className="cursor-pointer" size={17} onClick={onClose} />
              ) : (
                <BiEditAlt className="cursor-pointer" onClick={() => setShow(!show)} size={18} />
              )}
              <span>{helperText}</span>
            </div>
          ) : price && formik?.values[name] ? (
            <span className="inline-block pr-1 text-[12px]">
              {PN.convert(Number(removeNumNumeric(formik?.values[name]!)))} تومان
            </span>
          ) : (
            description
          )
        }
        onClear={
          onClear
            ? onClear
            : disabled || isClear
              ? undefined
              : () => formik?.setFieldValue(name, '')
        }
        classNames={{
          input: `px-2 !border-none !ring-0  ${classNameInput}`,
          inputWrapper: `bg-[#F4F6FA] dark:bg-[#0B1524] dark:!text-[#8E98A8] rounded-[8px] group-data-[focus-visible=true]:!ring-0 !ring-0 overflow-hidden font-medium border border-[#E5EAEF] dark:border-[#100337] pl-0 h-[48px] lg:h-[56px] w-full ${classNameInput}`,
        }}
        className={`font-light text-[14px] ${disabled ? '!opacity-70' : ''}`}
      />
      {url && show && formik?.values[name].length >= 3 ? (
        <ReactInput
          placeholder=" "
          classNames={{
            input: 'px-2 !border-none !ring-0',
            inputWrapper: `bg-[#F4F6FA] group-data-[focus-visible=true]:!ring-0 !ring-0 overflow-hidden font-medium border border-[#E5EAEF] pl-0 h-[48px] w-full ${classNameInput}`,
          }}
          className="mt-3 font-light text-[14px]"
          value={formik?.values?.url}
          onChange={formik?.handleChange}
          name="url"
        />
      ) : null}
    </div>
  );
};

export default Input;
