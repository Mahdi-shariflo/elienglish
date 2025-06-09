'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import CardComment from '@/components/profile/CardComment';
import EmptyComments from '@/components/profile/EmptyComments';
import { useComments } from '@/hooks/comments/useComments';
import { Spinner } from '@heroui/react';
import React from 'react';

const Page = () => {
  const { data, isPending } = useComments();
  const comments: [] = data?.data?.data?.comments;

  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] pt-4 lg:mb-10 lg:mt-5 lg:!w-full lg:border lg:bg-white lg:p-[16px] lg:pt-0">
      <BackPrevPage title="دیدگاه‌های من" />
      <p className="hidden font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        دیدگاه‌های من
      </p>

      <div className="container_page lg:!w-full">
        {isPending ? (
          <Spinner
            size="lg"
            classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
            className="mt-10 flex items-center justify-center lg:mt-20"
          />
        ) : Number(comments?.length) >= 1 ? (
          <div className="space-y-5">
            {comments.map((comment, idx) => (
              <CardComment comment={comment} key={idx} />
            ))}
          </div>
        ) : (
          <EmptyComments />
        )}
      </div>
    </div>
  );
};

export default Page;
