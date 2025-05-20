'use client';
import React from 'react';
import InView from '../common/InView';
import { Button } from '@heroui/react';
import { ResultAttribute } from '@/lib/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
type Props = {
  colors: ResultAttribute[];
};
const Colors = ({ colors }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onChangeVariable = (key: string) => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    searchParams.set('color', key.toString());
    const newQueryString = searchParams.toString();
    router.push(`${pathname}/?${newQueryString}`, { scroll: false });
  };
  const title = colors.find((color) => color._id === searchParams.get('color'));
  return (
    <InView>
      <div className="mt-4 border-b border-[#E4E7E9] pb-4 lg:border-0 lg:pb-0">
        <p className="font-medium text-[14px] text-[#40444A]">
          انتخاب رنگ : <span className="text-[#616A76]">{title?.title}</span>
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          {colors.map((item, idx) => (
            <Button
              onPress={() => onChangeVariable(item._id)}
              key={idx}
              className={`h-[35px] w-[35px] min-w-[35px] rounded-full border-2 p-0 lg:h-[30px] lg:w-[30px] lg:!min-w-[30px] ${item._id === searchParams.get('color') ? 'border-purple' : 'border-transparent'}`}
              style={{ background: item.color }}
            >
              {item._id === searchParams.get('color') ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6673 4.79163L6.25065 11.2083L3.33398 8.29163"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </Button>
          ))}
        </div>
      </div>
    </InView>
  );
};

export default Colors;
