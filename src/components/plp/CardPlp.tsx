import React from 'react';
import { Lpa } from '@/types';
import Image from 'next/image';
import Counter from '../common/Counter';
const CardPlp = ({ lpa }: { lpa: Lpa }) => {
  return (
    <div className="rounded-lg border border-gray-50 p-3 drop-shadow-sm dark:border-[#263248] dark:bg-[#172334]">
      <div className="flex items-center justify-between">
        <p className="font-extrabold text-main">{lpa.title}</p>
        <Image
          width={60}
          height={60}
          className="h-[60px] w-[60px] rounded-full"
          src={lpa?.teacherProfile}
          alt=""
        />
      </div>
      <div className="mt-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span>
              <svg
                width="23"
                height="23"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3346 14.5V13.1667C13.3346 12.4594 13.0537 11.7811 12.5536 11.281C12.0535 10.781 11.3752 10.5 10.668 10.5H5.33464C4.62739 10.5 3.94911 10.781 3.44902 11.281C2.94892 11.7811 2.66797 12.4594 2.66797 13.1667V14.5"
                  stroke="#4000FB"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.9987 7.83333C9.47146 7.83333 10.6654 6.63943 10.6654 5.16667C10.6654 3.69391 9.47146 2.5 7.9987 2.5C6.52594 2.5 5.33203 3.69391 5.33203 5.16667C5.33203 6.63943 6.52594 7.83333 7.9987 7.83333Z"
                  stroke="#4000FB"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p className="font-regular text-[#33435A] dark:text-[#8E98A8]">
              استاد: <span className="font-medium">{lpa.teacherName}</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6654 3.16927H11.332V2.5026C11.332 2.32579 11.2618 2.15622 11.1368 2.0312C11.0117 1.90618 10.8422 1.83594 10.6654 1.83594C10.4886 1.83594 10.319 1.90618 10.194 2.0312C10.0689 2.15622 9.9987 2.32579 9.9987 2.5026V3.16927H5.9987V2.5026C5.9987 2.32579 5.92846 2.15622 5.80344 2.0312C5.67841 1.90618 5.50884 1.83594 5.33203 1.83594C5.15522 1.83594 4.98565 1.90618 4.86063 2.0312C4.7356 2.15622 4.66536 2.32579 4.66536 2.5026V3.16927H3.33203C2.8016 3.16927 2.29289 3.37998 1.91782 3.75506C1.54274 4.13013 1.33203 4.63884 1.33203 5.16927V13.1693C1.33203 13.6997 1.54274 14.2084 1.91782 14.5835C2.29289 14.9586 2.8016 15.1693 3.33203 15.1693H12.6654C13.1958 15.1693 13.7045 14.9586 14.0796 14.5835C14.4547 14.2084 14.6654 13.6997 14.6654 13.1693V5.16927C14.6654 4.63884 14.4547 4.13013 14.0796 3.75506C13.7045 3.37998 13.1958 3.16927 12.6654 3.16927ZM13.332 13.1693C13.332 13.3461 13.2618 13.5157 13.1368 13.6407C13.0117 13.7657 12.8422 13.8359 12.6654 13.8359H3.33203C3.15522 13.8359 2.98565 13.7657 2.86063 13.6407C2.7356 13.5157 2.66536 13.3461 2.66536 13.1693V8.5026H13.332V13.1693ZM13.332 7.16927H2.66536V5.16927C2.66536 4.99246 2.7356 4.82289 2.86063 4.69787C2.98565 4.57284 3.15522 4.5026 3.33203 4.5026H4.66536V5.16927C4.66536 5.34608 4.7356 5.51565 4.86063 5.64068C4.98565 5.7657 5.15522 5.83594 5.33203 5.83594C5.50884 5.83594 5.67841 5.7657 5.80344 5.64068C5.92846 5.51565 5.9987 5.34608 5.9987 5.16927V4.5026H9.9987V5.16927C9.9987 5.34608 10.0689 5.51565 10.194 5.64068C10.319 5.7657 10.4886 5.83594 10.6654 5.83594C10.8422 5.83594 11.0117 5.7657 11.1368 5.64068C11.2618 5.51565 11.332 5.34608 11.332 5.16927V4.5026H12.6654C12.8422 4.5026 13.0117 4.57284 13.1368 4.69787C13.2618 4.82289 13.332 4.99246 13.332 5.16927V7.16927Z"
                  fill="#4000FB"
                />
              </svg>
            </span>
            <p className="font-regular text-[#33435A] dark:text-[#8E98A8]">
              تاریخ:{' '}
              <span className="font-medium">
                {new Date(lpa.date).toLocaleDateString('fa-IR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: 'numeric',
                })}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66667 1.5C7.34813 1.5 6.0592 1.89099 4.96287 2.62354C3.86654 3.35608 3.01206 4.39727 2.50747 5.61544C2.00289 6.83362 1.87087 8.17406 2.1281 9.46727C2.38534 10.7605 3.02027 11.9484 3.95262 12.8807C4.88497 13.8131 6.07286 14.448 7.36607 14.7052C8.65927 14.9625 9.99972 14.8304 11.2179 14.3259C12.4361 13.8213 13.4773 12.9668 14.2098 11.8705C14.9423 10.7741 15.3333 9.48521 15.3333 8.16667C15.3333 7.29119 15.1609 6.42428 14.8259 5.61544C14.4908 4.80661 13.9998 4.07168 13.3807 3.45262C12.7617 2.83356 12.0267 2.3425 11.2179 2.00747C10.4091 1.67244 9.54215 1.5 8.66667 1.5ZM8.66667 13.5C7.61184 13.5 6.58069 13.1872 5.70363 12.6012C4.82657 12.0151 4.14298 11.1822 3.73931 10.2076C3.33564 9.23311 3.23003 8.16075 3.43581 7.12618C3.6416 6.09162 4.14955 5.14131 4.89543 4.39543C5.64131 3.64955 6.59162 3.1416 7.62619 2.93581C8.66075 2.73002 9.73311 2.83564 10.7076 3.23931C11.6822 3.64298 12.5151 4.32656 13.1012 5.20363C13.6872 6.08069 14 7.11183 14 8.16667C14 9.58115 13.4381 10.9377 12.4379 11.9379C11.4377 12.9381 10.0812 13.5 8.66667 13.5ZM8.66667 4.16667C8.48986 4.16667 8.32029 4.2369 8.19527 4.36193C8.07024 4.48695 8 4.65652 8 4.83333V7.78L6.6 8.58667C6.47157 8.65944 6.37093 8.77278 6.31386 8.90892C6.25678 9.04505 6.2465 9.19628 6.28463 9.33889C6.32276 9.48149 6.40714 9.60741 6.52454 9.69689C6.64195 9.78638 6.78572 9.83436 6.93334 9.83333C7.05012 9.83414 7.16507 9.80425 7.26667 9.74667L9 8.74667L9.06 8.68667L9.16667 8.6C9.19274 8.567 9.21509 8.53123 9.23334 8.49333C9.25506 8.45754 9.27294 8.41955 9.28667 8.38C9.3048 8.33761 9.31606 8.2926 9.32 8.24667L9.33334 8.16667V4.83333C9.33334 4.65652 9.2631 4.48695 9.13807 4.36193C9.01305 4.2369 8.84348 4.16667 8.66667 4.16667Z"
                  fill="#4000FB"
                />
              </svg>
            </span>
            <p className="font-regular text-[#33435A] dark:text-[#8E98A8]">
              زمان: <span className="font-medium">{lpa.time}</span>
            </p>
          </div>
          <p className="font-regular text-[#33435A] dark:text-[#8E98A8]">
            <span className="font-medium text-[14px]">
              {lpa.discountPrice ? lpa.discountPrice.toLocaleString() : lpa.price.toLocaleString()}
            </span>{' '}
            تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex h-[34px] w-[76px] items-center justify-center rounded-full border-2 border-[#FCEDE8] bg-[#F44336] font-medium text-white">
            رزرو شده
          </span>
          <Counter
            // @ts-expect-error error
            product={lpa}
            typeCounter="lpas"
            typePayload="LEVEL"
            showBasketIcon={false}
            classNameAddBtnName="!text-[14px]"
            classAddBtn="!h-[34px] !w-[76px] !min-w-fit !border-2 !text-[12px] !border-[#F4F6FA] !bg-[#8E98A8] !text-white"
            classLinkCart="!h-[34px] !w-[76px] !rounded-lg !min-w-fit !border-2 !text-[12px] !border-[#F4F6FA] !bg-[#8E98A8] !text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPlp;
