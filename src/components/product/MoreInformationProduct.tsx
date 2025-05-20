'use client';
import React from 'react';
import { Tab, Tabs } from '@heroui/react';
import AccordinMoreInformation from './AccordinMoreInformation';
import { Product } from '@/types/home';
import useProductStore from '@/store/product-store';
import { useMedia } from 'react-use';
import AddCartSingleProduct from './AddCartSingleProduct';

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

  return (
    <div className="flex flex-col items-start gap-[20px] lg:!w-full lg:flex-row">
      <div className="w-full">
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
              <AccordinMoreInformation product={product} handleTabChange={handleTabChange} />
            </Tab>
          ) : null}
          {/* <Tab key={"use"} title={"نحوه استفاده"}>
                        <AccordinMoreInformation product={product} selectedTab={selectedTab} handleTabChange={handleTabChange} />
                    </Tab> */}
          <Tab key={'information'} title={<p>مشخصات محصول</p>}>
            <AccordinMoreInformation product={product} handleTabChange={handleTabChange} />
          </Tab>
          <Tab key={'comments'} title={<p>دیدگاه کاربران</p>}>
            <AccordinMoreInformation product={product} handleTabChange={handleTabChange} />
          </Tab>
        </Tabs>
      </div>
      <AddCartSingleProduct
        product={product}
        hideSendDes
        className={'hidden lg:block lg:w-[288px]'}
      />
    </div>
  );
};

export default MoreInformationProduct;
