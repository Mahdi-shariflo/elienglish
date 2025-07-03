'use client';

import { converDatePer } from '@/lib/convert';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePickerLib from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

interface Props {
  formik?: any;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  isActive?: boolean;
  className?: string;
  timepicker?: boolean;
  range?: boolean;
  maxDate?: Date | DateObject;
  format?: string;
  inputClass?: string;
  calendarPosition?: string;
  endContent?: React.ReactElement;
  minDate?: Date | DateObject;
}
const Datepicker = ({
  formik,
  name,
  label = 'تاریخ تولد',
  disabled,
  required,
  className,
  calendarPosition,
  format,
  endContent,
  inputClass,
  maxDate,
  range = false,
  timepicker = false,
  minDate,
}: Props) => {
  function handleChange(value: any) {
    const date = converDatePer(value);
    formik.setFieldValue(name, date);
  }
  return (
    <div className={`container_datepicker ${className}`}>
      {label && (
        <label className="block pb-[6px] font-medium text-[13px] text-[#3b3b3b]">
          {label}:{required && <span className="text-sm text-[#DF2040]">*</span>}
        </label>
      )}
      <div className="relative flex w-full items-center gap-3">
        <DatePickerLib
          range={range}
          style={{
            border: formik
              ? formik.touched[name!] && formik.errors[name!] && '1px solid #ef4444'
              : null,
          }}
          plugins={timepicker ? [<TimePicker position="right" />] : []}
          value={formik ? formik.values[name] : null}
          onChange={handleChange}
          calendar={persian}
          locale={persian_fa}
          format={format}
          disabled={disabled}
          placeholder="روز/ماه/سال"
          shadow={false}
          className="!w-full !bg-[#f5f6f6] !font-regular"
          inputClass={`!w-full !border !border-gray-200 !outline-0  !font-regular px-3 rounded-lg h-[48px] lg:h-[50px] !bg-[#f5f6f6] ${inputClass}`}
          containerClassName="!w-full overflow-hidden"
          arrowClassName="!hidden"
          maxDate={maxDate ? maxDate : undefined}
          minDate={minDate ? minDate : undefined}
          calendarPosition={calendarPosition}
          fixMainPosition
        />
        {endContent}
      </div>
      <span className="font-es-regular inline-block pr-1 pt-2 text-[10px] text-red-600">
        {formik
          ? formik.touched[name!] && formik.errors[name!]
            ? formik.errors[name!]
            : null
          : null}
      </span>
    </div>
  );
};

export default Datepicker;
