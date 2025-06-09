'use client';
import useGlobalStore from '@/store/global-store';
import React from 'react';
import Button from '../common/Button';
import { useSession } from 'next-auth/react';
import { User } from '@/types';

const ProfileInformation = () => {
  const session = useSession();
  const user = session.data as User;
  const { setComingSoon } = useGlobalStore();
  return (
    <div className="container_page space-y-4 rounded-2xl border-[#E4E7E9] lg:!w-full lg:border lg:bg-white lg:p-[16px]">
      {/* profile */}
      <div className="relative flex items-center justify-center lg:justify-between">
        <div className="flex flex-col items-center lg:flex-row lg:gap-3">
          <span className="block !h-[70px] !w-[70px] lg:!h-[50px] lg:!w-[50px]">
            <svg
              className="h-full w-full"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M22.0001 40.3512C32.1253 40.3512 40.3334 32.1431 40.3334 22.0179C40.3334 11.8927 32.1253 3.68457 22.0001 3.68457C11.8749 3.68457 3.66675 11.8927 3.66675 22.0179C3.66675 32.1431 11.8749 40.3512 22.0001 40.3512Z"
                fill="#F9A8DA"
              />
              <path
                d="M22 12.7236C18.205 12.7236 15.125 15.8036 15.125 19.5986C15.125 23.3203 18.04 26.3453 21.9083 26.4553C21.9633 26.4553 22.0367 26.4553 22.0733 26.4553C22.11 26.4553 22.165 26.4553 22.2017 26.4553C22.22 26.4553 22.2383 26.4553 22.2383 26.4553C25.9417 26.327 28.8567 23.3203 28.875 19.5986C28.875 15.8036 25.795 12.7236 22 12.7236Z"
                fill="#F472C0"
              />
              <path
                d="M34.4301 35.4938C31.1667 38.5004 26.8034 40.3521 22.0001 40.3521C17.1967 40.3521 12.8334 38.5004 9.57007 35.4938C10.0101 33.8254 11.2017 32.3038 12.9434 31.1304C17.9484 27.7938 26.0884 27.7938 31.0567 31.1304C32.8167 32.3038 33.9901 33.8254 34.4301 35.4938Z"
                fill="#F472C0"
              />
            </svg>
          </span>
          <span className="pt-1 font-regular text-[16px] text-[#232429] lg:pt-0 lg:text-[14px]">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
        {/* <span className='absolute lg:static left-[58%] top-[58%]  w-6 h-6 lg:w-fit lg:h-fit flex justify-center items-center -translate-y-1/2 lg:translate-y-0 bg-main rounded-full lg:bg-transparent -translate-x-1/2 lg:translate-x-0'>
                    <svg className='stroke-white  lg:stroke-[#DD338B]' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.84006 2.39982L3.36673 8.19315C3.16006 8.41315 2.96006 8.84649 2.92006 9.14649L2.6734 11.3065C2.58673 12.0865 3.14673 12.6198 3.92006 12.4865L6.06673 12.1198C6.36673 12.0665 6.78673 11.8465 6.9934 11.6198L12.4667 5.82649C13.4134 4.82649 13.8401 3.68649 12.3667 2.29315C10.9001 0.913152 9.78673 1.39982 8.84006 2.39982Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.92676 3.36621C8.21342 5.20621 9.70676 6.61288 11.5601 6.79954" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 14.667H14" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </span> */}
      </div>
      <div className="flex w-full items-center gap-4 rounded-xl bg-white p-[16px] lg:flex-col lg:items-start lg:gap-0 lg:space-y-4 lg:bg-transparent lg:p-0">
        {/* wallet */}
        <div className="flex w-full justify-between">
          <div className="w-fit">
            <div className="flex items-center gap-2 lg:gap-5">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 9H7"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10.9702V13.0302C22 13.5802 21.56 14.0302 21 14.0502H19.0399C17.9599 14.0502 16.97 13.2602 16.88 12.1802C16.82 11.5502 17.0599 10.9602 17.4799 10.5502C17.8499 10.1702 18.36 9.9502 18.92 9.9502H21C21.56 9.9702 22 10.4202 22 10.9702Z"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H7C4 20.5 2 18.5 2 15.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.50999 16.75 3.54999C19.33 3.84999 21 5.76 21 8.5V9.95001H18.92C18.36 9.95001 17.85 10.17 17.48 10.55Z"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="whitespace-nowrap font-regular text-[14px] text-[#232429]">
                کیف پول
              </span>
            </div>
            <Button
              onClick={() => setComingSoon(true)}
              className="block !h-fit w-fit min-w-fit px-2 pt-1 text-left font-regular text-[10px] text-main lg:text-[12px]"
            >
              افزایش اعتبار
            </Button>
          </div>
          <div className="mt-[2px] flex gap-1 lg:mt-0">
            <span className="font-regular text-[12px] text-[#232429]">0 تومان</span>
            <span className="lg:hidden">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5002 13.2797L6.15355 8.93306C5.64022 8.41973 5.64022 7.57973 6.15355 7.06639L10.5002 2.71973"
                  stroke="#7D8793"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        {/* roz */}
        <div className="flex w-full justify-between">
          <div className="w-fit">
            <div className="flex items-center gap-2 lg:gap-5">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.8159 19.5549L3.50977 11.5277C2.8997 10.8564 2.82965 9.85321 3.34047 9.10401L6.29153 4.78104C6.6564 4.24589 7.26257 3.92578 7.91058 3.92578H16.0973C16.7453 3.92578 17.3524 4.24687 17.7173 4.78201L20.6596 9.10401C21.1704 9.85419 21.1004 10.8564 20.4893 11.5268L13.1822 19.5549C12.5478 20.2525 11.4503 20.2525 10.8159 19.5549Z"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.87416 12.1342L7.05078 10.1289"
                    stroke="#7D8793"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="whitespace-nowrap font-regular text-[14px] text-[#232429]">
                رز کلاب
              </span>
            </div>
            <Button
              onClick={() => setComingSoon(true)}
              className="block !h-fit w-fit min-w-fit whitespace-nowrap px-2 pt-1 text-left font-regular text-[12px] text-main"
            >
              پلن‌های امتیازی
            </Button>
          </div>
          <div className="mt-[2px] flex gap-1 lg:mt-0">
            <span className="whitespace-nowrap pt-px font-regular text-[10px] text-[#232429] lg:pt-0 lg:text-[12px]">
              5 امتیاز
            </span>
            <span className="lg:hidden">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5002 13.2797L6.15355 8.93306C5.64022 8.41973 5.64022 7.57973 6.15355 7.06639L10.5002 2.71973"
                  stroke="#7D8793"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
