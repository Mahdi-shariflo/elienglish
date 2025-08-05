import FrequentlyAskedQuestions from '@/components/faq/FrequentlyAskedQuestions';
import { request } from '@/lib/safeClient';
import React from 'react';
type Props = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ search: string }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await request({ url: `/faq/archive-category?slug=${id}` });
  const faq = data?.data?.data;
  return (
    <div className="-mt-14 mb-32 lg:-mt-7">
      <div className="bg-faq flex h-[280px] w-full flex-col items-center justify-center lg:h-[341px]"></div>
      <div className="lg:container_page -mt-[19rem] flex flex-col gap-10 lg:gap-[100px]">
        {faq?.faq?.length >= 1 ? (
          <FrequentlyAskedQuestions
            icon={
              <span className="flex items-center justify-center">
                <svg
                  width="142"
                  height="153"
                  viewBox="0 0 142 153"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_9_28976)">
                    <g filter="url(#filter1_d_9_28976)">
                      <path
                        d="M32 69C32 47.4609 49.4609 30 71 30C92.5391 30 110 47.4609 110 69C110 90.5391 92.5391 108 71 108C49.4609 108 32 90.5391 32 69Z"
                        fill="white"
                        shape-rendering="crispEdges"
                      />
                      <g clip-path="url(#clip0_9_28976)">
                        <path
                          d="M77.1826 71.5098L70.2891 75.3311H70.2812L70.2197 75.3389C70.1748 75.3445 70.1289 75.3445 70.084 75.3389L69.959 75.3232L69.834 75.3389C69.789 75.3445 69.7432 75.3445 69.6982 75.3389L69.6357 75.3311H69.6289L62.7354 71.5098L61.251 70.6865V77.9805C61.251 78.6546 61.5185 79.3017 61.9951 79.7783C62.4717 80.2548 63.1181 80.5224 63.792 80.5225H76.126C76.7999 80.5223 77.4463 80.2548 77.9229 79.7783C78.3995 79.3017 78.667 78.6546 78.667 77.9805V70.6865L77.1826 71.5098ZM58.7734 66.3154L57.2021 67.1895L58.7734 68.0635L69.4727 74.0137L69.959 74.2842L70.4453 74.0137L81.1445 68.0635L82.7148 67.1895L81.1445 66.3154L69.959 60.0938L58.7734 66.3154ZM60.167 70.084L59.6523 69.7988L55.8135 67.6709C55.7337 67.6239 55.6668 67.5576 55.6201 67.4775C55.5719 67.3947 55.5469 67.2999 55.5469 67.2041C55.547 67.1085 55.572 67.0143 55.6201 66.9316C55.6563 66.8695 55.7047 66.8156 55.7617 66.7725L55.8213 66.7334L69.4629 59.1553H69.5654L69.7451 59.083C69.7672 59.0742 69.7907 59.0693 69.8135 59.0625H70.1123C70.1265 59.0674 70.1414 59.0703 70.1553 59.0762L70.3418 59.1553H70.4551L84.1035 66.7373L84.1074 66.7393L85.6396 67.583H85.6406C85.7243 67.63 85.7942 67.6984 85.8428 67.7812C85.8791 67.8433 85.9025 67.9117 85.9121 67.9824L85.917 68.0547V73.3555C85.917 73.4991 85.8604 73.6377 85.7588 73.7393C85.6573 73.8407 85.5194 73.8973 85.376 73.8975C85.2323 73.8975 85.0938 73.8408 84.9922 73.7393C84.8906 73.6377 84.834 73.4991 84.834 73.3555V67.2402L83.3457 68.0742L80.2617 69.8008L79.751 70.0869V77.9805C79.751 78.9419 79.3683 79.8641 78.6885 80.5439C78.0088 81.2236 77.0872 81.6053 76.126 81.6055H63.792C62.8306 81.6054 61.9083 81.2237 61.2285 80.5439C60.5489 79.8642 60.167 78.9417 60.167 77.9805V70.084Z"
                          stroke="#6E3DFF"
                          stroke-width="2"
                        />
                      </g>
                    </g>
                    <g filter="url(#filter2_d_9_28976)">
                      <path d="M71 119L79.6603 103.25H62.3397L71 119Z" fill="white" />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_9_28976"
                      x="0"
                      y="0"
                      width="142"
                      height="153"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="16" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.109804 0 0 0 0 0.109804 0 0 0 0 0.109804 0 0 0 0.06 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9_28976"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9_28976"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_d_9_28976"
                      x="0"
                      y="0"
                      width="142"
                      height="142"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="16" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.109804 0 0 0 0 0.109804 0 0 0 0 0.109804 0 0 0 0.06 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9_28976"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9_28976"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter2_d_9_28976"
                      x="30.3398"
                      y="73.25"
                      width="81.3203"
                      height="79.75"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="16" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.109804 0 0 0 0 0.109804 0 0 0 0 0.109804 0 0 0 0.06 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9_28976"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9_28976"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_9_28976">
                      <rect width="37" height="37" fill="white" transform="translate(53 51)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            }
            title="دسته‌بندی پرسش‌ها"
            faqs={faq.faq}
          />
        ) : (
          <p className="rounded-xl border py-5 text-center font-medium text-[16px] shadow-sm">
            سوالی یافت نشد
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
