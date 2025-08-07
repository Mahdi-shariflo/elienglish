'use client';
import React from 'react';
import Image from '../common/Image';
import Link from 'next/link';
import StarRating from '../common/StarRateing';

type Props = {
  comment: {
    title: string;
    comment: string;
    createdAt: string;
    published: string;
    rating: string;
    course?: {
      url: string;
      title: string;
      thumbnailImage: { url: string };
    };
    blog?: {
      url: string;
      title: string;
      thumbnailImage: { url: string };
    };
    product?: {
      url: string;
      title: string;
      thumbnailImage: { url: string };
    };
  };
};

const CardComment = ({ comment }: Props) => {
  const data = comment.blog || comment.course || comment.product;
  const name = comment.blog
    ? 'blog'
    : comment.course
      ? 'course'
      : comment.product
        ? 'product'
        : null;

  if (!data || !name) return null;

  const pathMap: Record<'course' | 'blog' | 'product', string> = {
    course: '/course',
    blog: '/blog',
    product: '/product',
  };

  return (
    <div className="shadow-favorite block w-full rounded-xl bg-white dark:bg-[#172334] lg:p-4">
      <Link
        href={`${pathMap[name]}/${data.url}`}
        className="mb-3 flex flex-col items-start justify-between gap-2 rounded-2xl border border-[#E5EAEF] p-3 dark:border-[#263248] lg:flex-row lg:p-6"
      >
        <div className="flex w-full flex-col items-center lg:flex-row">
          <div className="flex flex-1 items-start gap-4 border-[#EDEDED] pl-3 dark:border-[#263248] lg:gap-8 lg:border-l">
            <Image
              src={data.thumbnailImage?.url}
              alt=""
              className="!h-[102px] !w-[142px] overflow-hidden rounded-lg object-contain"
            />
            <div className="w-full space-y-5">
              <p className="line-clamp-2 text-[14px] font-semibold text-[#0B1524] dark:text-white lg:text-[18px]">
                {data.title}
              </p>
              <p className="font-regular text-[12px] text-[#505B74] dark:text-[#8E98A8] lg:text-[14px]">
                {comment?.title}
              </p>
              <div className="flex items-center justify-end gap-2">
                <span className="font-regular text-[12px] text-[#172334] dark:text-white">
                  {comment.rating}
                </span>
                {/* آیکون ستاره */}
                <span>
                  <StarRating intialValue={Number(comment.rating)} />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full space-y-3 px-3 lg:w-fit">
            <Link
              className="flex h-[40px] w-full items-center justify-center rounded-lg bg-main font-medium text-white lg:w-[120px]"
              href={`${pathMap[name]}/${data.url}`}
            >
              مشاهده {name === 'course' ? 'دوره' : name === 'blog' ? 'مقاله' : 'محصول'}
            </Link>
            <Link
              className={`flex h-[40px] w-full items-center justify-center rounded-lg border border-[#E5EAEF] font-medium dark:border-[#263248] lg:w-[120px] ${comment.published ? 'text-[#34C759]' : 'text-[#FF383C]'}`}
              href="#"
            >
              {comment.published ? 'تایید شده' : 'تایید نشده'}
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardComment;
