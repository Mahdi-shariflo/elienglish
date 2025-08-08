'use client';
import { useAddBasket } from '@/hooks/basket/useAddBasket';
import useBasket from '@/hooks/basket/useBasket';
import { useRemoveBasket } from '@/hooks/basket/useRemoveBasket';
import cn from '@/lib/classnames';
import { Product } from '@/store/types/home';
import { addToast, Spinner } from '@heroui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ModalNeedLoginUser from './ModalNeedLoginUser';
import { useSession } from '@/lib/auth/useSession';

type Props = {
  nameAddBakect?: string;
  product: Product;
  classNameCounter?: string;
  classLinkCart?: string;
  typePayload: string;
  typeCounter: string;
  container_Class?: string;
  classAddBtn?: string;
  classCount?: string;
  classNameAddBtnName?: string;
  showCartLink?: boolean;
  showAddBasketDialog?: boolean;
  showDeleteIcon?: boolean;
  showBasketIcon?: boolean;
  handleAddToCart?: () => void;
};
const Counter = ({
  classNameAddBtnName,
  showBasketIcon = true,
  product,
  classNameCounter,
  classCount,
  container_Class,
  showCartLink,
  classAddBtn,
  typePayload,
  typeCounter,
  classLinkCart,
  handleAddToCart,
  nameAddBakect = 'افزودن به سبد خرید',
}: Props) => {
  const session = useSession();
  const [openNeedLogin, setOpenNeedLogin] = useState(false);
  const { baskets } = useBasket();
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useAddBasket();
  const { mutate: mutateRemoveBasket, isPending: isPendingRemoveBasket } = useRemoveBasket();
  const productIsBasket = baskets?.find(
    (basket: any) =>
      basket[typeCounter === 'digital' || typeCounter === 'physical' ? 'product' : typeCounter]
        ?._id === product._id
  );

  useEffect(() => {
    if (isSuccess) {
      setOpen(!open);
    }
  }, [isSuccess]);

  const increment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!session?.accessToken) return setOpenNeedLogin(true);
    e.preventDefault();
    e.stopPropagation();
    if (product.singleSale && Number(productIsBasket?.count) >= 1)
      return addToast({
        title: 'شما فقط میتوانید  یه عدد از این محصول را بخرید.',
        color: 'danger',
      });
    //  if(Number(productIsBasket?.count) >= product.minCart) return toast.error(``)
    if (Number(product.count) <= Number(productIsBasket?.count))
      return addToast({ title: `موجودی محصول کمتر از تعداد انتخابی شما است.`, color: 'danger' });
    if (handleAddToCart) {
      handleAddToCart();
    } else {
      mutate({ itemId: product._id, type: typePayload });
    }
  };
  const descrement = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!session?.accessToken) return setOpenNeedLogin(true);
    e.preventDefault();
    e.stopPropagation();
    if (Number(productIsBasket?.count) < 0) return null;
    mutateRemoveBasket({ id: product._id });
  };
  // if (isPeningBasket) return <Spinner size='sm' classNames={{ circle1: "!border-b-white", circle2: "!border-b-white" }} className='ml-auto mt-2' />
  return (
    <>
      {productIsBasket ? (
        typeCounter === 'course' ||
        typeCounter === 'digital' ||
        typeCounter === 'physical' ||
        typeCounter === 'lpas' ? (
          <Link
            className={`mt-3 flex h-[44px] w-full items-center justify-center whitespace-nowrap rounded bg-main px-2 font-medium text-[12px] text-white ${classLinkCart}`}
            href={'/checkout/'}
          >
            تکمیل سبد خرید
          </Link>
        ) : (
          <div className={cn(container_Class)}>
            <div className="flex items-center gap-2">
              <div className={cn('flex items-center', classNameCounter)}>
                <button
                  onClick={increment}
                  className="flex !h-fit w-full !min-w-fit items-center justify-center bg-transparent px-0"
                >
                  {isPending ? (
                    <Spinner
                      classNames={{ circle1: '!border-b-white', circle2: '!border-b-white' }}
                      size="sm"
                    />
                  ) : (
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 8H12.5"
                        stroke="#6E3DFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 12V4"
                        stroke="#6E3DFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className={`block min-w-[32px] flex-1 text-center font-bold text-[14px] text-main ${classCount}`}
                >
                  {productIsBasket.count}
                </span>
                <button
                  disabled={isPendingRemoveBasket}
                  onClick={descrement}
                  className="flex !h-fit w-full !min-w-fit items-center justify-center bg-transparent px-0"
                >
                  {Number(productIsBasket?.count) === 1 ? (
                    <span>
                      {isPendingRemoveBasket ? (
                        <Spinner
                          classNames={{ circle1: '!border-b-white', circle2: '!border-b-white' }}
                          size="sm"
                        />
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665"
                            stroke="#6E3DFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.66675 3.31337L5.81341 2.44004C5.92008 1.80671 6.00008 1.33337 7.12675 1.33337H8.87341C10.0001 1.33337 10.0867 1.83337 10.1867 2.44671L10.3334 3.31337"
                            stroke="#6E3DFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.5667 6.09338L12.1334 12.8067C12.06 13.8534 12 14.6667 10.14 14.6667H5.86002C4.00002 14.6667 3.94002 13.8534 3.86668 12.8067L3.43335 6.09338"
                            stroke="#6E3DFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.88672 11H9.10672"
                            stroke="#6E3DFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.33325 8.33337H9.66659"
                            stroke="#6E3DFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  ) : isPendingRemoveBasket ? (
                    <Spinner
                      classNames={{ circle1: '!border-b-white', circle2: '!border-b-white' }}
                      size="sm"
                    />
                  ) : (
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 8H12.5"
                        stroke="#6E3DFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {showCartLink && (
              <Link
                className="flex h-[24px] w-fit items-center justify-center whitespace-nowrap rounded bg-main px-2 font-medium text-[12px] text-white"
                href={'/cart/'}
              >
                تکمیل سبد خرید
              </Link>
            )}
          </div>
        )
      ) : (
        <button
          disabled={isPending}
          onClick={(e) => {
            if (!session?.accessToken) return setOpenNeedLogin(true);
            e.preventDefault();
            e.stopPropagation();
            if (handleAddToCart) {
              handleAddToCart();
            } else {
              mutate({ itemId: product._id, type: typePayload });
            }
          }}
          className={`flex h-[36px] min-w-fit items-center justify-center gap-2 rounded-lg bg-main px-3 font-medium text-white lg:h-[48px] lg:w-full ${classAddBtn}`}
        >
          {isPending ? (
            <Spinner
              classNames={{ circle1: '!border-b-white', circle2: '!border-b-white' }}
              size="sm"
            />
          ) : (
            <span className={classNameAddBtnName}>{nameAddBakect}</span>
          )}
        </button>
      )}

      <ModalNeedLoginUser open={openNeedLogin} setOpen={setOpenNeedLogin} />
    </>
  );
};

export default Counter;
