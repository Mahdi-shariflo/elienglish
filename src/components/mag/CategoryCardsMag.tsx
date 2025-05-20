'use client';
import React from 'react';
import Button from '../common/Button';
import { Article } from '@/types';
import Image from '../common/Image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
type Props = {
  className?: string;
  title?: string;
  className_bottom_mag?: string;
  classNameImg?: string;
  url?: string;
  className_top_mag?: string;
  container_mag?: string;
  count?: number;
  blogs: Article[];
};
const CategoryCardsMag = ({
  url,
  title,
  blogs,
  className,
  container_mag,
  classNameImg,
  className_bottom_mag,
  className_top_mag,
  count = 1,
}: Props) => {
  if (blogs?.length < 1) return null;
  const router = useRouter();
  return (
    <div className={`w-full rounded-lg border-[#CCD0D5] lg:border lg:p-[12px] ${className}`}>
      <div className="mb-4 flex items-center justify-between rounded-lg border border-[#CCD0D5] px-2 lg:mb-0 lg:border-0 lg:px-0">
        <p className="font-medium text-main">{title}</p>
        <Button
          onClick={() => router.push(`/magazine/${url}/`)}
          className="w-fit px-3 text-main shadow-sm"
        >
          <span>مشاهده همه</span>
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.37967 3.95312L2.33301 7.99979L6.37967 12.0465"
                stroke="#EC48A5"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.6663 8H2.44629"
                stroke="#EC48A5"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Button>
      </div>
      <div className={container_mag}>
        <div className={className_top_mag}>
          {blogs
            ?.slice(0, count)
            .map((blog, idx) => <CardMag blog={blog} classNameImg={classNameImg} key={idx} />)}
        </div>
        <div className={`space-y-4 ${className_bottom_mag}`}>
          {blogs?.slice(count).map((blog, idx) => (
            <Link href={`/mag/${blog.url}/`} key={idx} className="flex h-[69px] gap-4 lg:h-[99px]">
              <Image
                src={blog?.thumbnailimage?.url}
                alt=""
                className={`relative block h-full min-w-[103px] overflow-hidden rounded-xl border border-gray-200 lg:min-w-[185px]`}
              />

              <div className="flex h-full flex-col justify-between py-px">
                <h4 className="line-clamp-2 font-bold text-[12px] text-[#232429] lg:text-[14px]">
                  {blog.title}
                </h4>

                <div className="flex items-center gap-1 font-regular text-[14px] text-[#7D8793]">
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.33301 1.33398V3.33398"
                        stroke="#7D8793"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.667 1.33398V3.33398"
                        stroke="#7D8793"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.33301 6.06055H13.6663"
                        stroke="#7D8793"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 5.66732V11.334C14 13.334 13 14.6673 10.6667 14.6673H5.33333C3 14.6673 2 13.334 2 11.334V5.66732C2 3.66732 3 2.33398 5.33333 2.33398H10.6667C13 2.33398 14 3.66732 14 5.66732Z"
                        stroke="#7D8793"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.99666 9.13411H8.00265"
                        stroke="#7D8793"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.52987 9.13411H5.53585"
                        stroke="#7D8793"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.52987 11.1341H5.53585"
                        stroke="#7D8793"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p>
                    {new Date(blog.createdAt).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCardsMag;

export const CardMag = ({
  container_class,
  classNameImg,
  blog,
  classImg,
}: {
  classNameImg?: string;
  container_class?: string;
  classImg?: string;
  blog: Article;
}) => {
  return (
    <Link
      href={`/mag/${blog.url}/`}
      className={`flex w-full flex-col justify-between ${container_class}`}
    >
      <div>
        <Image
          src={blog?.thumbnailimage?.url}
          alt=""
          classImg={classImg}
          className={`relative block h-[140px] w-full overflow-hidden !rounded-xl ${classNameImg}`}
        />

        <h4 className="line-clamp-2 pt-4 font-bold text-[14px] text-[#232429]">{blog.title}</h4>
        <p className="line-clamp-2 pt-2 font-regular text-[12px] text-[#616A76]">
          {blog.short_des}
        </p>
      </div>
      <div className="flex items-center gap-1 pt-3 font-regular text-[12px] text-[#7D8793]">
        <span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.33301 1.33398V3.33398"
              stroke="#7D8793"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.667 1.33398V3.33398"
              stroke="#7D8793"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.33301 6.06055H13.6663"
              stroke="#7D8793"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 5.66732V11.334C14 13.334 13 14.6673 10.6667 14.6673H5.33333C3 14.6673 2 13.334 2 11.334V5.66732C2 3.66732 3 2.33398 5.33333 2.33398H10.6667C13 2.33398 14 3.66732 14 5.66732Z"
              stroke="#7D8793"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.99666 9.13411H8.00265"
              stroke="#7D8793"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.52987 9.13411H5.53585"
              stroke="#7D8793"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.52987 11.1341H5.53585"
              stroke="#7D8793"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p>
          {new Date(blog.createdAt).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </Link>
  );
};
