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
}: Props) => {
  const session = useSession();
  const [openNeedLogin, setOpenNeedLogin] = useState(false);
  const { baskets } = useBasket();
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useAddBasket();
  const { mutate: mutateRemoveBasket, isPending: isPendingRemoveBasket } = useRemoveBasket();
  const productIsBasket = baskets?.find(
    (basket: any) =>
      basket[typeCounter === 'digital' ? 'product' : typeCounter]?._id === product._id
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
  // if (isPeningBasket) return <Spinner size='sm' classNames={{ circle1: "!border-b-main", circle2: "!border-b-main" }} className='ml-auto mt-2' />
  return (
    <>
      {productIsBasket ? (
        typeCounter === 'course' || typeCounter === 'digital' || typeCounter === 'lpas' ? (
          <Link
            className={`mt-3 flex h-[44px] w-full items-center justify-center whitespace-nowrap rounded bg-main px-2 font-medium text-[12px] text-white ${classLinkCart}`}
            href={'/checkout/'}
          >
            موجود در سبد خرید شما
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
                      classNames={{ circle1: '!border-b-main', circle2: '!border-b-main' }}
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
                          classNames={{ circle1: '!border-b-main', circle2: '!border-b-main' }}
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
                      classNames={{ circle1: '!border-b-main', circle2: '!border-b-main' }}
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
            mutate({ itemId: product._id, type: typePayload });
          }}
          className={`flex h-[36px] min-w-fit items-center justify-center gap-2 rounded-lg bg-main px-3 font-medium text-white lg:h-[48px] lg:w-full ${classAddBtn}`}
        >
          {showBasketIcon ? (
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 2.5H4.24001C5.32001 2.5 6.17 3.43 6.08 4.5L5.25 14.46C5.11 16.09 6.39999 17.49 8.03999 17.49H18.69C20.13 17.49 21.39 16.31 21.5 14.88L22.04 7.38C22.16 5.72 20.9 4.37 19.23 4.37H6.32001"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.75 22.5C17.4404 22.5 18 21.9404 18 21.25C18 20.5596 17.4404 20 16.75 20C16.0596 20 15.5 20.5596 15.5 21.25C15.5 21.9404 16.0596 22.5 16.75 22.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.75 22.5C9.44036 22.5 10 21.9404 10 21.25C10 20.5596 9.44036 20 8.75 20C8.05964 20 7.5 20.5596 7.5 21.25C7.5 21.9404 8.05964 22.5 8.75 22.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 8.5H21.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ) : null}
          {isPending ? (
            <Spinner
              classNames={{ circle1: '!border-b-white', circle2: '!border-b-white' }}
              size="sm"
            />
          ) : (
            <span className={classNameAddBtnName}>افزودن به سبد</span>
          )}
        </button>
      )}

      <ModalNeedLoginUser open={openNeedLogin} setOpen={setOpenNeedLogin} />
    </>
  );
};

export default Counter;
