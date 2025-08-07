import React from 'react';
import DatePicker from 'react-multi-date-picker';
import { converDatePer } from '@/lib/convert';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
type Props = {
  onChange: (date: string) => void;
};
const MutiRangeDatePicker = ({ onChange }: Props) => {
  function handleChange(value: any) {
    if (!value) return;

    const dates = Array.isArray(value)
      ? value.map((d) => converDatePer(d))
      : [converDatePer(value)];

    onChange(dates.join('-'));
  }

  return (
    <div className="mt-12 w-[400px]">
      <DatePicker
        range
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
        placeholder="روز/ماه/سال"
        shadow={false}
        className="!w-full !bg-[#f5f6f6] !font-regular dark:!bg-[#0B1524]"
        inputClass={`!w-full dark:!text-white !border !border-gray-200 !outline-0  !font-regular px-3 rounded-lg h-[48px] lg:h-[50px] dark:!border-none dark:!bg-[#0B1524] !bg-[#f5f6f6]`}
        containerClassName="!w-full overflow-hidden"
        arrowClassName="!hidden"
        maxDate={new Date()}
        calendarPosition={'top-center'}
      />
    </div>
  );
};

export default MutiRangeDatePicker;
