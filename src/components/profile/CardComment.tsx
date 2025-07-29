'use client';
import React, { useState } from 'react';
import StarRating from '../common/StarRateing';
import Button from '../common/Button';
import { statusIcon } from '@/lib/data';
import { Course } from '@/store/types/home';
import Image from '../common/Image';
import Link from 'next/link';
type Props = {
  comment: {
    course: Course;
    title: string;
    comment: string;
    createdAt: string;
    published: string;
    rating: string;
  };
};
const CardComment = ({ comment }: Props) => {
  return (
    <div className="shadow-favorite block w-full rounded-xl bg-white lg:p-4">
      {comment?.course && (
        <Link
          href={`/product/${comment?.course?.url}/`}
          className="mb-3 flex flex-col items-start justify-between gap-2 rounded-2xl border border-[#E5EAEF] p-6 lg:flex-row"
        >
          <div className="flex w-full flex-col items-center lg:flex-row">
            <div className="flex flex-1 items-start gap-4 border-[#EDEDED] pl-3 lg:gap-8 lg:border-l">
              <Image
                src={`${comment?.course?.thumbnailImage?.url}`}
                alt=""
                className="!h-[102px] !w-[142px] overflow-hidden rounded-lg object-contain"
              />
              <div className="w-full space-y-5">
                <p className="line-clamp-2 text-[14px] font-semibold text-[#0B1524] lg:text-[18px]">
                  {comment?.course?.title}
                </p>
                <p className="font-regular text-[12px] text-[#505B74] lg:text-[14px]">
                  {comment?.title}
                </p>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-regular text-[12px] text-[#172334]">{comment.rating}</span>
                  <span>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.36487 3.37855C7.31486 1.67436 7.78985 0.822266 8.5 0.822266C9.21015 0.822266 9.68514 1.67436 10.6351 3.37855L10.8809 3.81944C11.1509 4.30372 11.2858 4.54586 11.4963 4.70562C11.7068 4.86539 11.9689 4.92469 12.4931 5.0433L12.9703 5.15129C14.8151 5.56868 15.7375 5.77738 15.9569 6.48306C16.1764 7.18875 15.5476 7.92407 14.2899 9.39471L13.9646 9.77518C13.6072 10.1931 13.4285 10.402 13.3481 10.6606C13.2677 10.9191 13.2947 11.1978 13.3488 11.7554L13.398 12.2631C13.5881 14.2252 13.6832 15.2063 13.1086 15.6424C12.5341 16.0786 11.6705 15.6809 9.94324 14.8856L9.49639 14.6799C9.00556 14.4539 8.76014 14.3409 8.5 14.3409C8.23986 14.3409 7.99444 14.4539 7.50362 14.6799L7.05676 14.8856C5.32951 15.6809 4.46588 16.0786 3.89136 15.6424C3.31684 15.2063 3.41191 14.2252 3.60205 12.2631L3.65124 11.7554C3.70527 11.1978 3.73229 10.9191 3.6519 10.6606C3.57151 10.402 3.39282 10.1931 3.03544 9.77518L2.71007 9.39471C1.45244 7.92407 0.823618 7.18875 1.04307 6.48306C1.26251 5.77738 2.18489 5.56868 4.02965 5.15129L4.50692 5.0433C5.03114 4.92469 5.29325 4.86539 5.50371 4.70562C5.71417 4.54586 5.84914 4.30372 6.1191 3.81944L6.36487 3.37855Z"
                        fill="#FF9800"
                        stroke="#FF9800"
                        stroke-width="1.125"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full space-y-3 px-3 lg:w-fit">
              <Link
                className="flex h-[40px] w-full items-center justify-center rounded-lg bg-main font-medium text-white lg:w-[120px]"
                href={'/'}
              >
                مشاهده محصول
              </Link>
              <Link
                className={`flex h-[40px] w-full items-center justify-center rounded-lg border border-[#E5EAEF] font-medium lg:w-[120px] ${comment.published ? 'text-[#34C759]' : 'text-[#FF383C]'}`}
                href={'/'}
              >
                {comment.published ? 'تایید شده' : 'تایید نشده'}
              </Link>
            </div>
          </div>
        </Link>
      )}

      {/* 
            <div className='flex items-center justify-end'>
                <Button className='w-fit !min-w-fit px-2'>
                    <span>
                        ویرایش
                    </span>
                    <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.33301 1.33301H5.99967C2.66634 1.33301 1.33301 2.66634 1.33301 5.99967V9.99967C1.33301 13.333 2.66634 14.6663 5.99967 14.6663H9.99967C13.333 14.6663 14.6663 13.333 14.6663 9.99967V8.66634" stroke="#232429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.6933 2.0135L5.43992 7.26684C5.23992 7.46684 5.03992 7.86017 4.99992 8.14684L4.71325 10.1535C4.60659 10.8802 5.11992 11.3868 5.84659 11.2868L7.85325 11.0002C8.13325 10.9602 8.52659 10.7602 8.73325 10.5602L13.9866 5.30684C14.8933 4.40017 15.3199 3.34684 13.9866 2.0135C12.6533 0.680168 11.5999 1.10684 10.6933 2.0135Z" stroke="#232429" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.94043 2.7666C10.3871 4.35993 11.6338 5.6066 13.2338 6.05993" stroke="#232429" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </Button>
                <div className='bg-[#CCD0D5] h-[18px] w-px' />
                <Button className='w-fit !min-w-fit px-2'>
                    <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665" stroke="#232429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.66699 3.31301L5.81366 2.43967C5.92033 1.80634 6.00033 1.33301 7.12699 1.33301H8.87366C10.0003 1.33301 10.087 1.83301 10.187 2.44634L10.3337 3.31301" stroke="#232429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.5669 6.09375L12.1336 12.8071C12.0603 13.8537 12.0003 14.6671 10.1403 14.6671H5.86026C4.00026 14.6671 3.94026 13.8537 3.86693 12.8071L3.43359 6.09375" stroke="#232429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.88672 11H9.10672" stroke="#232429" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.33301 8.33301H9.66634" stroke="#232429" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </Button>
            </div> */}
    </div>
  );
};

export default CardComment;
