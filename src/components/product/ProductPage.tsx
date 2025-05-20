'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Gallery from '@/components/product/Gallery';
import Information from '@/components/product/Information';
import MoreInformationProduct from '@/components/product/MoreInformationProduct';
import { useGetCategoryByIdUrl } from '@/hooks/product/useGetCategoryByIdUrl';
import { Product } from '@/types/home';
import React, { ReactNode, useLayoutEffect } from 'react';
import Carousel from '../home/Carousel';
import AddCartSingleProduct from './AddCartSingleProduct';
import useProductStore from '@/store/product-store';
import { useMedia } from 'react-use';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getVariableProductDetails } from '@/lib/product';
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
  firstAvailableIds:
    | {
        displayType: string;
        _id: string;
        product: Product;
      }[]
    | null;
};

const ProductPage = ({ children, product, breadcrumb, firstAvailableIds }: Props) => {
  const { setSelected } = useProductStore();
  const isMobile = useMedia('(max-width: 480px)', false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isSuccess } = useGetCategoryByIdUrl(
    breadcrumb.length >= 2 ? breadcrumb[breadcrumb?.length - 1].url : ''
  );
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

    if (firstAvailableIds) {
      const replaceIdVariable = firstAvailableIds
        .map((item) => `${item.displayType}=${item._id}`)
        .join('&');

      const currentQuery = searchParams.toString();

      if (currentQuery !== replaceIdVariable) {
        router.replace(`${pathname}?${replaceIdVariable}`);
      }
    }
  }, [isMobile]);

  return (
    <div className="-mt-9 lg:mb-32 lg:mt-0 lg:pt-4">
      <BackPrevPage title={product?.title} />

      <Breadcrumbs
        className="container_page mt-8 lg:mt-7"
        breadcrumbs={[...breadcrumb, { title: product.title, url: '', id: '1' }]}
      />

      <div className="lg:container_page mt-3 flex flex-col items-start gap-2 lg:flex-row">
        <div className="w-full">
          <div className="flex flex-col items-start gap-[11px] lg:mt-[25px] lg:min-h-[503px] lg:flex-row">
            <Gallery product={product} />
            <Information product={product} />
          </div>
        </div>
        {children}
      </div>
      <div className="lg:container_page">
        {isSuccess && (
          <Carousel
            classBtnArrows="hidden lg:flex"
            url={`/product-category/${
              breadcrumb.length >= 2 ? breadcrumb[breadcrumb?.length - 2].url : ''
            }`}
            products={data?.data?.data?.products}
            showSwiperSlide
            className="!mb-10 lg:!w-full"
            title="کالاهای مشابه"
          />
        )}
        <MoreInformationProduct product={product} />
      </div>
      <AddCartSingleProduct product={product} hideSendDes className={'lg:hidden lg:w-[288px]'} />
    </div>
  );
};

export default ProductPage;
