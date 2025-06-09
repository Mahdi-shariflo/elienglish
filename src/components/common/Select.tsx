'use client';
import RaectSelect, { MultiValue, SingleValue } from 'react-select';
import { FormikProps } from 'formik';

type OptionType = { label: string; value: string };

type Props<T = Record<string, any>> = {
  emptyMessage?: string;
  label?: string;
  options?: T[];
  nameLabel?: keyof T;
  nameValue?: keyof T;
  labelClass?: string;
  name?: string;
  className?: string;
  value?: string | string[];
  onChange?: (value: MultiValue<OptionType> | SingleValue<OptionType>) => void;
  disabled?: boolean;
  isRequired?: boolean;
  isLoading?: boolean;
  selectionMode?: 'multiple' | 'single';
  formik?: FormikProps<any>;
  description?: string | null;
  CustomOption?: React.ComponentType<any>;
  CustomSingleValue?: React.ComponentType<any>;
  DropdownIndicator?: React.ComponentType<any>;
};

const Select = ({
  onChange,
  disabled,
  label,
  options = [],
  nameLabel = 'label',
  nameValue = 'value',
  value,
  selectionMode = 'single',
  name,
  labelClass,
  className,
  isRequired,
  isLoading,
  formik,
  emptyMessage = 'موردی یافت نشد',
  CustomOption,
  CustomSingleValue,
  DropdownIndicator,
}: Props) => {
  const isError = formik?.touched?.[name!] && formik?.errors?.[name!] ? true : false;

  const mappedOptions: OptionType[] = options.map((item) => ({
    ...item,
    label: item[nameLabel],
    value: item[nameValue].toString(),
  }));

  const findValue = mappedOptions.find(
    (item) => item.value === (value ? value : formik?.values[name!])
  );

  return (
    <div className={className}>
      {label && (
        <p className={`mb-[6px] pr-1 font-medium text-[14px] text-black ${labelClass}`}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </p>
      )}
      <RaectSelect
        isDisabled={disabled}
        isMulti={selectionMode === 'multiple'}
        options={[
          ...(formik?.values[name!] ? [{ label: 'حذف انتخاب', value: '' }] : []),
          ...mappedOptions,
        ]}
        isLoading={isLoading}
        placeholder="انتخاب کنید..."
        value={findValue}
        components={{
          ...(CustomOption ? { Option: CustomOption } : null),
          ...(CustomSingleValue ? { SingleValue: CustomSingleValue } : null),
          ...(DropdownIndicator ? { DropdownIndicator: DropdownIndicator } : null),
        }}
        onChange={
          onChange
            ? onChange
            : selectionMode === 'multiple'
              ? (value) =>
                  formik?.setFieldValue(
                    name!,
                    // @ts-expect-error error
                    value?.map((item) => item?.value)
                  )
              : // @ts-expect-error error
                (value) => formik.setFieldValue(name!, value?.value)
        }
        name={name}
        isSearchable
        classNamePrefix="react-select"
        noOptionsMessage={() => emptyMessage}
        className={`!h-[48px] !min-w-[120px] font-medium !text-[14px]`}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: 48,
            borderRadius: 6,
            borderColor: isError ? '#f87171' : base.borderColor,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        classNames={{
          control: () =>
            ` !outline-none !border !border-[#E5EAEF] h-full !rounded-lg ${isError ? '!bg-[#FEE7EF]' : '!bg-[#F4F6FA]'}`,
          indicatorSeparator: () => 'hidden',
          placeholder: () => 'font-regular !whitespace-nowrap !text-[14px]',
          container: () => '!outline-none h-full',
          menu: () => `!z-[9999] rounded-2xl font-light overflow-hidden relative `,
        }}
      />
      {isError && (
        <p className="mt-1 font-light !text-[12px] text-red-500">
          {formik?.errors?.[name!] as string}
        </p>
      )}
    </div>
  );
};

export default Select;
