'use client';
import React from 'react';
import { Tab, Tabs } from '@heroui/react';
import { Product } from '@/types/home';
import useProductStore from '@/store/product-store';
import { useMedia } from 'react-use';
import Title from '../common/Title';
import Comments from '../common/Comments';
import AddCartSingleProduct from './AddCartSingleProduct';
import Link from 'next/link';

const MoreInformationProduct = ({ product }: { product: Product }) => {
  const { selected, setSelected } = useProductStore();
  const isMobile = useMedia('(max-width: 480px)', false);

  const handleTabChange = (newTab: string) => {
    if (isMobile) {
      const element = document.getElementById(selected.tab);
      if (element) {
        setTimeout(() => {
          window.scrollTo({ top: element.offsetTop - 140, behavior: 'smooth' });
        }, 100);
      }
      setTimeout(() => {
        setSelected({
          tab: newTab,
          userInteracted: true,
        });
      }, 200);
    } else {
      setSelected({
        tab: newTab,
        userInteracted: true,
      });
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
    <Tabs
      selectedKey={selected.tab}
      // @ts-expect-error errror
      onSelectionChange={(key: string) => handleTabChange(key)}
      variant="underlined"
      classNames={{
        base: 'w-full flex flex-col',
        tabList:
          'gap-4 sm:gap-6 w-full font-regular relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full h-[1.3px] bg-main',
        tab: 'max-w-full !text-[12px] text-[#616A76] lg:!text-[18px] px-0 h-10 lg:h-14',
        tabContent: 'group-data-[selected=true]:text-[#0C0C0C]',
      }}
    >
      {product?.description ? (
        <Tab key={'interdauce'} title={<p>معرفی محصول</p>}>
          <div className="mt-5 px-3 lg:px-0">
            <Title title="معرفی محصول" />
            <div className="mt-4">
              <p
                dangerouslySetInnerHTML={{ __html: cleanDescription }}
                className="container_des_category text-justify font-regular text-[12px] leading-9 text-[#616A76] lg:text-[16px]"
              ></p>
            </div>
          </div>
          {/* <AccordinMoreInformation product={product} handleTabChange={handleTabChange} /> */}
        </Tab>
      ) : null}
      {/* <Tab key={"use"} title={"نحوه استفاده"}>
                        <AccordinMoreInformation product={product} selectedTab={selectedTab} handleTabChange={handleTabChange} />
                    </Tab> */}
      <Tab key={'information'} title={<p>مشخصات محصول</p>}>
        <div className="mt-5">
          <Title title="مشخصات محصول" />
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
      </Tab>
      <Tab key={'comments'} title={<p>دیدگاه کاربران</p>}>
        <Comments
          commentInfo={{
            _id: product._id,
            thumbnailImage: product.thumbnailImage,
            title: product.title,
            targetType: 'product',
          }}
        />
      </Tab>
    </Tabs>
  );
};

export default MoreInformationProduct;
