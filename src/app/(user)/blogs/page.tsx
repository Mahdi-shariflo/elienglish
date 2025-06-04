import CardBlog1 from '@/components/blog/CardBlog1';
import CardBlog2 from '@/components/blog/CardBlog2';
import CardBlogSection1 from '@/components/blog/CardBlogSection1';
import Categories from '@/components/blog/Categories';
import EliCast from '@/components/blog/EliCast';
import EliMag from '@/components/blog/EliMag';
import SliderBlog from '@/components/blog/SliderBlog';
import Banners from '@/components/common/Banners';
import Title from '@/components/common/Title';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col gap-[100px]">
      <div className="grid !h-[700px] grid-cols-6 grid-rows-6 gap-4">
        <div className="col-span-4 row-span-4 overflow-hidden rounded-lg">
          <CardBlogSection1 />
        </div>
        <div className="col-span-2 col-start-5 row-span-2 overflow-hidden rounded-lg">
          <CardBlogSection1 />
        </div>
        <div className="col-span-2 col-start-5 row-span-2 row-start-3 overflow-hidden rounded-lg">
          <CardBlogSection1 />
        </div>
        <div className="col-span-2 col-start-5 row-span-2 row-start-5 overflow-hidden rounded-lg">
          <CardBlogSection1 />
        </div>
        <div className="col-span-2 col-start-3 row-span-2 row-start-5 overflow-hidden rounded-lg">
          <CardBlogSection1 />
        </div>
        <div className="col-span-2 col-start-1 row-span-2 row-start-5 overflow-hidden rounded-lg">
          <CardBlogSection1 />
        </div>
      </div>
      <Categories />
      <SliderBlog title={'جدیدترین مطالب آموزشی'} delay={3000} typeCardBlog="long" />
      <SliderBlog
        title="آموزش گرامر"
        delay={4000}
        className="!h-[118px] !w-[380px] overflow-hidden rounded-lg border border-[#E5EAEF]"
        typeCardBlog="short"
      />
      <Banners
        banners={[
          {
            url: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/c0ac90329c1a7afd9ffba793f025dec6f03cfd3a_1658497984.jpg?x-oss-process=image/quality,q_95/format,webp',
            href: '/',
            title: 'فف',
          },
          {
            url: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/870bc573996f86e8770f43ff922ecc7da7d97b73_1658498259.jpg?x-oss-process=image/quality,q_95/format,webp',
            href: '/',
            title: 'فف',
          },
          {
            url: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/23248bc94a1cc98e98f16d742a825ef0284717fe_1658498127.jpg?x-oss-process=image/quality,q_95/format,webp',
            href: '/',
            title: 'فف',
          },
          {
            url: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/96d1537e1a684ba918b6111ffdd3dfc9e13bd7f4_1658498413.jpg?x-oss-process=image/quality,q_95/format,webp',
            href: '/',
            title: 'فف',
          },
        ]}
      />
      <EliCast delay={5000} />
      <EliMag />
      <Banners
        banners={[
          {
            url: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/c0ac90329c1a7afd9ffba793f025dec6f03cfd3a_1658497984.jpg?x-oss-process=image/quality,q_95/format,webp',
            href: '/',
            title: 'فف',
          },
          {
            url: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/870bc573996f86e8770f43ff922ecc7da7d97b73_1658498259.jpg?x-oss-process=image/quality,q_95/format,webp',
            href: '/',
            title: 'فف',
          },
          {
            url: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/23248bc94a1cc98e98f16d742a825ef0284717fe_1658498127.jpg?x-oss-process=image/quality,q_95/format,webp',
            href: '/',
            title: 'فف',
          },
          {
            url: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/96d1537e1a684ba918b6111ffdd3dfc9e13bd7f4_1658498413.jpg?x-oss-process=image/quality,q_95/format,webp',
            href: '/',
            title: 'فف',
          },
        ]}
      />
    </div>
  );
};

export default page;
