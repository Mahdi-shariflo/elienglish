import Breadcrumbs from '@/components/common/Breadcrumbs';
import Comments from '@/components/common/Comments';
import Title from '@/components/common/Title';
import { request } from '@/lib/safeClient';
import { Course } from '@/types/home';
import { CircularProgress } from '@heroui/react';
import React from 'react';
import Chapters from '../Chapters';
import VideoPlayer from '@/components/admin/common/VideoPlayer';
type Props = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};
const Page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { video } = await searchParams;
  const result = await request({
    url: `/course/view-course-page?courseId=${decodeURIComponent(id)}`,
  });
  const course: Course = result?.data?.data?.course;
  const watchVideoData = result.data.data?.WatchedVideo;
  const accessibleChapters = result.data.data?.accessibleChapters;

  const cleanDescription =
    typeof course?.description === 'string'
      ? course?.description
          ?.replace(/\[caption.*?](.*?)\[\/caption\]/g, '$1') // حذف فقط تگ‌های [caption] و نگه داشتن محتوای داخل آن
          ?.replace(/id="attachment_\d+"/g, '') // حذف idهای attachment
          ?.replace(/align=".*?"/g, '') // حذف ویژگی align
          ?.replace(/width=".*?"/g, '') // حذف ویژگی width
          ?.replace(/height=".*?"/g, '')
      : ''; // حذف ویژگی height

  const findIstComplated = watchVideoData?.videoProgresses?.find(
    (item: { isCompleted: boolean }) => item.isCompleted === false
  );
  const allEpisodes = accessibleChapters?.flatMap((ch: { episodes: [] }) => ch.episodes); // همه اپیزودهای دوره
  const totalEpisodes = allEpisodes.length;

  const completedEpisodes = watchVideoData?.videoProgresses?.filter(
    (p: { isCompleted: boolean; episodeId: string }) => {
      return (
        p.isCompleted === true && allEpisodes.some((e: { _id: string }) => e._id === p.episodeId)
      );
    }
  ).length;

  const progressPercent =
    totalEpisodes > 0 ? Math.round((completedEpisodes / totalEpisodes) * 100) : 0;

  console.log(accessibleChapters);

  return (
    <div className="bg-white pb-10 dark:bg-dark lg:bg-[#f7f7f7]">
      <div className="container_page pt-10 lg:pt-32">
        <Breadcrumbs
          page="/course/category"
          breadcrumbs={[{ id: '333', title: course.title, url: '#' }]}
        />
        <div className="mt-10 flex items-start">
          <div>
            <div className="!mt-0 border border-gray-100 bg-white p-3 dark:!border-[#263248] dark:bg-[#172334]">
              <div className="flex items-center justify-between py-2">
                <p className="font-extrabold text-[16px] text-[#0B1524] dark:!border-[#263248] dark:text-[#8E98A8]">
                  {course?.title}
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <CircularProgress
                      color="success"
                      label=""
                      showValueLabel={false} // عدد رو مخفی می‌کنیم اگر فقط آیکن بخوایم
                      size="lg"
                      value={progressPercent}
                      classNames={{
                        svg: 'stroke-[#6E3DFF]', // رنگ خط دایره
                        indicator: 'text-[#6E3DFF]', // رنگ متن/آیکن داخل
                        value: 'text-[#6E3DFF]', // رنگ عدد داخل
                      }}
                    ></CircularProgress>
                    <span className="-translate-y-1/ absolute left-1/2 top-[30%] block h-6 w-6 -translate-x-1/2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2187 14.418L14.9829 10.557C15.4404 9.71671 15.6788 8.7747 15.6759 7.81797C15.6759 6.28634 15.0675 4.81745 13.9845 3.73443C12.9015 2.6514 11.4326 2.04297 9.90094 2.04297C8.36931 2.04297 6.90042 2.6514 5.8174 3.73443C4.73437 4.81745 4.12594 6.28634 4.12594 7.81797C4.1231 8.7747 4.36144 9.71671 4.81894 10.557L2.58319 14.418C2.51064 14.5436 2.47251 14.6862 2.47266 14.8313C2.4728 14.9764 2.51121 15.1189 2.58401 15.2444C2.6568 15.3699 2.76142 15.474 2.88729 15.5462C3.01316 15.6183 3.15584 15.656 3.30094 15.6555H5.66869L6.87319 17.685C6.91379 17.7522 6.9638 17.8133 7.02169 17.8665C7.17463 18.0139 7.37853 18.0966 7.59094 18.0975H7.70644C7.83099 18.0804 7.95 18.0351 8.05437 17.9651C8.15875 17.895 8.24574 17.802 8.30869 17.6932L9.90094 14.9542L11.4932 17.718C11.5571 17.8252 11.6445 17.9166 11.7488 17.9852C11.8531 18.0538 11.9716 18.0978 12.0954 18.114H12.2109C12.4262 18.1153 12.6334 18.0324 12.7884 17.883C12.8439 17.8329 12.8912 17.7744 12.9287 17.7097L14.1332 15.6802H16.5009C16.6463 15.6808 16.7893 15.643 16.9153 15.5705C17.0413 15.4981 17.146 15.3936 17.2187 15.2677C17.2958 15.1394 17.3365 14.9925 17.3365 14.8428C17.3365 14.6932 17.2958 14.5463 17.2187 14.418ZM7.58269 15.6802L6.84844 14.451C6.77614 14.329 6.67363 14.2277 6.5508 14.1569C6.42797 14.0861 6.28896 14.0482 6.14719 14.0467H4.71994L5.89969 12.0007C6.71209 12.7835 7.73599 13.3113 8.84494 13.5187L7.58269 15.6802ZM9.90094 11.943C9.08509 11.943 8.28756 11.701 7.60921 11.2478C6.93086 10.7945 6.40215 10.1503 6.08994 9.39654C5.77772 8.64279 5.69604 7.81339 5.8552 7.01322C6.01436 6.21305 6.40723 5.47804 6.98412 4.90115C7.56101 4.32426 8.29602 3.93139 9.09619 3.77223C9.89636 3.61307 10.7258 3.69475 11.4795 4.00697C12.2333 4.31918 12.8775 4.84789 13.3308 5.52624C13.784 6.20459 14.0259 7.00212 14.0259 7.81797C14.0259 8.91199 13.5913 9.9612 12.8178 10.7348C12.0442 11.5084 10.995 11.943 9.90094 11.943ZM13.6547 14.0467C13.5129 14.0482 13.3739 14.0861 13.2511 14.1569C13.1282 14.2277 13.0257 14.329 12.9534 14.451L12.2192 15.6802L10.9652 13.494C12.0703 13.2823 13.0904 12.755 13.9022 11.976L15.0819 14.022L13.6547 14.0467Z"
                          fill="#C6B6F7"
                        />
                      </svg>
                    </span>
                  </div>
                  <p className="font-medium text-[#8E98A8]">
                    پیشرفت شما: <span className="text-left text-main">%{progressPercent}</span>
                  </p>
                </div>
              </div>
              <div
                className={`mt-3 h-[193px] w-full overflow-hidden rounded-xl border border-[#E5EAEF] bg-black dark:!border-none lg:mt-[24px] lg:h-[480px] 3xl:h-[500px] 5xl:h-[600px]`}
              >
                <VideoPlayer
                  course={course}
                  isHls
                  poster=""
                  watchedTime={findIstComplated?.watchedTime}
                  url={
                    watchVideoData?.episodeUrl
                      ? watchVideoData?.episodeUrl
                      : course.chapters[0].episodes[0].video
                  }
                />
              </div>
            </div>
            <div className="mt-4 rounded-lg border-b border-gray-200 bg-white p-4 dark:!border-[#263248] dark:bg-[#172334] lg:border lg:border-gray-50 lg:drop-shadow-sm">
              <p className="hidden font-bold text-[18px] text-[#172334] dark:text-white lg:block">
                درباره دوره{' '}
              </p>

              <p className="rounded-lg pt-2 text-justify font-medium text-[14px] text-[#8E98A8] lg:pt-5">
                {course.short_des}
              </p>
            </div>
            {course.btnCourse.title ? (
              <div className="mt-4 flex w-full items-center justify-between rounded-lg border-b border-gray-200 bg-white p-4 dark:!border-[#263248] dark:bg-[#172334] lg:border lg:border-gray-50 lg:drop-shadow-sm">
                <div className="flex items-center gap-3">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0014 1.66797C8.907 1.66797 7.82337 1.88352 6.81232 2.30231C5.80128 2.7211 4.88262 3.33492 4.1088 4.10875C2.54599 5.67155 1.66802 7.79116 1.66802 10.0013C1.66073 11.9256 2.32701 13.7917 3.55135 15.2763L1.88469 16.943C1.76906 17.0602 1.69072 17.209 1.65958 17.3706C1.62843 17.5323 1.64587 17.6995 1.70969 17.8513C1.7789 18.0012 1.89111 18.1272 2.03206 18.2133C2.17301 18.2993 2.33635 18.3416 2.50135 18.3346H10.0014C12.2115 18.3346 14.3311 17.4567 15.8939 15.8939C17.4567 14.3311 18.3347 12.2114 18.3347 10.0013C18.3347 7.79116 17.4567 5.67155 15.8939 4.10875C14.3311 2.54594 12.2115 1.66797 10.0014 1.66797ZM10.0014 16.668H4.50969L5.28469 15.893C5.4399 15.7368 5.52701 15.5256 5.52701 15.3055C5.52701 15.0853 5.4399 14.8741 5.28469 14.718C4.19351 13.628 3.514 12.1934 3.36193 10.6586C3.20986 9.12384 3.59464 7.58381 4.45071 6.3009C5.30678 5.018 6.58118 4.0716 8.05678 3.62295C9.53239 3.17429 11.1179 3.25114 12.5432 3.8404C13.9685 4.42965 15.1454 5.49486 15.8734 6.85454C16.6014 8.21422 16.8354 9.78426 16.5356 11.2971C16.2358 12.81 15.4208 14.1722 14.2293 15.1515C13.0378 16.1308 11.5437 16.6668 10.0014 16.668ZM14.168 9.16797H5.83469C5.61367 9.16797 5.40171 9.25577 5.24543 9.41205C5.08915 9.56833 5.00135 9.78029 5.00135 10.0013C5.00135 10.2223 5.08915 10.4343 5.24543 10.5906C5.40171 10.7468 5.61367 10.8346 5.83469 10.8346H14.168C14.389 10.8346 14.601 10.7468 14.7573 10.5906C14.9136 10.4343 15.0014 10.2223 15.0014 10.0013C15.0014 9.78029 14.9136 9.56833 14.7573 9.41205C14.601 9.25577 14.389 9.16797 14.168 9.16797ZM12.5014 12.5013H7.50135C7.28034 12.5013 7.06838 12.5891 6.9121 12.7454C6.75582 12.9017 6.66802 13.1136 6.66802 13.3346C6.66802 13.5556 6.75582 13.7676 6.9121 13.9239C7.06838 14.0802 7.28034 14.168 7.50135 14.168H12.5014C12.7224 14.168 12.9343 14.0802 13.0906 13.9239C13.2469 13.7676 13.3347 13.5556 13.3347 13.3346C13.3347 13.1136 13.2469 12.9017 13.0906 12.7454C12.9343 12.5891 12.7224 12.5013 12.5014 12.5013ZM7.50135 7.5013H12.5014C12.7224 7.5013 12.9343 7.4135 13.0906 7.25722C13.2469 7.10094 13.3347 6.88898 13.3347 6.66797C13.3347 6.44695 13.2469 6.23499 13.0906 6.07871C12.9343 5.92243 12.7224 5.83464 12.5014 5.83464H7.50135C7.28034 5.83464 7.06838 5.92243 6.9121 6.07871C6.75582 6.23499 6.66802 6.44695 6.66802 6.66797C6.66802 6.88898 6.75582 7.10094 6.9121 7.25722C7.06838 7.4135 7.28034 7.5013 7.50135 7.5013Z"
                        fill="#172334"
                      />
                    </svg>
                  </span>
                  <p className="hidden font-bold text-[18px] text-[#172334] dark:text-white lg:block">
                    ثبت دیدگاه
                  </p>
                </div>

                <a className="flex h-[36px] w-[120px] items-center justify-center rounded-lg bg-main font-medium text-white">
                  {course.btnCourse.title}
                </a>
              </div>
            ) : null}

            <div className="mt-4 flex w-full items-center justify-between rounded-lg border-b border-gray-200 bg-white p-4 dark:!border-[#263248] dark:bg-[#172334] lg:border lg:border-gray-50 lg:drop-shadow-sm">
              {cleanDescription && (
                <div>
                  <Title className="!text-[16px]" title="معرفی محصول" />
                  <div className="mt-1">
                    <p
                      dangerouslySetInnerHTML={{ __html: cleanDescription }}
                      className="container_des_category text-justify font-regular text-[12px] leading-9 text-[#616A76] dark:text-[#8E98A8] lg:text-[16px]"
                    ></p>
                  </div>
                </div>
              )}

              <Comments
                commentInfo={{
                  _id: course._id,
                  thumbnailImage: course.thumbnailImage,
                  title: course.title,
                  targetType: 'product',
                }}
              />
            </div>
          </div>
          <div className="min-w-[342px] border border-gray-100 bg-white p-3 dark:!border-[#263248] dark:bg-[#172334] 3xl:min-w-[450px]">
            <p className="font-medium text-[18px]">محتوای دوره</p>
            <Chapters isLink course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
