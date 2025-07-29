import React from 'react';
import Image from '../common/Image';
import { Blog } from '@/store/types';
import Link from 'next/link';
const CardBlog = ({ blog }: { blog: Blog }) => {
  return (
    <Link
      href={`/${blog.url}`}
      className="flex h-[127px] w-full items-center gap-4 border-b border-[#E5EAEF] py-4 dark:border-[#505B74] lg:h-[160px]"
    >
      <Image
        classImg="object-fill"
        className="h-full !min-w-[150px] overflow-hidden rounded-xl border-transparent lg:!w-[258px]"
        src={blog?.thumbnailImage?.url}
        alt=""
      />
      <div className="flex h-full flex-col justify-around">
        <div className="flex h-[24px] w-fit items-center justify-center rounded-md !bg-[#EDE8FC] px-2 font-medium text-[10px] text-main dark:!bg-[#172334] lg:h-[28px] lg:text-[13px]">
          {Boolean(blog?.category?.title) ? blog?.category?.title : null}
        </div>
        <p className="line-clamp-2 font-medium text-[14px] leading-6 dark:text-white lg:text-[16px]">
          {blog.title}
        </p>
        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-1">
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16602 2.16602H12.499C12.9631 2.16602 13.4107 2.32757 13.7666 2.61914L13.9131 2.75195C14.2882 3.12703 14.499 3.63558 14.499 4.16602V7.16602H15.833C16.3633 7.1661 16.8721 7.37696 17.2471 7.75195C17.622 8.12701 17.833 8.63566 17.833 9.16602V17.499C17.8326 17.5313 17.8278 17.5633 17.8184 17.5938L17.7754 17.6816C17.7386 17.7361 17.6867 17.7787 17.626 17.8037L17.6025 17.8135C17.5744 17.8267 17.5438 17.8337 17.5127 17.833H17.4961C17.4744 17.8331 17.4529 17.8303 17.4316 17.8262L17.3682 17.8076C17.348 17.7993 17.3286 17.7893 17.3105 17.7773L17.2598 17.7363L15.2871 15.7549L15.1406 15.6074H9.16602C8.63558 15.6074 8.12703 15.3966 7.75195 15.0215C7.37696 14.6464 7.16602 14.1378 7.16602 13.6074V11.9072H5.22461L5.07812 12.0547L2.73926 14.4023C2.70811 14.4332 2.67049 14.458 2.62988 14.4746C2.58935 14.4911 2.54572 14.4993 2.50195 14.499H2.49414L2.48633 14.5C2.45515 14.5008 2.42372 14.4938 2.39551 14.4805L2.38477 14.4746L2.37305 14.4697L2.28906 14.4199L2.22266 14.3477C2.20436 14.3204 2.1902 14.2908 2.18066 14.2598L2.16602 14.1631V4.16602L2.17578 3.96875C2.21469 3.5761 2.36905 3.20362 2.61914 2.89844L2.75195 2.75195C3.08024 2.42367 3.51075 2.22116 3.96875 2.17578L4.16602 2.16602ZM9.16602 7.83301C8.85664 7.83301 8.55853 7.94042 8.32129 8.13477L8.22363 8.22363C7.97359 8.47368 7.83301 8.81239 7.83301 9.16602V13.5742C7.83301 13.8836 7.94046 14.1817 8.13477 14.4189L8.22363 14.5176C8.47364 14.7674 8.81259 14.9072 9.16602 14.9072H15.2393L15.3047 14.9141L15.3672 14.9336C15.3875 14.9422 15.4067 14.9535 15.4248 14.9658L15.4756 15.0078L17.166 16.6982V9.16602C17.166 8.85671 17.0585 8.55851 16.8643 8.32129L16.7754 8.22363C16.5254 7.97366 16.1865 7.83309 15.833 7.83301H9.16602ZM4.16602 2.83301C3.85664 2.83301 3.55853 2.94042 3.32129 3.13477L3.22363 3.22363C2.97358 3.47368 2.83301 3.81239 2.83301 4.16602V13.3711L3.6875 12.5098L4.85156 11.3379C4.86721 11.3224 4.88404 11.308 4.90234 11.2959L4.95996 11.2656C4.98013 11.2574 5.00118 11.2512 5.02246 11.2471L5.08789 11.2412H7.16602V9.16602C7.16602 8.63558 7.37688 8.12703 7.75195 7.75195C8.12703 7.37688 8.63558 7.16602 9.16602 7.16602H13.833V4.16602C13.833 3.81255 13.6922 3.47365 13.4424 3.22363C13.1923 2.97359 12.8526 2.83301 12.499 2.83301H4.16602Z"
                  stroke="#6A7890"
                />
              </svg>
            </span>
            <span className="font-medium text-[12px] text-[#6A7890] lg:text-[14px]">12</span>
          </div> */}
          <div className="flex items-center gap-1">
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8333 3.33398H4.16667C3.24619 3.33398 2.5 4.08018 2.5 5.00065V16.6673C2.5 17.5878 3.24619 18.334 4.16667 18.334H15.8333C16.7538 18.334 17.5 17.5878 17.5 16.6673V5.00065C17.5 4.08018 16.7538 3.33398 15.8333 3.33398Z"
                  stroke="#6A7890"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.5 8.33398H17.5"
                  stroke="#6A7890"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.334 1.66602V4.99935"
                  stroke="#6A7890"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66602 1.66602V4.99935"
                  stroke="#6A7890"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span className="font-medium text-[12px] text-[#6A7890] lg:text-[14px]">
              {new Date(blog.createdAt).toLocaleDateString('fa-IR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;
