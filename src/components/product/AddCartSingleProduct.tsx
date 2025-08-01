'use client';
import React, { useState } from 'react';
import { Toman_Icon } from '../common/icon';
import { Product } from '@/store/types/home';
import { discountCalculation } from '@/lib/utils';
import Image from 'next/image';
import { BASEURL } from '@/lib/variable';
import { useAddBasket } from '@/hooks/basket/useAddBasket';
import ModalNeedLoginUser from '../common/ModalNeedLoginUser';
import { useSession } from '@/lib/auth/useSession';
import useBasket from '@/hooks/basket/useBasket';
import { Checkbox } from '@heroui/react';
import Button from '../common/Button';
import Counter from '../common/Counter';

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

  console.log(selectedAddons, 'selectedAddonsselectedAddonsselectedAddons');
  const addonsTotal = selectedAddons.reduce((sum, item) => {
    const hasDiscount = item.discountPrice && item.discountPrice > 0;

    const basePrice = hasDiscount ? item.discountPrice : (item.price ?? 0) + (product.price ?? 0);

    const discount = item?.suggestedDiscount ?? 0;

    const finalAddonPrice = basePrice - discount;

    return sum + finalAddonPrice;
  }, 0);

  const finalPrice = mainPrice + addonsTotal;

  return (
    <>
      <div
        className={`style_factor_product bottom-0 left-0 z-10 flex w-full flex-col rounded-lg border border-gray-100 dark:!border-[#263248] lg:!z-0 lg:w-[288px] lg:min-w-[288px] lg:gap-3 lg:!border-gray-50 ${className}`}
      >
        <div className="bg-white dark:bg-[#172334] lg:rounded-lg lg:p-2">
          {product?.children && (
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

          <div className="mt-2 flex w-full flex-row-reverse items-center justify-between border-[#F4F6FA] px-[20px] !pt-4 dark:border-[#263248] lg:mt-5 lg:flex-col lg:border-t lg:px-0">
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
                typeCounter={product.type}
                typePayload={product.type === 'digital' ? 'PRODUCT_DIGITAL' : 'PRODUCT_PHYSICAL'}
                classNameAddBtnName="text-[12px]"
                classAddBtn="mt-4"
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
  return (
    <div className="bg-[#EDE8FC] px-2 pt-2 lg:bg-transparent lg:p-0">
      <div className="mt-4 flex flex-col gap-4 border-[#F4F6FA] px-4 pt-4 dark:border-[#263248] lg:border-t">
        {products?.map((item, idx) => {
          const isChecked = selected.some((p) => p._id === item._id);

          return (
            <div
              key={idx}
              className="flex items-center justify-between border-dashed pb-3 dark:border-[#263248] lg:border-b"
            >
              <Checkbox
                size="lg"
                isSelected={isChecked}
                onValueChange={() => onToggle(item)}
                classNames={{
                  label:
                    'pr-3 text-[14px] w-[180px] overflow-hidden text-ellipsis  whitespace-nowrap dark:text-[#8E98A8] !font-regular text-[#0C0C0C]',
                  wrapper: 'after:!bg-main',
                }}
              >
                {item.title}
              </Checkbox>
              <span className="flex h-[20px] w-[39px] items-center justify-center rounded-full bg-[#f44336] font-light text-white">
                {discountCalculation(item.discountPrice, item.price)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
