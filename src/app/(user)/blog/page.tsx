import BlogSection1 from '@/components/blog/BlogSection1';
import Categories from '@/components/blog/Categories';
import EliCast from '@/components/blog/EliCast';
import EliMag from '@/components/blog/EliMag';
import EliVideo from '@/components/blog/EliVideo';
import SliderBlog from '@/components/blog/SliderBlog';
import { request } from '@/lib/safeClient';
import { metadatMagPage } from '@/seo/mag';
import React from 'react';
function getSectionByName(obj: { [key: string]: any[] }, sectionName: string) {
  return obj[sectionName];
}

export const metadata = {
  ...metadatMagPage,
};

const page = async () => {
  const blogs = await request({ url: '/blog/main' });
  return (
    <div className="!mb-32 lg:pt-32">
      <div className="lg:container_page flex flex-col gap-10 lg:gap-[100px]">
        <BlogSection1 blogs={getSectionByName(blogs.data.data, 'sec1')} />
        <Categories categories={getSectionByName(blogs.data.data, 'sec2')} />

        <SliderBlog
          blogs={getSectionByName(blogs.data.data, 'sec3')}
          title={'جدیدترین مطالب آموزشی'}
          delay={3000}
          typeCardBlog="long"
          filterActive
          container_class=""
        />
        <SliderBlog
          title="آموزش گرامر"
          delay={4000}
          className="!h-[118px] !w-[380px] overflow-hidden rounded-lg border border-[#E5EAEF] dark:border-[#263248]"
          typeCardBlog="short"
          blogs={getSectionByName(blogs.data.data, 'sec4')}
        />

        <EliCast blogs={getSectionByName(blogs.data.data, 'sec5')} delay={5000} />
        <EliMag delay={3200} title="الی مگ" blogs={getSectionByName(blogs.data.data, 'sec6')} />
        <EliVideo blogs={getSectionByName(blogs.data.data, 'sec7')} />
        <SliderBlog
          title="بهترین مقالات الی اینگلیش"
          delay={4500}
          typeCardBlog="long"
          container_class=""
          blogs={getSectionByName(blogs.data.data, 'sec8')}
        />
      </div>
    </div>
  );
};

export default page;
