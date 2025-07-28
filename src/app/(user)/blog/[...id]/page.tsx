import CardBlog2 from '@/components/blog/CardBlog2';
import Comments from '@/components/common/Comments';
import Description from '@/components/blog/Description';
import DownloadFiles from '@/components/blog/DownloadFiles';
import InfoBlog from '@/components/blog/InfoBlog';
import MediaPreview from '@/components/blog/MediaPreview';
import RecommendSection from '@/components/blog/RecommendSection';
import Share from '@/components/blog/Share';
import ShareAndCopy from '@/components/blog/ShareAndCopy';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Title from '@/components/common/Title';
import { request } from '@/lib/safeClient';
import { Blog } from '@/types';
import Link from 'next/link';
import React from 'react';
type Props = {
  params: Promise<{ [key: string]: string[] }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const result = await request({ url: `/blog/detail/${decodeURIComponent(id[0]!)}` });
  const blog = result?.data?.data?.blog;
  const blogSidebar = result?.data?.data?.blogSidebar;

  return (
    <div className="bg-white pb-10 dark:bg-dark">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs
          page="/blog/category"
          breadcrumbs={[...blog?.breadcrumbPath, { id: '333', title: blog.title, url: '#' }]}
        />
        <div className="mt-8 flex flex-col items-start gap-7 lg:flex-row">
          <div className="drop_shadow_singleBlog w-full gap-10 overflow-hidden rounded-lg border border-[#F4F6FA] px-3 py-8 dark:!border-[#263248] lg:p-10">
            <div className="flex items-center gap-2">
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2972 15.8623L11.5335 17.8971C11.4871 18.0221 11.4061 18.1263 11.2904 18.2096C11.1747 18.293 11.0474 18.3346 10.9085 18.3346C10.6677 18.3346 10.4767 18.2362 10.3356 18.0394C10.1943 17.8428 10.17 17.6287 10.2627 17.3971L13.5404 8.84151C13.6005 8.68873 13.6977 8.56609 13.832 8.47359C13.9663 8.38096 14.1122 8.33464 14.2695 8.33464H14.8806C15.0381 8.33464 15.1839 8.38096 15.3181 8.47359C15.4524 8.56609 15.5496 8.68873 15.6097 8.84151L18.8877 17.404C18.9802 17.631 18.957 17.8428 18.8181 18.0394C18.6792 18.2362 18.4894 18.3346 18.2487 18.3346C18.0959 18.3346 17.9628 18.293 17.8493 18.2096C17.736 18.1263 17.6538 18.0152 17.6029 17.8763L16.8389 15.8623H12.2972ZM7.55432 11.6471L3.84599 15.3346C3.71168 15.4596 3.55078 15.5256 3.36328 15.5326C3.17578 15.5395 3.01259 15.4735 2.8737 15.3346C2.73939 15.2003 2.67224 15.0383 2.67224 14.8486C2.67224 14.6587 2.73939 14.4966 2.8737 14.3623L6.58203 10.654C5.94773 10.0012 5.40488 9.31839 4.95349 8.60547C4.5021 7.89255 4.13752 7.15415 3.85974 6.39026H5.34599C5.58668 6.96887 5.88064 7.51977 6.22786 8.04297C6.57509 8.56616 7.02182 9.10783 7.56807 9.66797C8.14682 9.07075 8.69891 8.31262 9.22432 7.39359C9.74988 6.47471 10.133 5.5847 10.3737 4.72359H1.52641C1.32738 4.72359 1.16189 4.65762 1.02995 4.52568C0.898003 4.39373 0.832031 4.22818 0.832031 4.02901C0.832031 3.82998 0.898003 3.6645 1.02995 3.53255C1.16189 3.40061 1.32738 3.33464 1.52641 3.33464H6.80432V2.36234C6.80432 2.16332 6.8703 1.99783 7.00224 1.86589C7.13418 1.73394 7.29967 1.66797 7.4987 1.66797C7.69773 1.66797 7.86321 1.73394 7.99516 1.86589C8.1271 1.99783 8.19307 2.16332 8.19307 2.36234V3.33464H13.471C13.67 3.33464 13.8355 3.40061 13.9674 3.53255C14.0994 3.6645 14.1654 3.82998 14.1654 4.02901C14.1654 4.22818 14.0994 4.39373 13.9674 4.52568C13.8355 4.65762 13.67 4.72359 13.471 4.72359H11.7904C11.5358 5.77915 11.1052 6.86012 10.4987 7.96651C9.89217 9.07304 9.23939 9.97818 8.54036 10.6819L10.6237 12.8069L10.082 14.2513L7.55432 11.6471ZM12.7627 14.6123H16.3737L14.5681 9.7513L12.7627 14.6123Z"
                    fill="#6E3DFF"
                  />
                </svg>
              </span>
              <p className="font-medium text-main">{blog?.category?.title}</p>
            </div>
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
          <div className="sticky top-48 w-full min-w-[380px] overflow-hidden lg:w-[380px]">
            <Share />
            <RecommendSection blogSidebar={blogSidebar} />
            <div className="mt-10 hidden lg:block">
              <Title title={blogSidebar?.section2?.title} />
              <div className="mt-8 flex flex-wrap gap-3">
                {blogSidebar?.section2.cards.map(
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
                <p className="font-medium text-[14px] text-main">{blogSidebar?.section3?.title}</p>
              </div>
              <div className="mt-3 space-y-4">
                {blogSidebar?.section3?.listBlogs?.map((blog: Blog, idx: number) => (
                  <CardBlog2 blog={blog} key={idx} />
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
