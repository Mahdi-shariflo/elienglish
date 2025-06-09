'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import { Toman_Icon } from '@/components/common/icon';
import EmptyFav from '@/components/profile/EmptyFav';
import { IFavoriteProducts, IResponseData } from '@/hooks/favorites/favorites.type';
import { useRemoveFavorite } from '@/hooks/favorites/services/useRemoveFavorite';
import { useGetFavProduct } from '@/hooks/profile/useGetFavProduct';
import { discountCalculation } from '@/lib/utils';
import { BASEURL } from '@/lib/variable';
import { Spinner, Switch } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
const Page = () => {
  const { mutate, isPending: isPendingFav } = useRemoveFavorite();
  const { data, isPending } = useGetFavProduct();
  const { favoriteProducts } = (data?.data?.data as IResponseData) ?? [];

  return (
    <div className="space-y-4 rounded-2xl border-[#E4E7E9] bg-white pt-4 lg:mb-10 lg:mt-5 lg:min-h-[70vh] lg:!w-full lg:border lg:p-[16px] lg:pt-0">
      <BackPrevPage title="لیست‌ مورد علاقه‌ها" />
      <p className="hidden font-medium text-[14px] text-[#0C0C0C] lg:block lg:text-[18px]">
        لیست‌ مورد علاقه‌ها
      </p>
      <div className="container_page flex items-center justify-between lg:!w-full">
        <div className="flex items-start gap-2 lg:items-center">
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-[#FCE7F5]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6.44043V9.77043"
                stroke="#EC48A5"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M12.0199 2C8.3399 2 5.3599 4.98 5.3599 8.66V10.76C5.3599 11.44 5.0799 12.46 4.7299 13.04L3.4599 15.16C2.6799 16.47 3.2199 17.93 4.6599 18.41C9.4399 20 14.6099 20 19.3899 18.41C20.7399 17.96 21.3199 16.38 20.5899 15.16L19.3199 13.04C18.9699 12.46 18.6899 11.43 18.6899 10.76V8.66C18.6799 5 15.6799 2 12.0199 2Z"
                stroke="#EC48A5"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M15.3299 18.8203C15.3299 20.6503 13.8299 22.1503 11.9999 22.1503C11.0899 22.1503 10.2499 21.7703 9.64992 21.1703C9.04992 20.5703 8.66992 19.7303 8.66992 18.8203"
                stroke="#EC48A5"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
          </span>
          <div className="space-y-1 font-medium text-[12px]">
            <p className="text-[#232429]">اطلاع رسانی</p>
            <p className="text-[#7D8793]">اطلاع رسانی تخفیف و روبه اتمام بودن موجودی این کالاها </p>
          </div>
        </div>
        <Switch />
      </div>

      <div className="container_page mt-9 flex items-center border-b border-[#E4E7E9] text-[14px] lg:!w-full">
        <p className="hidden items-center gap-1 lg:flex">
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 16L13 16" stroke="#616A76" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 11H13" stroke="#616A76" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 6L13 6" stroke="#616A76" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M17 4L17 20L20 16"
                stroke="#616A76"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="whitespace-nowrap font-regular text-[#545A66]">مرتب سازی بر اساس</span>
        </p>
        {/* <Button className='w-fit text-[#545A66] font-regular '>جدیدترین</Button>
                <Button className='w-fit text-[#545A66] font-regular '>ارزان‌ترین</Button>
                <Button className='w-fit text-[#545A66] font-regular '>گران‌ترین</Button> */}
      </div>

      {isPending ? (
        <Spinner
          classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
          size="lg"
          className="!mt-10 flex !items-center justify-center"
        />
      ) : favoriteProducts?.length >= 1 ? (
        <div className="container_page grid gap-3 lg:!w-full lg:grid-cols-2">
          {favoriteProducts.map((product: IFavoriteProducts, idx: number) => (
            <div key={idx} className="shadow-favorite h-[246px] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="relative block h-[72px] !w-16 min-w-16">
                  <Image
                    fill
                    className="object-contain"
                    src={`${BASEURL}/${product.thumbnailImage.url}`}
                    alt=""
                  />
                </span>
                <Link
                  href={`/product/${product.url}/`}
                  className="line-clamp-2 max-h-10 font-regular text-[14px] text-[#232429]"
                >
                  {product.title}
                </Link>
              </div>
              <div className="mt-[42px] flex items-center justify-between">
                <div className={`space-y-1 transition-all duration-300`}>
                  <span className="flex h-[20px] w-[39px] items-center justify-center rounded-md bg-main pt-px font-medium text-[10px] text-white lg:h-[24px] lg:w-[41px] lg:text-[12px]">
                    {discountCalculation(product.discountPrice, product.price)}%
                  </span>
                  {product.count <= 3 ? (
                    <p className="hidden h-4 font-medium text-[12px] text-[#ED2E2E] lg:block">
                      تنها {product.count} عدد موجود در انبار
                    </p>
                  ) : (
                    <div className="h-4 w-4"></div>
                  )}
                </div>
                <div>
                  {product.discountPrice ? (
                    <p className="text-left font-regular text-[12px] text-[#A8AFB8] line-through">
                      {Number(product.discountPrice).toLocaleString()}
                    </p>
                  ) : null}
                  <p className="flex items-center gap-1">
                    <span className="font-bold text-[12px] text-[#0C0C0C]">
                      {product.discountPrice
                        ? Number(product.discountPrice).toLocaleString()
                        : Number(product.price).toLocaleString()}
                    </span>
                    <Toman_Icon />
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  onClick={() => mutate(product._id)}
                  isPending={isPendingFav}
                  className="relative !h-[42px] !w-[42px] !min-w-[42px] !rounded-lg border border-[#E4E7E9]"
                >
                  <span>
                    {!isPending && !isPendingFav && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.44 3.09961C14.63 3.09961 13.01 3.97961 12 5.32961C10.99 3.97961 9.37 3.09961 7.56 3.09961C4.49 3.09961 2 5.59961 2 8.68961C2 9.87961 2.19 10.9796 2.52 11.9996C4.1 16.9996 8.97 19.9896 11.38 20.8096C11.72 20.9296 12.28 20.9296 12.62 20.8096C15.03 19.9896 19.9 16.9996 21.48 11.9996C21.81 10.9796 22 9.87961 22 8.68961C22 5.59961 19.51 3.09961 16.44 3.09961Z"
                          fill="#DD338B"
                        />
                      </svg>
                    )}
                  </span>
                </Button>
                <Counter
                  product={product}
                  classAddBtn="grow !h-[42px] text-[13px] !bg-transparent border border-[#E4E7E9]"
                  showBasketIcon={false}
                  classNameAddBtnName="!text-main"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyFav />
      )}
    </div>
  );
};

export default Page;
