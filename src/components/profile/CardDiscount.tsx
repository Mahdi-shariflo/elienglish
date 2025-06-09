import React from 'react';
import Button from '../common/Button';
import { addToast } from '@heroui/react';
type Props = {
  discount: {
    discountCode: string;
    descriptionCode: string;
  };
};
const CardDiscount = ({ discount }: Props) => {
  const onCopy = () => {
    navigator.clipboard.writeText(`${discount.discountCode}`);
    addToast({
      title: `کد تخفیف  با موفقیت کپی شد`,
      color: 'success',
    });
  };
  return (
    <div className="shadow-favorite flex flex-col items-center justify-between gap-4 rounded-lg bg-white p-4 lg:flex-row lg:gap-10 lg:p-7">
      <div className="flex w-full items-start gap-2 lg:w-fit">
        <span className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl bg-[#FCE7F5]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5309 10.8699L20.0109 9.34988C19.7509 9.08988 19.5409 8.57988 19.5409 8.21988V6.05988C19.5409 5.17988 18.8209 4.45988 17.9409 4.45988H15.7909C15.4309 4.45988 14.9209 4.24988 14.6609 3.98988L13.1409 2.46988C12.5209 1.84988 11.5009 1.84988 10.8809 2.46988L9.34086 3.98988C9.09086 4.24988 8.58086 4.45988 8.21086 4.45988H6.06086C5.18086 4.45988 4.46086 5.17988 4.46086 6.05988V8.20988C4.46086 8.56988 4.25086 9.07988 3.99086 9.33988L2.47086 10.8599C1.85086 11.4799 1.85086 12.4999 2.47086 13.1199L3.99086 14.6399C4.25086 14.8999 4.46086 15.4099 4.46086 15.7699V17.9199C4.46086 18.7999 5.18086 19.5199 6.06086 19.5199H8.21086C8.57086 19.5199 9.08086 19.7299 9.34086 19.9899L10.8609 21.5099C11.4809 22.1299 12.5009 22.1299 13.1209 21.5099L14.6409 19.9899C14.9009 19.7299 15.4109 19.5199 15.7709 19.5199H17.9209C18.8009 19.5199 19.5209 18.7999 19.5209 17.9199V15.7699C19.5209 15.4099 19.7309 14.8999 19.9909 14.6399L21.5109 13.1199C22.1609 12.5099 22.1609 11.4899 21.5309 10.8699ZM8.00086 8.99988C8.00086 8.44988 8.45086 7.99988 9.00086 7.99988C9.55086 7.99988 10.0009 8.44988 10.0009 8.99988C10.0009 9.54988 9.56086 9.99988 9.00086 9.99988C8.45086 9.99988 8.00086 9.54988 8.00086 8.99988ZM9.53086 15.5299C9.38086 15.6799 9.19086 15.7499 9.00086 15.7499C8.81086 15.7499 8.62086 15.6799 8.47086 15.5299C8.18086 15.2399 8.18086 14.7599 8.47086 14.4699L14.4709 8.46988C14.7609 8.17988 15.2409 8.17988 15.5309 8.46988C15.8209 8.75988 15.8209 9.23988 15.5309 9.52988L9.53086 15.5299ZM15.0009 15.9999C14.4409 15.9999 13.9909 15.5499 13.9909 14.9999C13.9909 14.4499 14.4409 13.9999 14.9909 13.9999C15.5409 13.9999 15.9909 14.4499 15.9909 14.9999C15.9909 15.5499 15.5509 15.9999 15.0009 15.9999Z"
              fill="#DD338B"
            />
          </svg>
        </span>
        <div>
          <p className="font-regular text-[14px] text-[#232429]">{discount.descriptionCode}</p>
          {/* <p className={`text-[12px] font-regular pt-1 text-[#7D8793]`}>
                        حالا وقتشه یه ریش تراش شیک با تخفیف ویژه بهش هدیه بدی، تخفیف روز پدر، برای باباهای خاص!
                        مهلت استفاده: پنج شنبه، ۲۷ دی ‌۱۴۰۳
                    </p> */}
        </div>
      </div>

      <div className="flex w-full items-center gap-3 lg:w-fit">
        <Button
          onClick={onCopy}
          className="!h-[42px] !w-full bg-main px-2 text-[14px] text-white lg:w-fit"
        >
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>کپی کردن</span>
        </Button>
        <Button className="!h-[42px] !w-full border border-dashed bg-transparent px-2 text-[14px] lg:w-fit">
          <span>{discount.discountCode}</span>
        </Button>
      </div>
    </div>
  );
};

export default CardDiscount;
