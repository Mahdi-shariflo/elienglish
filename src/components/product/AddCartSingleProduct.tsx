'use client';
import React, { useEffect, useState } from 'react';
import { Toman_Icon } from '../common/icon';
import { Product } from '@/store/types/home';
import { discountCalculation } from '@/lib/utils';
import Image from 'next/image';
import { BASEURL } from '@/lib/variable';
import { useAddBasket } from '@/hooks/basket/useAddBasket';
import ModalNeedLoginUser from '../common/ModalNeedLoginUser';
import { useSession } from '@/lib/auth/useSession';
import useBasket from '@/hooks/basket/useBasket';
import { Accordion, AccordionItem, Checkbox } from '@heroui/react';
import Counter from '../common/Counter';
import { useMedia } from 'react-use';

type Props = {
  showDetail?: boolean;
  className?: string;
  product: Product;
};

const AddCartSingleProduct = ({ className, product, showDetail }: Props) => {
  const session = useSession();
  const { baskets } = useBasket();
  const [openNeedLogin, setOpenNeedLogin] = useState(false);
  const { mutate: mutateAdd } = useAddBasket();
  const [selectedAddons, setSelectedAddons] = useState<Product[]>([]);

  const handleSelectAddon = (item: Product) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((p) => p._id === item._id);
      return exists ? prev.filter((p) => p._id !== item._id) : [...prev, item];
    });
  };

  const handleAddToCart = () => {
    if (!session?.accessToken) return setOpenNeedLogin(true);
    // افزودن محصول اصلی
    mutateAdd({
      itemId: product._id,
      type: 'PRODUCT_PHYSICAL',
    });
    // افزودن افزودنی‌ها
    selectedAddons.forEach((item) => {
      mutateAdd({
        itemId: item._id,
        type: 'PRODUCT_PHYSICAL',
      });
    });
  };
  const mainPrice = product?.discountPrice ?? product?.price ?? 0;

  const addonsTotal = selectedAddons.reduce((sum, item) => {
    const hasDiscount = item.discountPrice && item.discountPrice > 0;

    const basePrice = hasDiscount ? item.discountPrice : (item.price ?? 0);

    const discount = item?.suggestedDiscount ?? 0;

    const finalAddonPrice = basePrice - discount;

    return sum + finalAddonPrice;
  }, 0);

  const finalPrice = mainPrice + addonsTotal;
  useEffect(() => {
    if (!baskets?.length) return;

    const initialSelected =
      product?.children?.filter((addon) => baskets.some((basket) => basket.itemId === addon._id)) ??
      [];

    setSelectedAddons((prev) => {
      const isSame =
        prev.length === initialSelected.length &&
        prev.every((p) => initialSelected.some((s) => s._id === p._id));
      return isSame ? prev : initialSelected;
    });
  }, [baskets, product?.children]);

  return (
    <>
      <div
        className={`style_factor_product bottom-0 left-0 z-10 flex w-full flex-col rounded-lg border border-gray-100 dark:!border-[#263248] lg:!z-0 lg:w-[288px] lg:min-w-[288px] lg:gap-3 lg:!border-gray-50 lg:p-4 ${className}`}
      >
        <div className="bg-white py-2 dark:bg-[#0b1524] lg:rounded-lg lg:py-0">
          {Number(product?.children.length) >= 1 && (
            <AddtiveProduct
              products={product?.children}
              onToggle={handleSelectAddon}
              selected={selectedAddons}
            />
          )}

          {showDetail && (
            <div className="hidden items-center gap-3 border-b border-[#E4E7E9] pb-2 dark:border-[#263248] lg:flex">
              <Image
                className="rounded-xl"
                width={64}
                height={64}
                src={`${BASEURL}/${product?.thumbnailImage?.url}`}
                alt=""
              />
              <p className="font-medium text-xs text-[#616A76]">{product?.title}</p>
            </div>
          )}

          <div className="flex w-full flex-row-reverse items-center justify-between border-[#F4F6FA] px-[20px] !pt-4 dark:border-[#263248] lg:flex-col lg:px-0">
            {product?.count < 1 ? null : (
              <div className="w-full">
                <div className="flex items-center justify-end gap-2">
                  {product?.discountPrice ? (
                    <>
                      <p className="text-left font-regular text-[14px] text-[#616A76] line-through">
                        {Number(product.price).toLocaleString()}
                      </p>
                      <span className="flex h-[20px] w-[39px] items-center justify-center rounded-md bg-main pt-px font-medium text-[10px] text-white lg:h-[24px] lg:w-[41px] lg:text-[12px]">
                        {discountCalculation(product?.discountPrice, product?.price)}%
                      </span>
                    </>
                  ) : null}
                </div>

                <div className="mt-[14px] items-center lg:flex lg:justify-between">
                  <p className="hidden font-medium text-[14px] text-[#616A76] lg:block">
                    قیمت نهایی
                  </p>
                  <p className="flex items-center justify-end gap-1">
                    <span className="font-demibold text-[20px] text-[#0C0C0C] dark:text-white">
                      {finalPrice.toLocaleString()}
                    </span>
                    <Toman_Icon />
                  </p>
                </div>
              </div>
            )}

            {/* دکمه افزودن به سبد خرید */}
            {product?.count >= 1 ? (
              <Counter
                handleAddToCart={handleAddToCart}
                typeCounter={product.type}
                typePayload={product.type === 'digital' ? 'PRODUCT_DIGITAL' : 'PRODUCT_PHYSICAL'}
                classNameAddBtnName="text-[12px]"
                classAddBtn="-mt-2 lg:mt-4 !min-w-[150px] !h-[43px]"
                classCount="border-r border-l"
                container_Class="flex flex-col-reverse lg:flex-row items-center lg:justify-between w-full"
                classNameCounter="border mt-2 rounded-lg border w-[96px] h-[32px] justify-start lg:ml-auto"
                product={product}
                showCartLink
                showAddBasketDialog
              />
            ) : (
              <p className="mb-3 flex-1 text-center font-medium text-[#7D8793] text-opacity-70">
                ناموجود
              </p>
            )}
          </div>
        </div>
      </div>

      <ModalNeedLoginUser open={openNeedLogin} setOpen={setOpenNeedLogin} />
    </>
  );
};

export default AddCartSingleProduct;

const AddtiveProduct = ({
  products,
  onToggle,
  selected,
}: {
  products: Product[];
  onToggle: (item: Product) => void;
  selected: Product[];
}) => {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckboxToggle = (item: Product) => {
    onToggle(item);
  };

  return (
    <div className="rounded-t-xl bg-[#EDE8FC] !px-4 !py-1 lg:rounded-lg lg:!bg-transparent lg:!px-0">
      {isMobile ? (
        // نسخه موبایل - بدون accordion
        <div>
          <div
            className="flex w-full cursor-pointer items-center justify-between py-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 9.40094L7.5 4.21094"
                    stroke="#6E3DFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 16.0019V8.00186C20.9996 7.65113 20.9071 7.30667 20.7315 7.00302C20.556 6.69937 20.3037 6.44722 20 6.27186L13 2.27186C12.696 2.09632 12.3511 2.00391 12 2.00391C11.6489 2.00391 11.304 2.09632 11 2.27186L4 6.27186C3.69626 6.44722 3.44398 6.69937 3.26846 7.00302C3.09294 7.30667 3.00036 7.65113 3 8.00186V16.0019C3.00036 16.3526 3.09294 16.697 3.26846 17.0007C3.44398 17.3043 3.69626 17.5565 4 17.7319L11 21.7319C11.304 21.9074 11.6489 21.9998 12 21.9998C12.3511 21.9998 12.696 21.9074 13 21.7319L20 17.7319C20.3037 17.5565 20.556 17.3043 20.7315 17.0007C20.9071 16.697 20.9996 16.3526 21 16.0019Z"
                    stroke="#6E3DFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.26953 6.96094L11.9995 12.0109L20.7295 6.96094"
                    stroke="#6E3DFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22.08V12"
                    stroke="#6E3DFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="font-medium text-[16px] !text-[#000]">سفارشی سازی محصول</p>
            </div>
            <span
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-90'}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#4000FB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {isExpanded && (
            <div className="mx-auto rounded-lg bg-[#EDE8FC] py-3">
              <div className="flex flex-col gap-4">
                {products?.map((item, idx) => {
                  const isChecked = selected.some((p) => p._id === item._id);

                  return (
                    <div
                      key={item._id || idx}
                      className="flex items-center justify-between border-dashed"
                      onClick={() => handleCheckboxToggle(item)}
                    >
                      <Checkbox
                        size="lg"
                        isSelected={isChecked}
                        readOnly
                        classNames={{
                          base: '!px-2 pointer-events-none',
                          label:
                            'pr-3 text-[14px] w-[180px] overflow-hidden text-ellipsis whitespace-nowrap !font-medium  !text-[#33435A]',
                          wrapper: 'after:!bg-main',
                        }}
                      >
                        {item.title}
                      </Checkbox>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        // نسخه دسکتاپ - با accordion
        <Accordion defaultExpandedKeys={['0']}>
          <AccordionItem
            key={'0'}
            indicator={<span></span>}
            classNames={{
              base: '!py-0',
            }}
            title={
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 9.40094L7.5 4.21094"
                        stroke="#6E3DFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 16.0019V8.00186C20.9996 7.65113 20.9071 7.30667 20.7315 7.00302C20.556 6.69937 20.3037 6.44722 20 6.27186L13 2.27186C12.696 2.09632 12.3511 2.00391 12 2.00391C11.6489 2.00391 11.304 2.09632 11 2.27186L4 6.27186C3.69626 6.44722 3.44398 6.69937 3.26846 7.00302C3.09294 7.30667 3.00036 7.65113 3 8.00186V16.0019C3.00036 16.3526 3.09294 16.697 3.26846 17.0007C3.44398 17.3043 3.69626 17.5565 4 17.7319L11 21.7319C11.304 21.9074 11.6489 21.9998 12 21.9998C12.3511 21.9998 12.696 21.9074 13 21.7319L20 17.7319C20.3037 17.5565 20.556 17.3043 20.7315 17.0007C20.9071 16.697 20.9996 16.3526 21 16.0019Z"
                        stroke="#6E3DFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.26953 6.96094L11.9995 12.0109L20.7295 6.96094"
                        stroke="#6E3DFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22.08V12"
                        stroke="#6E3DFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="font-medium text-[14px] lg:dark:!text-white">سفارشی سازی محصول</p>
                </div>
                <span className="-ml-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_9_22658)">
                      <path
                        d="M10.0013 18.3346C14.6037 18.3346 18.3346 14.6037 18.3346 10.0013C18.3346 5.39893 14.6037 1.66797 10.0013 1.66797C5.39893 1.66797 1.66797 5.39893 1.66797 10.0013C1.66797 14.6037 5.39893 18.3346 10.0013 18.3346Z"
                        stroke="#8E98A8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 13.332H10.0083"
                        stroke="#8E98A8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 6.66797V10.0013"
                        stroke="#8E98A8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9_22658">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
            }
          >
            <div className="mx-auto rounded-lg bg-transparent lg:p-0">
              <div className="flex flex-col gap-4 dark:border-[#263248]">
                {products?.map((item, idx) => {
                  const isChecked = selected.some((p) => p._id === item._id);

                  return (
                    <div
                      key={item._id || idx}
                      className="flex items-center justify-between border-dashed pb-3 dark:border-[#263248] lg:border-b"
                    >
                      <Checkbox
                        size="lg"
                        isSelected={isChecked}
                        onValueChange={() => handleCheckboxToggle(item)}
                        classNames={{
                          base: '!px-2',
                          label:
                            'pr-3 text-[14px] w-[180px] dark:!text-[#8E98A8] overflow-hidden text-ellipsis whitespace-nowrap dark:text-[#8E98A8] !font-medium !text-[#33435A]',
                          wrapper: 'after:!bg-main',
                        }}
                      >
                        {item.title}
                      </Checkbox>
                    </div>
                  );
                })}
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};
