'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Gallery from '@/components/product/Gallery';
import Information from '@/components/product/Information';
import MoreInformationProduct from '@/components/product/MoreInformationProduct';
import { Product } from '@/types/home';
import React, { ReactNode, useLayoutEffect } from 'react';
import AddCartSingleProduct from './AddCartSingleProduct';
import useProductStore from '@/store/product-store';
import { useMedia } from 'react-use';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
type Props = {
  breadcrumb: {
    Icon?: React.ElementType;
    title: string;
    id: string;
    url: string | null;
  }[];
  product: Product;
  children: ReactNode;
  id: string;
};

const ProductPage = ({ children, product, breadcrumb }: Props) => {
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

  return (
    <div className="-mt-9 lg:mb-32 lg:mt-0 lg:pt-4">
      <BackPrevPage title={product?.title} />

      <Breadcrumbs
        className="container_page mt-8 lg:mt-7"
        breadcrumbs={[{ title: product.title, url: '', id: '1' }]}
      />

      <div className="lg:container_page mt-3 flex flex-col items-start gap-2 lg:flex-row">
        <div className="w-full">
          <div className="flex flex-col items-start gap-[11px] lg:mt-[25px] lg:min-h-[503px] lg:flex-row">
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
