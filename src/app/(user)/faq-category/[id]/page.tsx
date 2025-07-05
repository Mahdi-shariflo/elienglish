import Input from '@/components/common/form/Input';
import Categories from '@/components/faq/Categories';
import FrequentlyAskedQuestions from '@/components/faq/FrequentlyAskedQuestions';
import { request } from '@/lib/safeClient';
import React from 'react';
type Props = {
  params: Promise<{ [key: string]: string }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await request({ url: `/faq/archive-category?slug=${id}` });
  const faq = data?.data?.data;
  console.log(faq);
  return (
    <div className="mb-32 lg:pt-[5.1rem]">
      <div className="bg-faq flex h-[341px] w-full flex-col items-center justify-center">
        <p className="font-extrabold text-[24px] text-white">موضوع پرسش خود را جستجو کنید</p>
        <Input
          className="mt-4 !w-[600px]"
          classNameInput={'!bg-white pl-2'}
          placeholder="جستجو کنید"
          endContent={
            <svg
              width="50"
              height="48"
              viewBox="0 0 50 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="48" rx="8" fill="#6E3DFF" />
              <path
                d="M24 31C28.4183 31 32 27.4183 32 23C32 18.5817 28.4183 15 24 15C19.5817 15 16 18.5817 16 23C16 27.4183 19.5817 31 24 31Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M33.9984 32.9984L29.6484 28.6484"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          isClear
        />
      </div>
      {/* <div className="lg:container_page mt-10 flex flex-col gap-10 lg:gap-[100px]">
        <Categories path="faq-category" categories={faq?.categories} />
        {
          faq?.faq?.length >=1 &&     <FrequentlyAskedQuestions faqs={faq.faq}/>

        }
      </div> */}
    </div>
  );
};

export default Page;
