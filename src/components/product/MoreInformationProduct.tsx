'use client';
import React, { useRef, useState, useMemo } from 'react';
import { Tab, Tabs } from '@heroui/react';
import { Product } from '@/store/types/home';
import Title from '../common/Title';
import Comments from '../common/Comments';
import Button from '../common/Button';
import AddCartSingleProduct from './AddCartSingleProduct';

const MoreInformationProduct = ({ product }: { product: Product }) => {
  const [select, setSelect] = useState(0);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // بررسی وجود محتوا
  const hasDescription = useMemo(() => {
    return (
      product?.description &&
      typeof product.description === 'string' &&
      product.description.trim().length > 0
    );
  }, [product?.description]);

  const hasProperties = useMemo(() => {
    return (
      product?.properties && Array.isArray(product.properties) && product.properties.length > 0
    );
  }, [product?.properties]);

  // ایجاد تب‌های شرطی
  const availableTabs = useMemo(() => {
    const tabs = [];

    if (hasDescription) {
      tabs.push({ name: 'معرفی', index: 'description' });
    }

    if (hasProperties) {
      tabs.push({ name: 'مشخصات محصول', index: 'properties' });
    }

    // تب دیدگاه همیشه نمایش داده میشه
    tabs.push({ name: 'دیدگاه کاربران', index: 'comments' });

    return tabs;
  }, [hasDescription, hasProperties]);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement> | null, index: number) => {
    if (ref?.current) {
      setSelect(index);
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTabClick = (tabIndex: string, arrayIndex: number) => {
    switch (tabIndex) {
      case 'description':
        // @ts-expect-error error
        scrollToRef(descriptionRef, arrayIndex);
        break;
      case 'properties':
        // @ts-expect-error error
        scrollToRef(propertiesRef, arrayIndex);
        break;
      case 'comments':
        // @ts-expect-error error
        scrollToRef(commentsRef, arrayIndex);
        break;
    }
  };

  const cleanDescription = useMemo(() => {
    if (!hasDescription) return '';

    return (
      product.description
        ?.replace(/\[caption.*?](.*?)\[\/caption\]/g, '$1')
        ?.replace(/id="attachment_\d+"/g, '')
        ?.replace(/align=".*?"/g, '')
        ?.replace(/width=".*?"/g, '')
        ?.replace(/height=".*?"/g, '') || ''
    );
  }, [product?.description, hasDescription]);

  // اگر هیچ محتوایی نداریم، فقط دیدگاه نمایش بده
  if (!hasDescription && !hasProperties) {
    return (
      <div className="flex flex-col items-start gap-[20px] lg:!w-full lg:flex-row">
        <div className="w-full px-5 lg:px-0">
          <div className="flex items-center gap-8 border-b border-[#E5EAEF] dark:!border-[#263248]">
            <Button className="!h-[40px] !w-fit !min-w-fit !rounded-none border-b border-main pb-4 font-demibold text-[14px] text-main lg:text-[16px]">
              دیدگاه کاربران
            </Button>
          </div>

          <div className="mt-5">
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

        <AddCartSingleProduct
          product={product}
          className={'sticky top-48 hidden lg:block lg:w-[288px]'}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-[20px] lg:!w-full lg:flex-row">
      <div className="w-full px-5 lg:px-0">
        <div className="flex items-center gap-8 border-b border-[#E5EAEF] dark:!border-[#263248]">
          {availableTabs.map((tab, idx) => (
            <Button
              key={tab.index}
              onClick={() => handleTabClick(tab.index, idx)}
              className={`!h-[40px] !w-fit !min-w-fit !rounded-none border-b pb-4 font-demibold text-[14px] lg:text-[16px] ${
                select === idx
                  ? 'border-main text-main'
                  : 'border-transparent text-[#172334] dark:text-[#8E98A8]'
              }`}
            >
              {tab.name}
            </Button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-6 lg:gap-8">
          {/* معرفی محصول - فقط اگر description وجود داشته باشه */}
          {hasDescription && (
            <div ref={descriptionRef}>
              <Title className="!text-[16px]" title="معرفی محصول" />
              <div className="mt-1">
                <p
                  dangerouslySetInnerHTML={{ __html: cleanDescription }}
                  className="container_des_category text-justify font-regular text-[12px] leading-9 text-[#616A76] dark:text-[#8E98A8] lg:text-[16px]"
                />
              </div>
            </div>
          )}

          {/* مشخصات محصول - فقط اگر properties وجود داشته باشه */}
          {hasProperties && (
            <div ref={propertiesRef} className="mt-5">
              <Title className="!text-[16px]" title="مشخصات محصول" />
              <ul className="mt-10 space-y-5">
                {product.properties.map((attribute, idx) => (
                  <li key={idx} className="flex items-start dark:border-[#263248] lg:border-b">
                    <span
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                      className="flex !w-fit min-w-[155px] items-start gap-1 font-medium text-[14px] text-[#6A7890] lg:min-w-[252px] lg:pb-3 lg:text-[16px]"
                    >
                      {attribute?.property}
                    </span>
                    <span
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                      className="block w-full pr-2 font-medium text-[14px] text-[#0B1524] dark:text-[#8E98A8] lg:pb-3 lg:text-[16px]"
                    >
                      {attribute.attribiute}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* دیدگاه کاربران - همیشه نمایش داده میشه */}
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

      <AddCartSingleProduct
        product={product}
        className={'sticky top-48 hidden lg:block lg:w-[288px]'}
      />
    </div>
  );
};

export default MoreInformationProduct;
