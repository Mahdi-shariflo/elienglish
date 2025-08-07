import React from 'react';
import Button from '../common/Button';
import { Address } from '@/store/types';
type Props = {
  address: Address;
  onDelete?: () => void;
  onEdit?: () => void;
};
const CardAddress = ({ address, onDelete, onEdit }: Props) => {
  return (
    <div className="border-b border-[#E4E7E9] pb-3 dark:border-[#263248]">
      <p className="font-medium text-[14px] text-[#232429]">{address.title}</p>
      <div className="!mt-2 grid-cols-2 gap-4 space-y-2 lg:grid lg:space-y-0">
        <p className="font-regular text-[14px] text-[#616A76]">{address.address}</p>
        <div className="flex items-center gap-2">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99992 8.95297C9.14867 8.95297 10.0799 8.02172 10.0799 6.87297C10.0799 5.72422 9.14867 4.79297 7.99992 4.79297C6.85117 4.79297 5.91992 5.72422 5.91992 6.87297C5.91992 8.02172 6.85117 8.95297 7.99992 8.95297Z"
                stroke="#7D8793"
                strokeWidth="0.8"
              />
              <path
                d="M2.4133 5.65968C3.72664 -0.113657 12.28 -0.106991 13.5866 5.66634C14.3533 9.05301 12.2466 11.9197 10.4 13.693C9.05997 14.9863 6.93997 14.9863 5.5933 13.693C3.7533 11.9197 1.64664 9.04634 2.4133 5.65968Z"
                stroke="#7D8793"
                strokeWidth="0.8"
              />
            </svg>
          </span>
          <span className="font-regular text-[14px] text-[#616A76]">{address.provinceLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6468 12.2197C14.6468 12.4597 14.5935 12.7063 14.4802 12.9463C14.3668 13.1863 14.2202 13.413 14.0268 13.6263C13.7002 13.9863 13.3402 14.2463 12.9335 14.413C12.5335 14.5797 12.1002 14.6663 11.6335 14.6663C10.9535 14.6663 10.2268 14.5063 9.46016 14.1797C8.6935 13.853 7.92683 13.413 7.16683 12.8597C6.40016 12.2997 5.6735 11.6797 4.98016 10.993C4.2935 10.2997 3.6735 9.57301 3.12016 8.81301C2.5735 8.05301 2.1335 7.29301 1.8135 6.53967C1.4935 5.77967 1.3335 5.05301 1.3335 4.35967C1.3335 3.90634 1.4135 3.47301 1.5735 3.07301C1.7335 2.66634 1.98683 2.29301 2.34016 1.95967C2.76683 1.53967 3.2335 1.33301 3.72683 1.33301C3.9135 1.33301 4.10016 1.37301 4.26683 1.45301C4.44016 1.53301 4.5935 1.65301 4.7135 1.82634L6.26016 4.00634C6.38016 4.17301 6.46683 4.32634 6.52683 4.47301C6.58683 4.61301 6.62016 4.75301 6.62016 4.87967C6.62016 5.03967 6.5735 5.19967 6.48016 5.35301C6.3935 5.50634 6.26683 5.66634 6.10683 5.82634L5.60016 6.35301C5.52683 6.42634 5.4935 6.51301 5.4935 6.61967C5.4935 6.67301 5.50016 6.71967 5.5135 6.77301C5.5335 6.82634 5.5535 6.86634 5.56683 6.90634C5.68683 7.12634 5.8935 7.41301 6.18683 7.75967C6.48683 8.10634 6.80683 8.45967 7.1535 8.81301C7.5135 9.16634 7.86016 9.49301 8.2135 9.79301C8.56016 10.0863 8.84683 10.2863 9.0735 10.4063C9.10683 10.4197 9.14683 10.4397 9.1935 10.4597C9.24683 10.4797 9.30016 10.4863 9.36016 10.4863C9.4735 10.4863 9.56016 10.4463 9.6335 10.373L10.1402 9.87301C10.3068 9.70634 10.4668 9.57967 10.6202 9.49967C10.7735 9.40634 10.9268 9.35967 11.0935 9.35967C11.2202 9.35967 11.3535 9.38634 11.5002 9.44634C11.6468 9.50634 11.8002 9.59301 11.9668 9.70634L14.1735 11.273C14.3468 11.393 14.4668 11.533 14.5402 11.6997C14.6068 11.8663 14.6468 12.033 14.6468 12.2197Z"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeMiterlimit="10"
              />
              <path
                d="M12.3333 5.99935C12.3333 5.59935 12.02 4.98602 11.5533 4.48602C11.1267 4.02602 10.56 3.66602 10 3.66602"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6667 5.99967C14.6667 3.41967 12.58 1.33301 10 1.33301"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-regular text-[14px] text-[#616A76]">{address.mobileNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.48 1.33301H5.97337C5.7067 1.33301 5.45335 1.42634 5.24668 1.58634L3.78668 2.75301C3.20001 3.21968 3.20001 4.10633 3.78668 4.573L5.24668 5.73966C5.45335 5.90633 5.71337 5.993 5.97337 5.993H11.48C12.1267 5.993 12.6467 5.473 12.6467 4.82633V2.493C12.6467 1.853 12.1267 1.33301 11.48 1.33301Z"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.53337 8H10.04C10.3067 8 10.5601 8.09334 10.7667 8.25334L12.2267 9.42C12.8134 9.88667 12.8134 10.7733 12.2267 11.24L10.7667 12.4067C10.5601 12.5733 10.3 12.66 10.04 12.66H4.53337C3.8867 12.66 3.3667 12.14 3.3667 11.4933V9.15999C3.3667 8.51999 3.8867 8 4.53337 8Z"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 8V6"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 14.667V12.667"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 14.667H10"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-regular text-[14px] text-[#616A76]">{address.postalCode}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99984 7.99967C9.84079 7.99967 11.3332 6.50729 11.3332 4.66634C11.3332 2.82539 9.84079 1.33301 7.99984 1.33301C6.15889 1.33301 4.6665 2.82539 4.6665 4.66634C4.6665 6.50729 6.15889 7.99967 7.99984 7.99967Z"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.7268 14.6667C13.7268 12.0867 11.1601 10 8.0001 10C4.8401 10 2.27344 12.0867 2.27344 14.6667"
                stroke="#7D8793"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-regular text-[14px] text-[#616A76]">
            {address.firstName} {address.lastName}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button onClick={onEdit} className="w-fit !min-w-fit !px-0">
          ویرایش
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-[#232429] dark:stroke-white"
            >
              <path
                d="M7.3335 1.33301H6.00016C2.66683 1.33301 1.3335 2.66634 1.3335 5.99967V9.99967C1.3335 13.333 2.66683 14.6663 6.00016 14.6663H10.0002C13.3335 14.6663 14.6668 13.333 14.6668 9.99967V8.66634"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.6933 2.0135L5.43992 7.26684C5.23992 7.46684 5.03992 7.86017 4.99992 8.14684L4.71325 10.1535C4.60659 10.8802 5.11992 11.3868 5.84659 11.2868L7.85325 11.0002C8.13325 10.9602 8.52659 10.7602 8.73325 10.5602L13.9866 5.30684C14.8933 4.40017 15.3199 3.34684 13.9866 2.0135C12.6533 0.680168 11.5999 1.10684 10.6933 2.0135Z"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.93994 2.7666C10.3866 4.35993 11.6333 5.6066 13.2333 6.05993"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Button>
        <div className="h-[18px] w-px bg-[#CCD0D5]" />
        <Button onClick={onDelete} className="w-fit !min-w-fit !px-0">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-[#232429] dark:stroke-white"
            >
              <path
                d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.6665 3.31301L5.81317 2.43967C5.91984 1.80634 5.99984 1.33301 7.1265 1.33301H8.87317C9.99984 1.33301 10.0865 1.83301 10.1865 2.44634L10.3332 3.31301"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5664 6.09375L12.1331 12.8071C12.0598 13.8537 11.9998 14.6671 10.1398 14.6671H5.85977C3.99977 14.6671 3.93977 13.8537 3.86644 12.8071L3.43311 6.09375"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M6.88672 11H9.10672" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.3335 8.33301H9.66683" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CardAddress;
