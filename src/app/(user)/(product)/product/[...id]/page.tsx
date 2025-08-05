import AddCartSingleProduct from '@/components/product/AddCartSingleProduct';
import ProductPage from '@/components/product/ProductPage';
import { safeRequest } from '@/lib/safeClient';
import {
  generate_metadata_product,
  getProduct,
  jsonLdProduct,
  jsonLdProductBreadcrub,
} from '@/seo/product';
import { Product } from '@/store/types/home';
import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import UserImage from '@/../public/images/profile.png';
import Image from 'next/image';
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ text: string; color: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const searchParamsFilter = await searchParams;
  const hasQueryParams: boolean = Object.keys(searchParamsFilter).length > 0;
  return generate_metadata_product({ id, hasQueryParams });
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const productData = await getProduct(id[0]);
  const data = await safeRequest({
    url: `/comment/comment-page?pageLocation=${productData?.product?._id}`,
  });
  const comments: Comment[] = data?.data?.data;

  const selectedProduct: Product = productData.product;

  return (
    <div className="mb-14 lg:mb-0">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdProductBreadcrub({
              title: selectedProduct.title,
              url: selectedProduct.url,
            })
          ),
        }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdProduct({
              product: selectedProduct,
              // @ts-expect-error error
              comments: comments,
            })
          ),
        }}
      />
      <ProductPage
        product={{
          ...selectedProduct,
        }}
        id={id}
      >
        <div className="space-y-8 px-4 lg:mt-8 lg:w-[288px] lg:min-w-[288px] lg:px-0">
          <AddCartSingleProduct className="hidden lg:block" product={selectedProduct} />

          {/* tags */}
          {selectedProduct?.tags.length >= 1 && (
            <div
              className={`drop_shadow_cart w-full rounded-lg border border-gray-100 p-3 dark:border-[#263248] dark:bg-[#172334] lg:border-gray-50`}
            >
              <div className="flex items-center gap-3">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.50002 6.00002C7.20334 6.00002 6.91333 6.08799 6.66666 6.25281C6.41999 6.41763 6.22773 6.6519 6.1142 6.92599C6.00067 7.20008 5.97096 7.50168 6.02884 7.79265C6.08672 8.08362 6.22958 8.3509 6.43936 8.56068C6.64914 8.77046 6.91641 8.91332 7.20738 8.97119C7.49835 9.02907 7.79995 8.99937 8.07404 8.88584C8.34813 8.7723 8.5824 8.58005 8.74722 8.33337C8.91204 8.0867 9.00002 7.79669 9.00002 7.50002C9.00002 7.10219 8.84198 6.72066 8.56068 6.43936C8.27937 6.15805 7.89784 6.00002 7.50002 6.00002ZM21.12 10.71L12.71 2.29002C12.6166 2.19734 12.5058 2.12401 12.3839 2.07425C12.2621 2.02448 12.1316 1.99926 12 2.00002H3.00002C2.7348 2.00002 2.48045 2.10537 2.29291 2.29291C2.10537 2.48045 2.00002 2.7348 2.00002 3.00002V12C1.99926 12.1316 2.02448 12.2621 2.07425 12.3839C2.12401 12.5058 2.19734 12.6166 2.29002 12.71L10.71 21.12C11.2725 21.6818 12.035 21.9974 12.83 21.9974C13.625 21.9974 14.3875 21.6818 14.95 21.12L21.12 15C21.6818 14.4375 21.9974 13.675 21.9974 12.88C21.9974 12.085 21.6818 11.3225 21.12 10.76V10.71ZM19.71 13.53L13.53 19.7C13.3427 19.8863 13.0892 19.9908 12.825 19.9908C12.5608 19.9908 12.3074 19.8863 12.12 19.7L4.00002 11.59V4.00002H11.59L19.71 12.12C19.8027 12.2135 19.876 12.3243 19.9258 12.4461C19.9756 12.5679 20.0008 12.6984 20 12.83C19.9989 13.0924 19.8948 13.3438 19.71 13.53Z"
                      fill="#6E3DFF"
                    />
                  </svg>
                </span>
                <p className="font-medium dark:text-[#8E98A8]">برچسب‌ها</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {selectedProduct?.tags?.map((item, idx: number) => (
                  <Link
                    key={idx}
                    className="flex !h-[36px] w-fit items-center justify-center rounded-lg bg-[#F4F6FA] px-4 font-medium text-main dark:bg-[#172334] dark:text-[#8E98A8]"
                    href={item?.url}
                  >
                    {item?.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div
            className={`drop_shadow_cart flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-gray-100 p-3 dark:border-[#263248] dark:bg-[#172334] lg:border-gray-50`}
          >
            <span className="mx-auto flex w-full items-center justify-center">
              <Image
                width={70}
                height={70}
                className="overflow-hidden rounded-full"
                src={UserImage}
                alt=""
              />
            </span>
            <div className="flex items-center gap-2 font-medium">
              <p className="dark:text-white">الهام لواسانی</p>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16049 1.2971C9.55457 0.688226 10.4454 0.688227 10.8395 1.2971L12.151 3.32351C12.3766 3.67202 12.794 3.84493 13.2 3.75799L15.5603 3.2525C16.2694 3.10061 16.8994 3.73055 16.7475 4.43974L16.242 6.80003C16.1551 7.20596 16.328 7.62339 16.6765 7.84895L18.7029 9.16049C19.3118 9.55457 19.3118 10.4454 18.7029 10.8395L16.6765 12.151C16.328 12.3766 16.1551 12.794 16.242 13.2L16.7475 15.5603C16.8994 16.2694 16.2694 16.8994 15.5603 16.7475L13.2 16.242C12.794 16.1551 12.3766 16.328 12.151 16.6765L10.8395 18.7029C10.4454 19.3118 9.55457 19.3118 9.16049 18.7029L7.84895 16.6765C7.62339 16.328 7.20596 16.1551 6.80003 16.242L4.43974 16.7475C3.73055 16.8994 3.10061 16.2694 3.2525 15.5603L3.75799 13.2C3.84493 12.794 3.67202 12.3766 3.32351 12.151L1.2971 10.8395C0.688226 10.4454 0.688227 9.55457 1.2971 9.16049L3.32351 7.84895C3.67202 7.62339 3.84493 7.20596 3.75799 6.80003L3.2525 4.43974C3.10061 3.73055 3.73055 3.10061 4.43974 3.2525L6.80003 3.75799C7.20596 3.84493 7.62339 3.67202 7.84895 3.32351L9.16049 1.2971Z"
                    fill="#6E3DFF"
                  />
                  <path
                    d="M13 8L8.875 12.125L7 10.25"
                    stroke="#EDE8FC"
                    stroke-width="1.05"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>

            <p className="text-justify font-medium text-[12px] text-[#8E98A8]">
              الهام هستم. آبان ماه ۶۳ تهران بدنیا اومدم.. دبیرستان رشته ریاضی خوندم، عاشق رشته تجربی
              بودم اما نهایتش آخرهای دوره پیش دانشگاهی تو دو هفته آخر تغییر رشته دادم ...
            </p>
          </div>
        </div>
      </ProductPage>
      <AddCartSingleProduct
        product={selectedProduct}
        showDetail
        className={'sticky mt-10 lg:hidden lg:w-[288px]'}
      />
    </div>
  );
};

export default Page;
