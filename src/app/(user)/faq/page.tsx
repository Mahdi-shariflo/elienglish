import Categories from '@/components/faq/Categories';
import FrequentlyAskedQuestions from '@/components/faq/FrequentlyAskedQuestions';
import React from 'react';

const Page = () => {
  return (
    <div className="lg:pt-32">
      <div className="lg:container_page flex flex-col gap-10 lg:gap-[100px]">
        <Categories categories={[]} />
        <FrequentlyAskedQuestions />
      </div>
    </div>
  );
};

export default Page;
