import React from 'react';
import { Toman_Icon } from '../common/icon';
import Link from 'next/link';
type Props = {
  section: {
    special: boolean;
    title: string;
    subTitle: string;
    price: number;
    btn: {
      title: string;
      href: string;
    };
  }[];
};
const Section3 = ({ section }: Props) => {
  if (!Array.isArray(section) || section.length < 1) return;
  return (
    <div className="flex items-center justify-center bg-[#F4F6FA] py-10 dark:bg-transparent lg:h-[358px] lg:py-0">
      <div className="container_page flex flex-col items-center justify-between gap-5 lg:flex-row lg:gap-10">
        {section.map((item, idx) => (
          <Link
            key={idx}
            href={item?.btn?.href}
            className="relative flex h-[160px] w-full cursor-pointer flex-col justify-center gap-4 rounded-lg border border-[#E5EAEF] bg-white !p-[15px] transition-all duration-400 after:absolute after:left-1/2 after:top-1/2 after:h-[97%] after:w-[99%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[16px] after:border after:border-transparent after:transition-all after:duration-300 after:content-[''] hover:bg-[#EDE8FC] hover:bg-transparent after:hover:border-main dark:border-[#263248] dark:bg-[#172334] lg:h-[196px] lg:gap-0 lg:rounded-[16px] lg:!p-[32px]"
          >
            <p className="font-demibold text-[16px] dark:text-white lg:text-[20px]">{item.title}</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="font-medium text-[14px] text-main lg:text-[16px]">{item.subTitle}</p>
              <p className="flex items-center gap-1 font-medium text-[18px] dark:text-white">
                {Number(item.price).toLocaleString()} <Toman_Icon />
              </p>
            </div>
            <div className="mt-2 flex !h-[35px] !min-h-[35px] w-[185px] items-center justify-center gap-2 self-end rounded-lg bg-main font-medium text-white">
              <span className="text-[14px] dark:text-white">{item?.btn?.title}</span>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5402 9.00027L8.88021 3.46027C8.3575 3.15843 7.76421 3.00031 7.16061 3.00197C6.557 3.00362 5.96459 3.165 5.44354 3.46971C4.92249 3.77442 4.49137 4.2116 4.19396 4.73685C3.89655 5.2621 3.74345 5.8567 3.75021 6.46027V17.5803C3.75021 18.4873 4.11053 19.3572 4.75191 19.9986C5.39328 20.6399 6.26317 21.0003 7.17021 21.0003C7.77065 20.9993 8.3603 20.8406 8.88021 20.5403L18.5402 15.0003C19.0593 14.6999 19.4902 14.2682 19.7898 13.7487C20.0894 13.2292 20.2471 12.64 20.2471 12.0403C20.2471 11.4405 20.0894 10.8514 19.7898 10.3318C19.4902 9.8123 19.0593 9.38068 18.5402 9.08027V9.00027ZM17.5402 13.1903L7.88021 18.8103C7.6637 18.933 7.41908 18.9975 7.17021 18.9975C6.92135 18.9975 6.67673 18.933 6.46021 18.8103C6.24431 18.6856 6.06503 18.5063 5.9404 18.2904C5.81576 18.0745 5.75017 17.8296 5.75021 17.5803V6.42027C5.75017 6.17097 5.81576 5.92605 5.9404 5.71013C6.06503 5.49422 6.24431 5.31492 6.46021 5.19027C6.67762 5.06943 6.92151 5.00416 7.17021 5.00027C7.41875 5.00537 7.66235 5.07056 7.88021 5.19027L17.5402 10.7703C17.7562 10.8949 17.9356 11.0741 18.0603 11.2901C18.185 11.506 18.2506 11.7509 18.2506 12.0003C18.2506 12.2496 18.185 12.4946 18.0603 12.7105C17.9356 12.9264 17.7562 13.1057 17.5402 13.2303V13.1903Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
            {item.special && (
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-gray-100 p-1">
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.3911 14.375L15.1327 10.475C15.5949 9.62625 15.8356 8.67473 15.8327 7.70833C15.8327 6.16124 15.2182 4.67751 14.1242 3.58354C13.0302 2.48958 11.5465 1.875 9.99941 1.875C8.45231 1.875 6.96858 2.48958 5.87462 3.58354C4.78066 4.67751 4.16608 6.16124 4.16608 7.70833C4.16321 8.67473 4.40395 9.62625 4.86608 10.475L2.60774 14.375C2.53446 14.5019 2.49595 14.6459 2.49609 14.7925C2.49624 14.9391 2.53503 15.083 2.60857 15.2098C2.6821 15.3366 2.78777 15.4417 2.91491 15.5146C3.04206 15.5875 3.18618 15.6256 3.33274 15.625H5.72441L6.94108 17.675C6.98209 17.7429 7.0326 17.8047 7.09108 17.8583C7.24556 18.0072 7.45152 18.0908 7.66608 18.0917H7.78274C7.90855 18.0744 8.02876 18.0287 8.13419 17.9579C8.23962 17.8872 8.32749 17.7932 8.39108 17.6833L9.99941 14.9167L11.6077 17.7083C11.6723 17.8167 11.7605 17.909 11.8659 17.9783C11.9713 18.0476 12.091 18.092 12.2161 18.1083H12.3327C12.5502 18.1096 12.7595 18.0259 12.9161 17.875C12.9721 17.8244 13.0199 17.7654 13.0577 17.7L14.2744 15.65H16.6661C16.8129 15.6506 16.9573 15.6124 17.0846 15.5392C17.2119 15.466 17.3177 15.3605 17.3911 15.2333C17.4689 15.1037 17.5101 14.9554 17.5101 14.8042C17.5101 14.653 17.4689 14.5046 17.3911 14.375V14.375ZM7.65774 15.65L6.91608 14.4083C6.84305 14.2851 6.7395 14.1828 6.61543 14.1113C6.49136 14.0398 6.35095 14.0015 6.20774 14H4.76608L5.95774 11.9333C6.77835 12.7241 7.81259 13.2571 8.93274 13.4667L7.65774 15.65ZM9.99941 11.875C9.17532 11.875 8.36974 11.6306 7.68453 11.1728C6.99933 10.715 6.46528 10.0642 6.14991 9.30285C5.83455 8.54149 5.75203 7.70371 5.9128 6.89546C6.07358 6.0872 6.47041 5.34477 7.05313 4.76206C7.63585 4.17934 8.37828 3.7825 9.18653 3.62173C9.99479 3.46096 10.8326 3.54347 11.5939 3.85884C12.3553 4.1742 13.006 4.70825 13.4639 5.39346C13.9217 6.07866 14.1661 6.88424 14.1661 7.70833C14.1661 8.8134 13.7271 9.87321 12.9457 10.6546C12.1643 11.436 11.1045 11.875 9.99941 11.875V11.875ZM13.7911 14C13.6479 14.0015 13.5075 14.0398 13.3834 14.1113C13.2593 14.1828 13.1558 14.2851 13.0827 14.4083L12.3411 15.65L11.0744 13.4417C12.1906 13.2278 13.221 12.6953 14.0411 11.9083L15.2327 13.975L13.7911 14Z"
                      fill="#6E3DFF"
                    />
                  </svg>
                </span>
                <span className="font-medium text-[14px] text-main lg:text-[18px]">ویژه</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Section3;
