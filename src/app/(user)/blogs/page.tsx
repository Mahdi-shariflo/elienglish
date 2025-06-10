import BlogSection1 from '@/components/blog/BlogSection1';
import CardBlogSection1 from '@/components/blog/CardBlogSection1';
import Categories from '@/components/blog/Categories';
import EliCast from '@/components/blog/EliCast';
import EliMag from '@/components/blog/EliMag';
import SliderBlog from '@/components/blog/SliderBlog';
import Banners from '@/components/common/Banners';
import { request } from '@/lib/safeClient';
import React from 'react';
function getSectionByName(obj: { [key: string]: any[] }, sectionName: string) {
  return obj[sectionName];
}

const page = async () => {
  const blogs = await request({ url: '/blog/main' });
  return (
    <div className="flex flex-col gap-[100px]">
      <BlogSection1 blogs={getSectionByName(blogs.data.data, 'sec1')} />
      <Categories categories={getSectionByName(blogs.data.data, 'sec2')} />
      <SliderBlog
        blogs={getSectionByName(blogs.data.data, 'sec3')}
        title={'جدیدترین مطالب آموزشی'}
        delay={3000}
        typeCardBlog="long"
      />
      <SliderBlog
        title="آموزش گرامر"
        delay={4000}
        className="!h-[118px] !w-[380px] overflow-hidden rounded-lg border border-[#E5EAEF]"
        typeCardBlog="short"
        blogs={getSectionByName(blogs.data.data, 'sec4')}
      />

      <EliCast blogs={getSectionByName(blogs.data.data, 'sec5')} delay={5000} />
      <EliMag title="الی مگ" blogs={getSectionByName(blogs.data.data, 'sec6')} />
      <EliMag title="الی ویدیو" blogs={getSectionByName(blogs.data.data, 'sec7')} />
    </div>
  );
};

export default page;
