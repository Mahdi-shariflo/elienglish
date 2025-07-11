import { Delete_icon } from '@/components/common/icon';
import Image from 'next/image';
import React from 'react';
type Props = {
  onDelete?: () => void;
  className?: string;
  comment: {
    fullName: string;
    item: string;
    profile: string;
    comment: string;
    date: string;
  };
};
const CardComment = ({ onDelete, comment, className }: Props) => {
  return (
    <div className={`relative rounded-lg border border-gray-100 p-3 shadow-md ${className}`}>
      <div className="flex items-center gap-2">
        <Image
          width={45}
          height={45}
          className="h-[45px] w-[45px] rounded-full"
          alt=""
          src={comment.profile}
        />
        <div>
          <p className="font-medium text-[16px]">{comment.fullName}</p>
          <span className="font-regular text-[12px] text-[#6A7890]">{comment.item}</span>
        </div>
      </div>
      <p className="mt-5 text-justify font-regular text-[12px] leading-7 text-[#6A7890]">
        {comment.comment}
      </p>
      <div className="mt-5 flex items-center justify-end gap-2">
        <span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.25 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V4.5C15.75 3.67157 15.0784 3 14.25 3Z"
              stroke="#8E98A8"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.25 7.5H15.75"
              stroke="#8E98A8"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 1.5V4.5"
              stroke="#8E98A8"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 1.5V4.5"
              stroke="#8E98A8"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p className="font-medium text-[12px] text-[#8E98A8]">
          {new Date(comment.date).toLocaleDateString()}
        </p>
      </div>
      {onDelete && (
        <button
          className="absolute left-1 top-3 flex !h-[40px] !w-[40px] !min-w-[40px] items-center justify-center rounded-full bg-white p-1"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete();
          }}
        >
          <Delete_icon />
        </button>
      )}
    </div>
  );
};

export default CardComment;
