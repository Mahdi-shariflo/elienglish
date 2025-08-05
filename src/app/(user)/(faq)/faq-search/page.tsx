import Categories from '@/components/faq/Categories';
import FrequentlyAskedQuestions from '@/components/faq/FrequentlyAskedQuestions';
import { request } from '@/lib/safeClient';
import React from 'react';
import Search from './Search';
import { Metadata } from 'next';
import { BASEURL_SITE } from '@/lib/variable';
import { getRobotsMeta } from '@/seo/common';
type Props = {
  searchParams: Promise<{ search: string }>;
};
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // read route params
  const searchParamsFilter = await searchParams;
  const hasQueryParams = Object.keys(searchParamsFilter).length > 0;

  return {
    title: 'سرچ سوالات متداول',
    description: 'سرچ سوالات متداول',
    alternates: {
      canonical: `${BASEURL_SITE}/fa1`,
    },
    robots: getRobotsMeta(
      hasQueryParams
        ? {
            index: false,
            follow: false,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': '-1',
          }
        : {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': '-1',
          }
    ),
  };
}

const Page = async ({ searchParams }: Props) => {
  const { search } = await searchParams;
  const data = await request({ url: `/faq/search?search=${search}` });
  const faq = data?.data?.data;
  return (
    <div className="-mt-14 mb-32 lg:-mt-7">
      <div className="bg-faq flex !h-[280px] w-full flex-col items-center justify-center lg:!h-[341px]">
        <p className="font-extrabold text-[20px] text-white lg:text-[24px]">
          موضوع پرسش خود را جستجو کنید
        </p>
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
