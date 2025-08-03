'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Gallery from '@/components/product/Gallery';
import Information from '@/components/product/Information';
import MoreInformationProduct from '@/components/product/MoreInformationProduct';
import { Product } from '@/store/types/home';
import React, { ReactNode, useLayoutEffect } from 'react';
import useProductStore from '@/store/product-store';
import { useMedia } from 'react-use';
import AddCartSingleProduct from './AddCartSingleProduct';
type Props = {
  product: Product;
  children: ReactNode;
  id: string;
};

const ProductPage = ({ children, product }: Props) => {
  const { setSelected } = useProductStore();
  const isMobile = useMedia('(max-width: 480px)', false);

  useLayoutEffect(() => {
    if (!isMobile) {
      setSelected({
        tab: product.description ? 'interdauce' : 'information',
        userInteracted: true,
      });
    } else {
      setSelected({
        tab: product.description ? 'interdauce' : 'information',
        userInteracted: false,
      });
    }
  }, [isMobile]);

  const breadcrumb = [
    ...(product?.category?.title
      ? [
          {
            title: product?.category?.title,
            id: '1',
            url: `/product-category/${product?.category?.url}`,
          },
        ]
      : []),
    { title: product.title, url: '', id: '1' },
  ];

  return (
    <div className="-mt-9 lg:mb-32 lg:mt-0 lg:pt-4">
      <BackPrevPage title={product?.title} />

      <Breadcrumbs className="container_page mt-8 lg:mt-7" breadcrumbs={breadcrumb} />

      <div className="lg:container_page mt-3 flex flex-col items-start gap-2 lg:flex-row 2xl:gap-8">
        <div className="w-full">
          <div className="flex flex-col items-start gap-[11px] lg:mt-[25px] lg:min-h-[503px] lg:flex-row 2xl:gap-8">
            <Gallery product={product} />
            <Information product={product} />
          </div>
          <div className="mt-10">
            <MoreInformationProduct product={product} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProductPage;
