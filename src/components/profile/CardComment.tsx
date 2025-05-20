'use client';
import React, { useState } from 'react';
import StarRating from '../common/StarRateing';
import Button from '../common/Button';
import { statusIcon } from '@/lib/data';
import { Product } from '@/types/home';
import Image from '../common/Image';
import Link from 'next/link';
type Props = {
  comment: {
    product: Product;
    commentTitle: string;
    comment: string;
    createdAt: string;
    published: string;
    rate: string;
  };
};
const CardComment = ({ comment }: Props) => {
  const [open, setOpen] = useState(false);
  const findStatus = statusIcon.find((item) => item.status === comment?.published);
  return (
    <div className="rounded-xl bg-white p-2 shadow-favorite lg:p-4">
      {comment?.product && (
        <Link
          href={`/product/${comment?.product?.url}/`}
          className="mb-3 flex flex-col items-start justify-between lg:flex-row"
        >
          <div className="flex items-center gap-2">
            <span className="relative block h-[72px] w-[64px]">
              <Image
                src={`${comment?.product?.thumbnailImage?.url}`}
                alt=""
                className="h-14 w-14 object-contain"
              />
            </span>
            <p className="line-clamp-2 font-medium text-[14px] text-[#232429]">
              {comment?.product?.title}
            </p>
          </div>
          <span className="flex w-full items-center justify-start gap-2 lg:w-[200px] lg:justify-end">
            <span>{findStatus?.icon}</span>
            <p className="line-clamp-2 font-medium text-[14px] text-[#393B40]">
              {findStatus?.status === 'Awaiting' ? 'در انتظار تائید' : findStatus?.name}
            </p>
          </span>
        </Link>
      )}

      <div className="border-b border-t border-[#E4E7E9] py-1 pt-2">
        <div className="flex items-center justify-between">
          <p className="font-medium text-[14px] text-[#616A76]">
            {new Date(comment.createdAt).toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <StarRating setRating={() => {}} readonly intialValue={Number(comment.rate)} />
        </div>
        <p className="font-medium">{comment.commentTitle}</p>
        <p
          className={`py-3 font-regular text-[14px] text-[#40444A] ${open ? '' : 'line-clamp-2 lg:line-clamp-none'}`}
        >
          {comment.comment}
        </p>
        {comment.comment.length >= 160 && (
          <Button onClick={() => setOpen(!open)} className="w-fit text-[12px] text-main lg:hidden">
            <span>مشاهده {open ? 'کمتر' : 'بیشتر'}</span>
            <span className={`${open ? 'rotate-180' : ''}`}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668"
                  stroke="#DD338B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Button>
        )}
      </div>
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
