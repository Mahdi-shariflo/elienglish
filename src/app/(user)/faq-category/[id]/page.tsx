import FrequentlyAskedQuestions from '@/components/faq/FrequentlyAskedQuestions';
import { request } from '@/lib/safeClient';
import React from 'react';
import Search from './Search';
type Props = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ search: string }>;
};
const Page = async ({ params, searchParams }: Props) => {
  const { search } = await searchParams;

  const { id } = await params;
  const data = await request({ url: `/faq/archive-category?slug=${id}` });
  const faq = data?.data?.data;
  return (
    <div className="mb-32 lg:pt-[5.1rem]">
      <div className="bg-faq flex h-[341px] w-full flex-col items-center justify-center">
        <p className="font-extrabold text-[24px] text-white">موضوع پرسش خود را جستجو کنید</p>
        <Search search={search} />
      </div>
      <div className="lg:container_page mt-10 flex flex-col gap-10 lg:gap-[100px]">
        {faq?.faq?.length >= 1 && <FrequentlyAskedQuestions faqs={faq.faq} />}
      </div>
    </div>
  );
};

export default Page;
