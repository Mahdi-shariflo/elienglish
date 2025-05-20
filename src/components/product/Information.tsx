'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '@/types/home';
import { getVariableProductDetails, groupAttributesByProperty } from '@/lib/product';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '../common/Button';
import useProductStore from '@/store/product-store';
import { useGetCommentsProductById } from '@/hooks/product/useGetCommentsProductById';
import { BASEURL } from '@/lib/variable';
import Select from '../common/Select';
import Colors from './Colors';
import { SharedSelection } from '@heroui/react';

const Information = ({ product }: { product: Product }) => {
  const [rate, setRate] = useState(0);
  const { setSelected, selected } = useProductStore();
  const searchParams = useSearchParams();
  const isVariableTitle = searchParams.get('text');
  const variables = getVariableProductDetails(product);
  const router = useRouter();
  const pathname = usePathname();
  const { data: dataComments, isSuccess } = useGetCommentsProductById(product._id);

  // @ts-expect-error error
  const property: {
    url: string;
    archive: boolean;
    title: string;
    displayName: string;
    mainProperty: boolean;
    attribiuts: {
      displayName: string;
      title: string;
      label: string;
      url: string;
    }[];
  }[] = groupAttributesByProperty({
    main: false,
    attribiutsLookup: product?.attributeLookup,
    children: [],
    propertiesLookup: product?.propertyLookup,
    // @ts-expect-error error
    mainProperty: product?.properties,
  });
  const findBrand = property?.find((item) => item?.title === 'برند');

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

  const findainProperties = property?.filter((item) => item.mainProperty);
  const onChangeVariable = (key: SharedSelection) => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    // @ts-ignore
    searchParams.set('text', key?.currentKey?.toString());
    const newQueryString = searchParams.toString();
    router.push(`${pathname}/?${newQueryString}`, { scroll: false });
  };
  return (
    <>
      <div className="container_page lg:mt-3 lg:!w-full">
        {/* title */}
        <div className="border-[#E4E7E9] lg:border-0 lg:border-b">
          {/* title */}
          <p className="text-left font-regular text-[12px] text-[#7D8793]">{product.enTitle}</p>
          <h1 className="mt-[20px] line-clamp-2 font-bold text-lg text-[#232429]">
            {typeof product?.title === 'string' ? product.title.replaceAll('&#038;', '') : ''}
          </h1>
          {/* length comment , rate , brand */}
          <div className="mt-[16px] flex items-center gap-[20px] lg:mt-0">
            <Button
              onClick={goComment}
              className="flex h-[28px] w-[61px] !min-w-[61px] items-center justify-center gap-px rounded-lg bg-[#FFA216]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4421 2.92471L12.9087 5.85804C13.1087 6.26637 13.6421 6.65804 14.0921 6.73304L16.7504 7.17471C18.4504 7.45804 18.8504 8.69137 17.6254 9.90804L15.5587 11.9747C15.2087 12.3247 15.0171 12.9997 15.1254 13.483L15.7171 16.0414C16.1837 18.0664 15.1087 18.8497 13.3171 17.7914L10.8254 16.3164C10.3754 16.0497 9.63375 16.0497 9.17541 16.3164L6.68375 17.7914C4.90041 18.8497 3.81708 18.058 4.28375 16.0414L4.87541 13.483C4.98375 12.9997 4.79208 12.3247 4.44208 11.9747L2.37541 9.90804C1.15875 8.69137 1.55041 7.45804 3.25041 7.17471L5.90875 6.73304C6.35041 6.65804 6.88375 6.26637 7.08375 5.85804L8.55041 2.92471C9.35041 1.33304 10.6504 1.33304 11.4421 2.92471Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="pt-1 font-regular text-white">
                {isNaN(rate) ? 0 : rate.toFixed(1)}
              </span>
            </Button>
            <Button
              onClick={goComment}
              className="flex !w-fit !min-w-fit items-center gap-1 font-regular text-[14px] text-[#A8AFB8]"
            >
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.08398 8.75H12.9173"
                    stroke="#A8AFB8"
                    strokeWidth="1.3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.83268 15.3584H9.16602L12.8744 17.825C13.4244 18.1917 14.166 17.8 14.166 17.1334V15.3584C16.666 15.3584 18.3327 13.6917 18.3327 11.1917V6.19169C18.3327 3.69169 16.666 2.02502 14.166 2.02502H5.83268C3.33268 2.02502 1.66602 3.69169 1.66602 6.19169V11.1917C1.66602 13.6917 3.33268 15.3584 5.83268 15.3584Z"
                    stroke="#A8AFB8"
                    strokeWidth="1.3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-regular text-[12px]">({comments?.length})</span>
              دیدگاه
            </Button>
            {findBrand?.archive ? (
              <>
                <div className="w-px bg-[#CCD0D5] lg:h-[24px]" />
                {Array.isArray(findBrand.attribiuts) ? (
                  <div className="flex items-center gap-5 font-regular text-[14px] text-[#A8AFB8]">
                    <span>برند:</span>

                    <Link
                      href={`/${findBrand.url}/${findBrand.attribiuts[0]?.url}/`}
                      className="flex items-center"
                    >
                      <img
                        //   @ts-expect-error
                        src={`${BASEURL}/${findBrand.attribiuts[0]?.image?.url}`}
                        className="h-[90px] w-[90px] object-contain"
                        alt=""
                      />
                    </Link>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
        {/* colors */}
        {/* <Colors /> */}
        {variables.length >= 1
          ? variables.map((att, idx) => {
              if (att.displayType === 'text')
                return (
                  <Select
                    key={idx}
                    className="mt-4 lg:w-[300px]"
                    options={att.attributes!}
                    label={`${att.title}`}
                    value={isVariableTitle ? `${isVariableTitle}` : `${att.attributes[0]._id}`}
                    onChange={onChangeVariable}
                    nameLabel="title"
                    nameValue="_id"
                  />
                );

              if (att.displayType === 'color') {
                return <Colors key={idx} colors={att.attributes} />;
              }
              return null;
            })
          : null}

        {/* property */}
        {findainProperties?.length >= 1 && (
          <div className="border-b border-t border-[#E4E7E9] py-4 lg:mt-[24px] lg:border-0 lg:py-0">
            <p className="font-medium text-[14px] text-[#40444A]">ویژگی‌های اصلی</p>
            <ul className="mt-[14px] space-y-2">
              {property.slice(0, 4).map((attribute, idx) => {
                if (!attribute.mainProperty) return null;
                return (
                  <li key={idx} className="flex items-start gap-5">
                    <span className="flex !w-fit min-w-[80px] items-center gap-2 font-regular text-[14px] text-[#7D8793] lg:min-w-[80px] lg:gap-1">
                      <span className="block h-1 w-1 rounded-full bg-[#7D8793] lg:h-2 lg:w-2"></span>
                      <span>
                        {attribute?.displayName ? attribute?.displayName : attribute?.title}
                      </span>
                    </span>
                    <span className="text-wrap font-regular text-[14px] text-[#0C0C0C]">
                      {attribute.attribiuts.map((item, idx) => (
                        <React.Fragment key={idx}>
                          {item.title}
                          {idx < attribute.attribiuts.length - 1 && <span>,&nbsp;</span>}
                        </React.Fragment>
                      ))}
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
