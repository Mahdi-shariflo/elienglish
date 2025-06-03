'use client';
import { transformData } from '@/lib/transformDataCategory';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import Link from 'next/link';
import { useState } from 'react';
type Props = {
  className?: string;
  categories: string;
};
export default function CategoryMenu({ className, categories }: Props) {
  const parseCaregories = JSON.parse(categories);
  const [select, setSelect] = useState(0);
  return (
    <div>
      <Dropdown
        placement="bottom-end"
        size="lg"
        className="shadow_category h-[500px] overflow-hidden"
        classNames={{
          base: 'w-[1300px] !px-0',
          content: '!p-0',
        }}
      >
        <DropdownTrigger>
          <Button className="bg-transparent !px-0">
            <div className={`flex w-fit items-center gap-3 ${className}`}>
              <span className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z"
                    fill="#7D8793"
                  />
                  <path
                    opacity="0.4"
                    d="M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z"
                    fill="#7D8793"
                  />
                  <path
                    d="M18.6699 13.4301H16.7699C14.5899 13.4301 13.4399 14.5801 13.4399 16.7601V18.6601C13.4399 20.8401 14.5899 21.9901 16.7699 21.9901H18.6699C20.8499 21.9901 21.9999 20.8401 21.9999 18.6601V16.7601C21.9999 14.5801 20.8499 13.4301 18.6699 13.4301Z"
                    fill="#7D8793"
                  />
                  <path
                    opacity="0.4"
                    d="M7.24 13.4301H5.34C3.15 13.4301 2 14.5801 2 16.7601V18.6601C2 20.8501 3.15 22.0001 5.33 22.0001H7.23C9.41 22.0001 10.56 20.8501 10.56 18.6701V16.7701C10.57 14.5801 9.42 13.4301 7.24 13.4301Z"
                    fill="#7D8793"
                  />
                </svg>

                <span className="font-medium text-[14px] text-[#7D8793]">دسته بندی‌ها</span>
              </span>

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.28 5.96667L8.9333 10.3133C8.41997 10.8267 7.57997 10.8267 7.06664 10.3133L2.71997 5.96667"
                  stroke="#7D8793"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="px-0" aria-label="Static Actions">
          <DropdownItem
            className="!cursor-default !px-0 data-[hover=true]:!bg-transparent"
            key="new"
          >
            <div className={`flex h-[500px]`}>
              <div className="custom_sidebar_category border-softpeach flex w-[200px] min-w-[200px] flex-col overflow-auto overflow-y-auto border-l">
                {transformData([...parseCaregories]).map((category, idx) => (
                  <Link
                    href={`${category.url}/`}
                    onMouseEnter={() => setSelect(idx)}
                    key={idx}
                    className={`flex !h-[60px] min-h-[50px] items-center justify-between px-3 !font-medium !text-[14px] text-[#545A66] ${select === idx ? 'bg-[#FCE7F5]' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      {
                        //  @ts-expect-error error
                        category.Icon && <category.Icon />
                      }
                      {category.title}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99998 13.28L5.65331 8.9333C5.13998 8.41997 5.13998 7.57997 5.65331 7.06664L9.99998 2.71997"
                        stroke="#6E3DFF"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="flex h-full flex-col flex-wrap gap-2">
                {/* @ts-expect-error error */}
                {transformData(parseCaregories)[select]?.children.map((category, idx: number) => (
                  <div key={idx} className="mx-3 mt-2">
                    <Link href={`${category.url}/`} className="my-1 flex items-center gap-2">
                      {/* {category.is_parent ? (
                                                        <BilblackIcon className="text-[#009688] w-4 h-4" />
                                                    ) : null} */}
                      <p
                        className={`whitespace-nowrap text-right text-[14px] ${category.is_parent ? 'font-medium text-[#232429]' : 'font-regular text-[#7D8793] hover:text-main'}`}
                      >
                        {category.title}
                      </p>

                      {/* {
                                                        category.is_parent ? <ArrowIcon className="text-purple rotate-90" /> : null
                                                    } */}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
