import React from 'react';
import BaseDialog from '../common/BaseDialog';
import Button from '../common/Button';
import useBasket from '@/hooks/basket/useBasket';
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  discountData: {
    discountCodePrice: number;
    discountCodeType: string;
  };
};
const DiscountResult = ({ open, setOpen, discountData }: Props) => {
  const { total } = useBasket();
  return (
    <>
      <BaseDialog isOpen={open} size="md" onClose={() => setOpen(!open)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 py-4">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M19.24 5.58006H18.84L15.46 2.20006C15.19 1.93006 14.75 1.93006 14.47 2.20006C14.2 2.47006 14.2 2.91006 14.47 3.19006L16.86 5.58006H7.14L9.53 3.19006C9.8 2.92006 9.8 2.48006 9.53 2.20006C9.26 1.93006 8.82 1.93006 8.54 2.20006L5.17 5.58006H4.77C3.87 5.58006 2 5.58006 2 8.14006C2 9.11006 2.2 9.75006 2.62 10.1701C2.86 10.4201 3.15 10.5501 3.46 10.6201C3.75 10.6901 4.06 10.7001 4.36 10.7001H19.64C19.95 10.7001 20.24 10.6801 20.52 10.6201C21.36 10.4201 22 9.82006 22 8.14006C22 5.58006 20.13 5.58006 19.24 5.58006Z"
                  fill="#009B72"
                />
                <path
                  d="M19.6609 10.7H4.36094C4.07094 10.7 3.75094 10.69 3.46094 10.61L4.72094 18.3C5.01094 20.02 5.76094 22 9.09094 22H14.7009C18.0709 22 18.6709 20.31 19.0309 18.42L20.5409 10.61C20.2609 10.68 19.9609 10.7 19.6609 10.7ZM14.8809 15.05L11.6309 18.05C11.4909 18.18 11.3009 18.25 11.1209 18.25C10.9309 18.25 10.7409 18.18 10.5909 18.03L9.09094 16.53C8.80094 16.24 8.80094 15.76 9.09094 15.47C9.38094 15.18 9.86094 15.18 10.1509 15.47L11.1409 16.46L13.8609 13.95C14.1609 13.67 14.6409 13.69 14.9209 13.99C15.2109 14.3 15.1909 14.77 14.8809 15.05Z"
                  fill="#009B72"
                />
              </svg>
            </span>
            <span className="pt-px font-medium text-[16px] text-[#009B72]">
              کد تخفیف با موفقیت اعمال شد
            </span>
          </div>

          <Button onClick={() => setOpen(!open)} className="w-fit min-w-fit px-0">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L18 18"
                  stroke="#545A66"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 6L6 18"
                  stroke="#616A76"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Button>
        </div>

        <div>
          <p className="font-regular leading-8">
            {discountData?.discountCodeType === 'fixed' ? 'مبلغ' : 'درصد'} کد تخفیف شما
            <span className="inline-block px-1 text-main">
              {Number(discountData?.discountCodePrice).toLocaleString()}{' '}
              {discountData?.discountCodeType === 'fixed' ? 'تومان' : '%'}
            </span>
            می‌باشد. و با اعمال کد تخفیف، جمع سبد خرید شما{' '}
            <span className="inline-block px-1 text-main">
              {Number(total).toLocaleString()} تومان
            </span>
            شد.
          </p>
        </div>

        <Button onClick={() => setOpen(!open)} className="bg-main text-white">
          متوجه شدم
        </Button>
      </BaseDialog>
    </>
  );
};

export default DiscountResult;
