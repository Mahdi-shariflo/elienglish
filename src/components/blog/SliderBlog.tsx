'use client';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CardBlog1 from './CardBlog1';
import CardBlog2 from './CardBlog2';
import Title from '../common/Title';
import { Blog } from '@/store/types';
import Button from '../common/Button';
type Props = {
  typeCardBlog: 'short' | 'long';
  className?: string;
  title?: string;
  delay: number;
  blogs?: Blog[];
  children?: ReactNode;
  filterActive?: boolean;
  container_class?: string;
};
const filterButtons = [
  {
    type: 'text',
    label: 'متنی',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M14.1641 9.16667H13.3307C13.1097 9.16667 12.8978 9.25446 12.7415 9.41074C12.5852 9.56702 12.4974 9.77899 12.4974 10C12.4974 10.221 12.5852 10.433 12.7415 10.5893C12.8978 10.7455 13.1097 10.8333 13.3307 10.8333H14.1641C14.3851 10.8333 14.597 10.7455 14.7533 10.5893C14.9096 10.433 14.9974 10.221 14.9974 10C14.9974 9.77899 14.9096 9.56702 14.7533 9.41074C14.597 9.25446 14.3851 9.16667 14.1641 9.16667ZM14.1641 12.5H13.3307C13.1097 12.5 12.8978 12.5878 12.7415 12.7441C12.5852 12.9004 12.4974 13.1123 12.4974 13.3333C12.4974 13.5543 12.5852 13.7663 12.7415 13.9226C12.8978 14.0789 13.1097 14.1667 13.3307 14.1667H14.1641C14.3851 14.1667 14.597 14.0789 14.7533 13.9226C14.9096 13.7663 14.9974 13.5543 14.9974 13.3333C14.9974 13.1123 14.9096 12.9004 14.7533 12.7441C14.597 12.5878 14.3851 12.5 14.1641 12.5ZM9.16406 7.5H14.1641C14.3851 7.5 14.597 7.4122 14.7533 7.25592C14.9096 7.09964 14.9974 6.88768 14.9974 6.66667C14.9974 6.44565 14.9096 6.23369 14.7533 6.07741C14.597 5.92113 14.3851 5.83333 14.1641 5.83333H9.16406C8.94305 5.83333 8.73109 5.92113 8.57481 6.07741C8.41853 6.23369 8.33073 6.44565 8.33073 6.66667C8.33073 6.88768 8.41853 7.09964 8.57481 7.25592C8.73109 7.4122 8.94305 7.5 9.16406 7.5V7.5ZM17.4974 2.5H5.83073C5.60972 2.5 5.39775 2.5878 5.24147 2.74408C5.08519 2.90036 4.9974 3.11232 4.9974 3.33333V5.83333H2.4974C2.27638 5.83333 2.06442 5.92113 1.90814 6.07741C1.75186 6.23369 1.66406 6.44565 1.66406 6.66667V15C1.66406 15.663 1.92745 16.2989 2.3963 16.7678C2.86514 17.2366 3.50102 17.5 4.16406 17.5H14.9974C15.8815 17.5 16.7293 17.1488 17.3544 16.5237C17.9795 15.8986 18.3307 15.0507 18.3307 14.1667V3.33333C18.3307 3.11232 18.2429 2.90036 18.0867 2.74408C17.9304 2.5878 17.7184 2.5 17.4974 2.5V2.5ZM4.9974 15C4.9974 15.221 4.9096 15.433 4.75332 15.5893C4.59704 15.7455 4.38508 15.8333 4.16406 15.8333C3.94305 15.8333 3.73109 15.7455 3.57481 15.5893C3.41853 15.433 3.33073 15.221 3.33073 15V7.5H4.9974V15ZM16.6641 14.1667C16.6641 14.6087 16.4885 15.0326 16.1759 15.3452C15.8633 15.6577 15.4394 15.8333 14.9974 15.8333H6.51406C6.61108 15.5661 6.66181 15.2843 6.66406 15V4.16667H16.6641V14.1667ZM9.16406 10.8333H9.9974C10.2184 10.8333 10.4304 10.7455 10.5867 10.5893C10.7429 10.433 10.8307 10.221 10.8307 10C10.8307 9.77899 10.7429 9.56702 10.5867 9.41074C10.4304 9.25446 10.2184 9.16667 9.9974 9.16667H9.16406C8.94305 9.16667 8.73109 9.25446 8.57481 9.41074C8.41853 9.56702 8.33073 9.77899 8.33073 10C8.33073 10.221 8.41853 10.433 8.57481 10.5893C8.73109 10.7455 8.94305 10.8333 9.16406 10.8333V10.8333ZM9.16406 14.1667H9.9974C10.2184 14.1667 10.4304 14.0789 10.5867 13.9226C10.7429 13.7663 10.8307 13.5543 10.8307 13.3333C10.8307 13.1123 10.7429 12.9004 10.5867 12.7441C10.4304 12.5878 10.2184 12.5 9.9974 12.5H9.16406C8.94305 12.5 8.73109 12.5878 8.57481 12.7441C8.41853 12.9004 8.33073 13.1123 8.33073 13.3333C8.33073 13.5543 8.41853 13.7663 8.57481 13.9226C8.73109 14.0789 8.94305 14.1667 9.16406 14.1667V14.1667Z"
        />
      </svg>
    ),
  },
  {
    type: 'video',
    label: 'ویدیوئی',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_9_24218)">
          <path
            d="M19.1693 5.83398L13.3359 10.0007L19.1693 14.1673V5.83398Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.6693 4.16602H2.5026C1.58213 4.16602 0.835938 4.91221 0.835938 5.83268V14.166C0.835938 15.0865 1.58213 15.8327 2.5026 15.8327H11.6693C12.5897 15.8327 13.3359 15.0865 13.3359 14.166V5.83268C13.3359 4.91221 12.5897 4.16602 11.6693 4.16602Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_9_24218">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    type: 'podcast',
    label: 'پادکست',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_9_24215)">
          <path
            d="M6.66406 19.168H13.3307"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 15.832V19.1654"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 0.832031C9.33696 0.832031 8.70107 1.09542 8.23223 1.56426C7.76339 2.03311 7.5 2.66899 7.5 3.33203V9.9987C7.5 10.6617 7.76339 11.2976 8.23223 11.7665C8.70107 12.2353 9.33696 12.4987 10 12.4987C10.663 12.4987 11.2989 12.2353 11.7678 11.7665C12.2366 11.2976 12.5 10.6617 12.5 9.9987V3.33203C12.5 2.66899 12.2366 2.03311 11.7678 1.56426C11.2989 1.09542 10.663 0.832031 10 0.832031V0.832031Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.8307 8.33203V9.9987C15.8307 11.5458 15.2161 13.0295 14.1222 14.1235C13.0282 15.2174 11.5445 15.832 9.9974 15.832C8.4503 15.832 6.96657 15.2174 5.87261 14.1235C4.77864 13.0295 4.16406 11.5458 4.16406 9.9987V8.33203"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_9_24215">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
];
const SliderBlog = ({
  children,
  delay,
  title,
  blogs,
  filterActive,
  typeCardBlog = 'long',
  container_class,
  className = '!h-[350px] lg:!w-[270px] overflow-hidden rounded-lg border border-[#E5EAEF] dark:!border-[#505B74] lg:!h-[320px]',
}: Props) => {
  const [activeType, setActiveType] = useState<string>('text');

  const filteredBlogs = filterActive ? blogs?.filter((blog) => blog.type === activeType) : blogs;
  console.log(filterActive ? blogs?.map((item) => item.type) : null, 'blogsblogsblogs');
  return (
    <div className={`container_page lg:w-full ${container_class}`}>
      {title && (
        <>
          <div className="flex items-center justify-between">
            <Title title={title} />
            {!filterActive && (
              <Link
                className="hidden h-[40px] w-fit items-center justify-center gap-3 rounded-lg border px-3 dark:border-white lg:flex"
                href={''}
              >
                <p className="whitespace-nowrap font-medium text-main">مشاهده بیشتر</p>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0029 6.49609C12.1366 6.49612 12.2649 6.54907 12.3594 6.64355C12.4539 6.73805 12.5068 6.86637 12.5068 7C12.5068 7.10045 12.4769 7.19797 12.4219 7.28027L12.3594 7.35645L9.05957 10.6465L8.20312 11.5H17.0029C17.1355 11.5 17.2627 11.5528 17.3564 11.6465C17.4502 11.7402 17.5029 11.8675 17.5029 12C17.5029 12.1325 17.4501 12.2598 17.3564 12.3535C17.2627 12.4473 17.1355 12.5 17.0029 12.5H8.20312L9.05957 13.3545L12.3594 16.6445L12.3604 16.6455C12.4071 16.6919 12.4443 16.7468 12.4697 16.8076C12.4951 16.8685 12.5088 16.9341 12.5088 17C12.5088 17.066 12.4951 17.1315 12.4697 17.1924C12.4571 17.2228 12.4421 17.2521 12.4238 17.2793L12.3604 17.3555L12.3574 17.3584C12.311 17.4051 12.256 17.4425 12.1953 17.4678C12.1344 17.4931 12.0689 17.5058 12.0029 17.5059C11.937 17.5059 11.8714 17.4931 11.8105 17.4678C11.7801 17.4551 11.7509 17.4393 11.7236 17.4209L11.6475 17.3584L11.6465 17.3564L6.6543 12.3643C6.63158 12.3405 6.61131 12.3147 6.59375 12.2871L6.54883 12.1992L6.54492 12.1904L6.51758 12.0967C6.49881 12.0013 6.50755 11.9018 6.54492 11.8105L6.08301 11.6201L6.5459 11.8105L6.54883 11.8008C6.56078 11.77 6.57606 11.7406 6.59375 11.7129L6.6543 11.6357L11.6465 6.64355C11.7174 6.57267 11.8074 6.52518 11.9043 6.50586L12.0029 6.49609Z"
                      fill="black"
                      stroke="#6E3DFF"
                    />
                  </svg>
                </span>
              </Link>
            )}
            {children && (
              <div className="hidden items-center justify-between gap-10 lg:flex">{children}</div>
            )}
          </div>
          {filterActive && (
            <div className="mt-8 flex w-full items-center justify-between lg:mt-10">
              <div className="flex w-full items-center gap-2">
                {filterButtons.map((btn) => (
                  <Button
                    key={btn.type}
                    onClick={() => setActiveType(btn.type)}
                    className={`!h-[40px] w-full min-w-full rounded-full font-demibold text-[14px] lg:!w-[127px] ${
                      activeType === btn.type ? 'bg-main text-white' : 'bg-[#EDE8FC] text-main'
                    }`}
                  >
                    <span className="text-[16px]">{btn.icon}</span>
                    <span>{btn.label}</span>
                  </Button>
                ))}
              </div>
              <Link
                className="hidden h-[40px] items-center justify-center gap-3 rounded-lg border px-3 dark:border-white lg:flex"
                href={''}
              >
                <p className="whitespace-nowrap font-medium text-main">مشاهده بیشتر</p>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0029 6.49609C12.1366 6.49612 12.2649 6.54907 12.3594 6.64355C12.4539 6.73805 12.5068 6.86637 12.5068 7C12.5068 7.10045 12.4769 7.19797 12.4219 7.28027L12.3594 7.35645L9.05957 10.6465L8.20312 11.5H17.0029C17.1355 11.5 17.2627 11.5528 17.3564 11.6465C17.4502 11.7402 17.5029 11.8675 17.5029 12C17.5029 12.1325 17.4501 12.2598 17.3564 12.3535C17.2627 12.4473 17.1355 12.5 17.0029 12.5H8.20312L9.05957 13.3545L12.3594 16.6445L12.3604 16.6455C12.4071 16.6919 12.4443 16.7468 12.4697 16.8076C12.4951 16.8685 12.5088 16.9341 12.5088 17C12.5088 17.066 12.4951 17.1315 12.4697 17.1924C12.4571 17.2228 12.4421 17.2521 12.4238 17.2793L12.3604 17.3555L12.3574 17.3584C12.311 17.4051 12.256 17.4425 12.1953 17.4678C12.1344 17.4931 12.0689 17.5058 12.0029 17.5059C11.937 17.5059 11.8714 17.4931 11.8105 17.4678C11.7801 17.4551 11.7509 17.4393 11.7236 17.4209L11.6475 17.3584L11.6465 17.3564L6.6543 12.3643C6.63158 12.3405 6.61131 12.3147 6.59375 12.2871L6.54883 12.1992L6.54492 12.1904L6.51758 12.0967C6.49881 12.0013 6.50755 11.9018 6.54492 11.8105L6.08301 11.6201L6.5459 11.8105L6.54883 11.8008C6.56078 11.77 6.57606 11.7406 6.59375 11.7129L6.6543 11.6357L11.6465 6.64355C11.7174 6.57267 11.8074 6.52518 11.9043 6.50586L12.0029 6.49609Z"
                      fill="black"
                      stroke="#6E3DFF"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          )}
        </>
      )}
      {Number(filteredBlogs?.length) < 1 ? (
        <p className="pt-32 text-center font-demibold text-main">محتوایی یافت نشد</p>
      ) : (
        <Swiper
          speed={1000}
          autoplay={{
            delay,
            disableOnInteraction: false,
          }}
          // centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={20}
          modules={[Autoplay]}
          loop
          className="mt-10 !hidden lg:!block"
        >
          {filteredBlogs?.map((item, idx) => {
            return (
              <SwiperSlide className={`overflow-hidden !bg-transparent ${className}`} key={idx}>
                {typeCardBlog === 'long' && <CardBlog1 classImage="lg:!h-[165px]" blog={item} />}
                {typeCardBlog === 'short' && <CardBlog2 blog={item} />}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className="mt-6 flex flex-col gap-5 lg:hidden">
        {blogs?.slice(0, 3).map((item, idx) => {
          if (typeCardBlog === 'long')
            return <CardBlog1 className={className} key={idx} blog={item} />;
          if (typeCardBlog === 'short')
            return <CardBlog2 className="overflow-hidden rounded-lg" key={idx} blog={item} />;
          return null;
        })}
        <Link
          className="flex h-[40px] w-full items-center justify-center gap-3 rounded-lg border px-3 dark:border-white"
          href={''}
        >
          <p className="whitespace-nowrap font-medium text-main">مشاهده بیشتر</p>
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0029 6.49609C12.1366 6.49612 12.2649 6.54907 12.3594 6.64355C12.4539 6.73805 12.5068 6.86637 12.5068 7C12.5068 7.10045 12.4769 7.19797 12.4219 7.28027L12.3594 7.35645L9.05957 10.6465L8.20312 11.5H17.0029C17.1355 11.5 17.2627 11.5528 17.3564 11.6465C17.4502 11.7402 17.5029 11.8675 17.5029 12C17.5029 12.1325 17.4501 12.2598 17.3564 12.3535C17.2627 12.4473 17.1355 12.5 17.0029 12.5H8.20312L9.05957 13.3545L12.3594 16.6445L12.3604 16.6455C12.4071 16.6919 12.4443 16.7468 12.4697 16.8076C12.4951 16.8685 12.5088 16.9341 12.5088 17C12.5088 17.066 12.4951 17.1315 12.4697 17.1924C12.4571 17.2228 12.4421 17.2521 12.4238 17.2793L12.3604 17.3555L12.3574 17.3584C12.311 17.4051 12.256 17.4425 12.1953 17.4678C12.1344 17.4931 12.0689 17.5058 12.0029 17.5059C11.937 17.5059 11.8714 17.4931 11.8105 17.4678C11.7801 17.4551 11.7509 17.4393 11.7236 17.4209L11.6475 17.3584L11.6465 17.3564L6.6543 12.3643C6.63158 12.3405 6.61131 12.3147 6.59375 12.2871L6.54883 12.1992L6.54492 12.1904L6.51758 12.0967C6.49881 12.0013 6.50755 11.9018 6.54492 11.8105L6.08301 11.6201L6.5459 11.8105L6.54883 11.8008C6.56078 11.77 6.57606 11.7406 6.59375 11.7129L6.6543 11.6357L11.6465 6.64355C11.7174 6.57267 11.8074 6.52518 11.9043 6.50586L12.0029 6.49609Z"
                fill="black"
                stroke="#6E3DFF"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SliderBlog;
