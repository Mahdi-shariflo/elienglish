import React from 'react';

import Button from '../common/Button';

const LastViewProducts = () => {
  return (
    <div className="mr-auto mt-5 w-[95%] space-y-4 rounded-2xl border-[#E4E7E9] lg:mr-0 lg:!w-full lg:border lg:bg-white lg:p-[16px]">
      <div className="flex items-center justify-between">
        <p className="font-medium text-[14px] text-[#0C0C0C] lg:text-[18px]">
          آخرین کالاهای دیده شده
        </p>
        <Button className="!w-fit bg-transparent font-regular text-main">
          <span>مشاهده همه</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99998 13.28L5.65331 8.9333C5.13998 8.41997 5.13998 7.57997 5.65331 7.06664L9.99998 2.71997"
              stroke="#DD338B"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      {/* <div className='flex items-center gap-3 overflow-auto lg:overflow-hidden'>
                {
                    products.slice(0, 4).map((product, idx) => (
                        <CardProduct className='!min-w-[148px] bg-white' classNameImage='lg:!h-[142px] !mx-auto' showAddCartBtn key={idx} product={product} />
                    ))
                }
            </div> */}
    </div>
  );
};

export default LastViewProducts;
