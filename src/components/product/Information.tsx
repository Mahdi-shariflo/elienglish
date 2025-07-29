'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '@/store/types/home';

import useProductStore from '@/store/product-store';
import { useGetCommentById } from '@/hooks/comments/useGetCommentById';

const Information = ({ product }: { product: Product }) => {
  const [rate, setRate] = useState(0);
  const { setSelected, selected } = useProductStore();
  const { data: dataComments, isSuccess } = useGetCommentById(product._id);

  const comments: Comment[] = dataComments?.data?.data?.comments;
  useEffect(() => {
    if (isSuccess) {
      const totalRate = comments?.reduce(
        // @ts-expect-error error
        (acc, comment) => acc + Number(comment.rate),
        0
      );
      // Divide by the length of the array to get the average
      const averageRate = totalRate / comments?.length;
      setRate(averageRate);
    }
  }, [isSuccess]);

  const goComment = useCallback(() => {
    setSelected({
      tab: 'comments',
      userInteracted: true,
    });
  }, []);

  useEffect(() => {
    if (selected.tab === 'comments') {
      const element = document.getElementById('comments');
      if (element) {
        element.style.scrollMarginTop = '80px';
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [selected]);

  const findainProperties = product.properties?.filter((item) => item.main);

  return (
    <>
      <div className="container_page lg:!w-full">
        {/* title */}
        <div>
          <h1 className="line-clamp-2 font-bold text-lg text-[#232429] dark:text-white">
            {typeof product?.title === 'string' ? product.title.replaceAll('&#038;', '') : ''}
          </h1>
          {/* length comment , rate , brand */}
          <button
            onClick={goComment}
            className="flex !w-full items-start justify-start gap-4 !rounded-none border-t border-[#E4E7E9] py-3 font-medium dark:border-[#263248] lg:border-b"
          >
            <p className="font-medium text-[14px] dark:text-[#8E98A8]">دیدگاه کاربران</p>
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
                    d="M10.0014 1.66797C8.907 1.66797 7.82337 1.88352 6.81232 2.30231C5.80128 2.7211 4.88262 3.33492 4.1088 4.10875C2.54599 5.67155 1.66802 7.79116 1.66802 10.0013C1.66073 11.9256 2.32701 13.7917 3.55135 15.2763L1.88469 16.943C1.76906 17.0602 1.69072 17.209 1.65958 17.3706C1.62843 17.5323 1.64587 17.6995 1.70969 17.8513C1.7789 18.0012 1.89111 18.1272 2.03206 18.2133C2.17301 18.2993 2.33635 18.3416 2.50135 18.3346H10.0014C12.2115 18.3346 14.3311 17.4567 15.8939 15.8939C17.4567 14.3311 18.3347 12.2114 18.3347 10.0013C18.3347 7.79116 17.4567 5.67155 15.8939 4.10875C14.3311 2.54594 12.2115 1.66797 10.0014 1.66797ZM10.0014 16.668H4.50969L5.28469 15.893C5.4399 15.7368 5.52701 15.5256 5.52701 15.3055C5.52701 15.0853 5.4399 14.8741 5.28469 14.718C4.19351 13.628 3.514 12.1934 3.36193 10.6586C3.20986 9.12384 3.59464 7.58381 4.45071 6.3009C5.30678 5.018 6.58118 4.0716 8.05678 3.62295C9.53239 3.17429 11.1179 3.25114 12.5432 3.8404C13.9685 4.42965 15.1454 5.49486 15.8734 6.85454C16.6014 8.21422 16.8354 9.78426 16.5356 11.2971C16.2358 12.81 15.4208 14.1722 14.2293 15.1515C13.0378 16.1308 11.5437 16.6668 10.0014 16.668ZM14.168 9.16797H5.83469C5.61367 9.16797 5.40171 9.25577 5.24543 9.41205C5.08915 9.56833 5.00135 9.78029 5.00135 10.0013C5.00135 10.2223 5.08915 10.4343 5.24543 10.5906C5.40171 10.7468 5.61367 10.8346 5.83469 10.8346H14.168C14.389 10.8346 14.601 10.7468 14.7573 10.5906C14.9136 10.4343 15.0014 10.2223 15.0014 10.0013C15.0014 9.78029 14.9136 9.56833 14.7573 9.41205C14.601 9.25577 14.389 9.16797 14.168 9.16797ZM12.5014 12.5013H7.50135C7.28034 12.5013 7.06838 12.5891 6.9121 12.7454C6.75582 12.9017 6.66802 13.1136 6.66802 13.3346C6.66802 13.5556 6.75582 13.7676 6.9121 13.9239C7.06838 14.0802 7.28034 14.168 7.50135 14.168H12.5014C12.7224 14.168 12.9343 14.0802 13.0906 13.9239C13.2469 13.7676 13.3347 13.5556 13.3347 13.3346C13.3347 13.1136 13.2469 12.9017 13.0906 12.7454C12.9343 12.5891 12.7224 12.5013 12.5014 12.5013ZM7.50135 7.5013H12.5014C12.7224 7.5013 12.9343 7.4135 13.0906 7.25722C13.2469 7.10094 13.3347 6.88898 13.3347 6.66797C13.3347 6.44695 13.2469 6.23499 13.0906 6.07871C12.9343 5.92243 12.7224 5.83464 12.5014 5.83464H7.50135C7.28034 5.83464 7.06838 5.92243 6.9121 6.07871C6.75582 6.23499 6.66802 6.44695 6.66802 6.66797C6.66802 6.88898 6.75582 7.10094 6.9121 7.25722C7.06838 7.4135 7.28034 7.5013 7.50135 7.5013Z"
                    fill="#6E3DFF"
                  />
                </svg>
              </span>
              <span className="font-regular text-[#6E3DFF]">
                {isNaN(rate) ? 0 : rate.toFixed(1)}
              </span>
              <span className="font-medium text-main">دیدگاه</span>
            </div>
          </button>
        </div>
        {/* property */}
        {findainProperties?.length >= 1 && (
          <div className="border-b border-t border-[#E4E7E9] py-4 last:border-none lg:mt-[16px] lg:border-0 lg:py-0">
            <p className="font-bold text-[14px] text-[#172334] dark:text-[#8E98A8]">
              ویژگی‌های اصلی
            </p>
            <ul className="mt-[14px] space-y-4">
              {findainProperties.slice(0, 4).map((attribute, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex items-start gap-5 border-b border-dashed pb-3 lg:border-none"
                  >
                    <span className="flex !w-fit min-w-[80px] items-center !gap-3 font-regular text-[14px] text-[#7D8793] lg:min-w-[80px] lg:gap-1">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_9_23192)">
                            <path
                              d="M5.71484 11.4291L8.64342 13.772C8.72207 13.8368 8.81416 13.8832 8.91301 13.9079C9.01185 13.9326 9.11497 13.935 9.21484 13.9148C9.31568 13.8959 9.41125 13.8555 9.49507 13.7964C9.57888 13.7372 9.64897 13.6607 9.70056 13.572L14.2863 5.71484"
                              stroke="#6E3DFF"
                              stroke-width="1.71429"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M10.0006 19.2863C15.1289 19.2863 19.2863 15.1289 19.2863 10.0006C19.2863 4.8722 15.1289 0.714844 10.0006 0.714844C4.8722 0.714844 0.714844 4.8722 0.714844 10.0006C0.714844 15.1289 4.8722 19.2863 10.0006 19.2863Z"
                              stroke="#6E3DFF"
                              stroke-width="1.71429"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_9_23192">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span className="text-[#6A7890]">{attribute?.property}</span>
                    </span>
                    <span className="text-wrap font-regular text-[14px] text-[#0B1524]">
                      {attribute.attribiute}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Information;
