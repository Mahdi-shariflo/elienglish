import CardBlog2 from '@/components/blog/CardBlog2';
import Comments from '@/components/common/Comments';
import Description from '@/components/blog/Description';
import DownloadFiles from '@/components/blog/DownloadFiles';
import MediaPreview from '@/components/blog/MediaPreview';
import RecommendSection from '@/components/blog/RecommendSection';
import Share from '@/components/blog/Share';
import ShareAndCopy from '@/components/blog/ShareAndCopy';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Title from '@/components/common/Title';
import { request } from '@/lib/safeClient';
import { Blog } from '@/store/types';
import Link from 'next/link';
import React from 'react';
import { getmetadatSingleMag, jsonLdSingleMag, jsonLdSingleMagBreadcramp } from '@/seo/mag';
import { Metadata } from 'next';
import InfoBlog from '@/components/blog/InfoBlog';

type Props = {
  params: Promise<{ [key: string]: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return getmetadatSingleMag({ id: id });
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const result = await request({ url: `/blog/detail/${decodeURIComponent(id!)}` });
  const blog = result?.data?.data?.blog;
  const blogSidebar = result?.data?.data?.blogSidebar;
  const breadcrumbPath = [
    { id: '3334', title: 'خانه', url: '/' },
    ...(Array.isArray(blog?.breadcrumbPath)
      ? blog?.breadcrumbPath.map((item: { url: string }) => {
          return { ...item, url: `/category/${item.url}` };
        })
      : []),
    { id: '333', title: blog?.title, url: '#' },
  ];
  return (
    <div className="bg-white pb-10 dark:bg-dark lg:pt-10">
      <script
        id="jsonld_mag"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSingleMag({ mag: blog, commentCount: 12 })),
        }}
      />
      <script
        id="jsonld_breadcraumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSingleMagBreadcramp({ breadcrumbPath: breadcrumbPath })),
        }}
      />
      <div className="container_page">
        <Breadcrumbs
          page="/category"
          breadcrumbs={[
            ...(Array.isArray(blog?.breadcrumbPath) ? blog?.breadcrumbPath : []),
            { id: '333', title: blog?.title, url: '#' },
          ]}
        />
        <div className="mt-8 flex flex-col items-start gap-7 lg:flex-row">
          <div className="drop_shadow_singleBlog w-full gap-10 overflow-hidden rounded-lg border-[#F4F6FA] px-3 py-4 dark:!border-[#263248] lg:border lg:p-8">
            <p className="font-medium text-main">{blog?.category?.title}</p>
            <MediaPreview media={blog} />
            {/* title */}
            <InfoBlog blog={blog} />
            <Description blog={blog} />
            <DownloadFiles blog={blog} />
            <ShareAndCopy />
            <Comments
              commentInfo={{
                ...blog,
                targetType: 'blog',
              }}
            />
          </div>
          <div className="sticky top-48 z-30 w-full min-w-[380px] overflow-hidden lg:w-[380px]">
            <Share className="!hidden lg:!flex" />
            <RecommendSection blogSidebar={blogSidebar} />
            <div className="mt-10 hidden lg:block">
              <Title title={blogSidebar?.section2?.title} />
              <div className="mt-8 flex flex-wrap gap-3">
                {blogSidebar?.section2?.cards?.map(
                  (item: { cardTitle: string; cardLink: string }, idx: number) => (
                    <Link
                      key={idx}
                      className="flex !h-[36px] w-fit items-center justify-center rounded-lg bg-[#F4F6FA] px-4 font-medium text-main dark:bg-[#172334]"
                      href={item?.cardLink}
                    >
                      {item?.cardTitle}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="mt-10 block rounded-lg bg-[#F4F6FA] p-4 dark:bg-[#172334]">
              <div className="flex items-center gap-3">
                <span>
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 8H14C13.7348 8 13.4804 8.10536 13.2929 8.29289C13.1054 8.48043 13 8.73478 13 9C13 9.26522 13.1054 9.51957 13.2929 9.70711C13.4804 9.89464 13.7348 10 14 10H15C15.2652 10 15.5196 9.89464 15.7071 9.70711C15.8946 9.51957 16 9.26522 16 9C16 8.73478 15.8946 8.48043 15.7071 8.29289C15.5196 8.10536 15.2652 8 15 8ZM15 12H14C13.7348 12 13.4804 12.1054 13.2929 12.2929C13.1054 12.4804 13 12.7348 13 13C13 13.2652 13.1054 13.5196 13.2929 13.7071C13.4804 13.8946 13.7348 14 14 14H15C15.2652 14 15.5196 13.8946 15.7071 13.7071C15.8946 13.5196 16 13.2652 16 13C16 12.7348 15.8946 12.4804 15.7071 12.2929C15.5196 12.1054 15.2652 12 15 12ZM9 6H15C15.2652 6 15.5196 5.89464 15.7071 5.70711C15.8946 5.51957 16 5.26522 16 5C16 4.73478 15.8946 4.48043 15.7071 4.29289C15.5196 4.10536 15.2652 4 15 4H9C8.73478 4 8.48043 4.10536 8.29289 4.29289C8.10536 4.48043 8 4.73478 8 5C8 5.26522 8.10536 5.51957 8.29289 5.70711C8.48043 5.89464 8.73478 6 9 6ZM19 0H5C4.73478 0 4.48043 0.105357 4.29289 0.292893C4.10536 0.48043 4 0.734784 4 1V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5V15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H16C17.0609 18 18.0783 17.5786 18.8284 16.8284C19.5786 16.0783 20 15.0609 20 14V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM4 15C4 15.2652 3.89464 15.5196 3.70711 15.7071C3.51957 15.8946 3.26522 16 3 16C2.73478 16 2.48043 15.8946 2.29289 15.7071C2.10536 15.5196 2 15.2652 2 15V6H4V15ZM18 14C18 14.5304 17.7893 15.0391 17.4142 15.4142C17.0391 15.7893 16.5304 16 16 16H5.82C5.93642 15.6793 5.9973 15.3411 6 15V2H18V14ZM9 10H10C10.2652 10 10.5196 9.89464 10.7071 9.70711C10.8946 9.51957 11 9.26522 11 9C11 8.73478 10.8946 8.48043 10.7071 8.29289C10.5196 8.10536 10.2652 8 10 8H9C8.73478 8 8.48043 8.10536 8.29289 8.29289C8.10536 8.48043 8 8.73478 8 9C8 9.26522 8.10536 9.51957 8.29289 9.70711C8.48043 9.89464 8.73478 10 9 10ZM9 14H10C10.2652 14 10.5196 13.8946 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13C11 12.7348 10.8946 12.4804 10.7071 12.2929C10.5196 12.1054 10.2652 12 10 12H9C8.73478 12 8.48043 12.1054 8.29289 12.2929C8.10536 12.4804 8 12.7348 8 13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14Z"
                      fill="#6E3DFF"
                    />
                  </svg>
                </span>
                <p className="font-medium text-[16px] text-main">{blogSidebar?.section3?.title}</p>
              </div>
              <div className="mt-3 space-y-4">
                {blogSidebar?.section3?.listBlogs?.map((blog: Blog, idx: number) => (
                  <CardBlog2
                    classImage="lg:!h-[85px] lg:min-w-[135px] lg:!w-[85px]"
                    blog={blog}
                    key={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
