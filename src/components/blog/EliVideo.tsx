'use client';
import { Blog } from '@/types';
import React from 'react';
import Title from '../common/Title';
import Link from 'next/link';
import Image from '../common/Image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CardBlog1 from './CardBlog1';
const gridPositions = [
  'row-span-2', // blog[0]
  'row-span-2', // blog[1]
  'row-span-2 col-start-1 row-start-3', // blog[2]
  'row-span-2 col-start-2 row-start-3', // blog[3]
  'col-span-3 row-span-4 col-start-3 row-start-1', // blog[4]
];

const EliVideo = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="container_page lg:w-full">
      {
        <div className="flex items-center justify-between">
          <Title title={'الی ویدیو'} />
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
      }
      <div className="mt-5 hidden !h-[400px] grid-cols-5 grid-rows-4 gap-4 lg:grid 2xl:!h-[500px]">
        {blogs.slice(0, 5).map((blog, i) => {
          const className = gridPositions[i];
          return (
            <Link
              key={blog._id || blog.title}
              href={`/blogs/${blog.url}`}
              className={`group relative block h-full w-full cursor-pointer overflow-hidden rounded-lg bg-white ${className}`}
            >
              <Image
                classImg="!object-fill"
                className="h-full w-full bg-white transition-all duration-400 group-hover:scale-105"
                src={blog.thumbnailImage.url}
                alt=""
              />
              <div className="absolute bottom-0 z-30 flex h-[65px] w-full flex-col justify-center bg-white/30 p-3 backdrop-blur-lg lg:h-[65px]">
                <p className="line-clamp-1 font-medium text-lg text-white lg:text-lg">
                  {blog.title}
                </p>
              </div>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg
                  width="70"
                  height="70"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="42" height="42" rx="21" fill="#101010" fill-opacity="0.4" />
                  <path
                    d="M27.5402 18.0003L17.8802 12.4603C17.3575 12.1584 16.7642 12.0003 16.1606 12.002C15.557 12.0036 14.9646 12.165 14.4435 12.4697C13.9225 12.7744 13.4914 13.2116 13.194 13.7368C12.8966 14.2621 12.7435 14.8567 12.7502 15.4603V26.5803C12.7502 27.4873 13.1105 28.3572 13.7519 28.9986C14.3933 29.6399 15.2632 30.0003 16.1702 30.0003C16.7707 29.9993 17.3603 29.8406 17.8802 29.5403L27.5402 24.0003C28.0593 23.6999 28.4902 23.2682 28.7898 22.7487C29.0894 22.2292 29.2471 21.64 29.2471 21.0403C29.2471 20.4405 29.0894 19.8514 28.7898 19.3318C28.4902 18.8123 28.0593 18.3807 27.5402 18.0803V18.0003ZM26.5402 22.1903L16.8802 27.8103C16.6637 27.933 16.4191 27.9975 16.1702 27.9975C15.9213 27.9975 15.6767 27.933 15.4602 27.8103C15.2443 27.6856 15.065 27.5063 14.9404 27.2904C14.8158 27.0745 14.7502 26.8296 14.7502 26.5803V15.4203C14.7502 15.171 14.8158 14.926 14.9404 14.7101C15.065 14.4942 15.2443 14.3149 15.4602 14.1903C15.6776 14.0694 15.9215 14.0042 16.1702 14.0003C16.4187 14.0054 16.6624 14.0706 16.8802 14.1903L26.5402 19.7703C26.7562 19.8949 26.9356 20.0741 27.0603 20.2901C27.185 20.506 27.2506 20.7509 27.2506 21.0003C27.2506 21.2496 27.185 21.4946 27.0603 21.7105C26.9356 21.9264 26.7562 22.1057 26.5402 22.2303V22.1903Z"
                    fill="white"
                  />
                </svg>
              </span>
            </Link>
          );
        })}
      </div>
      <div className="overflow-hidden lg:hidden">
        <Swiper
          dir="rtl"
          speed={1000}
          autoplay={{
            delay: 3600,
            disableOnInteraction: false,
          }}
          // centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={20}
          modules={[Autoplay]}
          loop
          className="mt-6"
        >
          {blogs?.map((item, idx) => {
            return (
              <SwiperSlide
                className={
                  '!h-[256px] !w-[270px] overflow-hidden rounded-lg border border-[#E5EAEF] !bg-transparent dark:!border-none lg:!h-[320px]'
                }
                key={idx}
              >
                <CardBlog1 blog={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Link
          className="mt-3 flex h-[40px] items-center justify-center gap-3 rounded-lg border px-3 dark:border-white lg:hidden"
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

export default EliVideo;
