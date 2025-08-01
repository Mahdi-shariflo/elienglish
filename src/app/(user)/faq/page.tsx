import Categories from '@/components/faq/Categories';
import FrequentlyAskedQuestions from '@/components/faq/FrequentlyAskedQuestions';
import { request } from '@/lib/safeClient';
import React from 'react';
import Search from './Search';
type Props = {
  searchParams: Promise<{ search: string }>;
};
const Page = async ({ searchParams }: Props) => {
  const { search } = await searchParams;
  const data = await request({ url: `/faq/main?search=${search}` });
  const faq = data?.data?.data;
  console.log(faq);
  return (
    <div className="-mt-7 mb-32">
      <div className="bg-faq flex h-[341px] w-full flex-col items-center justify-center">
        <p className="font-extrabold text-[24px] text-white">موضوع پرسش خود را جستجو کنید</p>
        <Search search={search} />
      </div>
      <div className="lg:container_page mt-10 flex flex-col gap-10 lg:gap-[100px]">
        {!search && <Categories path="/faq-category" categories={faq?.categories} />}
        {faq?.faq?.length >= 1 && <FrequentlyAskedQuestions faqs={faq.faq} />}
      </div>
    </div>
  );
};

export default Page;
