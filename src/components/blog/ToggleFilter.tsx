import { Switch } from '@heroui/react';
import React from 'react';
type Props = {
  searchParams: {
    attribiutes?: string;
    available?: string;
    discounted?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  };
  onToggle: (value: boolean, name: string) => void;
};
const ToggleFilter = ({ searchParams, onToggle }: Props) => {
  return (
    <>
      <div className="flex !h-[56px] items-center justify-between border-b border-[#E4E7E9]">
        <p className="font-regular text-[14px] text-[#0C0C0C] lg:text-[18px]">فقط کالاهای موجود</p>
        <Switch
          isSelected={searchParams.available === 'true'}
          onValueChange={(value) => onToggle(value, 'available')}
          classNames={{ wrapper: 'group-data-[selected=true]:bg-main' }}
        />
      </div>
      <div className="flex !h-[56px] items-center justify-between border-b border-[#E4E7E9]">
        <p className="font-regular text-[14px] text-[#0C0C0C] lg:text-[18px]">
          فقط کالاهای تخفیف‌دار
        </p>
        <Switch
          isSelected={searchParams.discounted === 'true'}
          onValueChange={(value) => onToggle(value, 'discounted')}
          classNames={{ wrapper: 'group-data-[selected=true]:bg-main' }}
        />
      </div>
    </>
  );
};

export default ToggleFilter;
