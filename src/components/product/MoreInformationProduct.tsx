'use client';
import React, { useRef, useState } from 'react';
import { Tab, Tabs } from '@heroui/react';
import { Product } from '@/types/home';
import Title from '../common/Title';
import Comments from '../common/Comments';
import Button from '../common/Button';
const tabs = [
  {
    name: 'معرفی',
  },
  {
    name: 'مشخصات محصول',
  },
  {
    name: 'دیدگاه کاربران',
  },
];
const MoreInformationProduct = ({ product }: { product: Product }) => {
  const [select, setSelect] = useState(0);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement> | null, index: number) => {
    if (ref?.current) {
      setSelect(index);
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cleanDescription =
    typeof product?.description === 'string'
      ? product?.description
          ?.replace(/\[caption.*?](.*?)\[\/caption\]/g, '$1') // حذف فقط تگ‌های [caption] و نگه داشتن محتوای داخل آن
          ?.replace(/id="attachment_\d+"/g, '') // حذف idهای attachment
          ?.replace(/align=".*?"/g, '') // حذف ویژگی align
          ?.replace(/width=".*?"/g, '') // حذف ویژگی width
          ?.replace(/height=".*?"/g, '')
      : ''; // حذف ویژگی height
  return (
    <div>
      <div className="flex items-center gap-8 border-b border-[#E5EAEF]">
        {tabs.map((tab, idx) => (
          <Button
            key={idx}
            onClick={() => {
              switch (idx) {
                case 0:
                  // @ts-expect-error error
                  scrollToRef(descriptionRef, idx);
                  break;
                case 1:
                  // @ts-expect-error error
                  scrollToRef(propertiesRef, idx);
                  break;
                case 2:
                  // @ts-expect-error error
                  scrollToRef(commentsRef, idx);
                  break;
              }
            }}
            className={`!h-[40px] !w-fit !min-w-fit !rounded-none border-b font-bold text-[14px] lg:text-[16px] ${select === idx ? 'border-main text-main' : 'border-transparent text-[#172334]'}`}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-6 lg:gap-8">
        {/* description */}
        <div ref={descriptionRef}>
          <Title className="!text-[16px]" title="معرفی محصول" />
          <div className="mt-1">
            <p
              dangerouslySetInnerHTML={{ __html: cleanDescription }}
              className="container_des_category text-justify font-regular text-[12px] leading-9 text-[#616A76] lg:text-[16px]"
            ></p>
          </div>
        </div>
        {/* property */}
        <div ref={propertiesRef} className="mt-5">
          <Title className="!text-[16px]" title="مشخصات محصول" />
          <ul className="space-y-5 lg:mt-10">
            {product.properties?.map((attribute, idx) => (
              <li key={idx} className="flex items-start lg:border-b">
                <span
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                  className="lg:min-[155px] flex !w-fit min-w-[80px] items-start gap-1 font-medium text-[14px] text-[#6A7890] lg:min-w-[252px] lg:pb-3"
                >
                  {attribute?.property}
                </span>
                <span
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                  className="block w-full pr-2 font-medium text-[14px] text-[#0B1524] lg:pb-3"
                >
                  {attribute.attribiute}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Comments
          ref={commentsRef}
          commentInfo={{
            _id: product._id,
            thumbnailImage: product.thumbnailImage,
            title: product.title,
            targetType: 'product',
          }}
        />
      </div>
    </div>
  );
};

export default MoreInformationProduct;
