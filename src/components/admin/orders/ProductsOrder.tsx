'use client';
import { initialDataDetailOrder, initialDataDetailOrderSnap } from '@/lib/table-column';
import { Order, Product } from '@/types/home';
import React, { useEffect, useMemo, useState } from 'react';
import ReactTable from '../common/ReactTable';
import { useSearchParams } from 'next/navigation';
import useOrderStore from '@/store/order-store';
import BaseDialog from '@/components/common/BaseDialog';
import Image from '@/components/common/Image';
import Button from '@/components/common/Button';

const ProductsOrder = ({ order }: { order: Order }) => {
  const [openEdit, setOpenEdit] = useState<{ open: boolean; info: null | Product }>({
    open: false,
    info: null,
  });
  const [openDelete, setDeleteModal] = useState<{ open: boolean; info: null | Product }>({
    open: false,
    info: null,
  });
  const { orderItems, setOrderItems } = useOrderStore();
  const searchParams = useSearchParams();
  if (!order?.orderItems) return null;
  const isEdit = searchParams.get('status') === 'Review';
  const columns: any = useMemo(
    () =>
      initialDataDetailOrder(
        isEdit
          ? {
              onDelete: (info) => setDeleteModal({ info, open: true }),
              onEdit: (info) => setOpenEdit({ info, open: true }),
            }
          : {}
      ),

    [isEdit, orderItems]
  );
  useEffect(() => {
    if (order) {
      setOrderItems(order.orderItems!);
    }
  }, [order]);
  const onCloseDelete = () => {
    setDeleteModal({ open: false, info: null });
  };
  const onVerifyDelete = () => {
    if (openDelete.info?._id) {
      // @ts-expect-error
      setOrderItems(orderItems.filter((item) => item._id !== openDelete?.info._id!));
      setDeleteModal({ open: false, info: null });
    }
  };

  const increment = () => {
    if (openEdit.info) {
      setOpenEdit({
        open: true,
        info: {
          ...openEdit.info,
          productCount: Number(openEdit.info?.productCount) + 1,
        },
      });
    }
  };
  const decrement = () => {
    if (openEdit.info && openEdit.info.productCount > 1) {
      setOpenEdit({
        open: true,
        info: {
          ...openEdit.info,
          productCount: Number(openEdit.info?.productCount) - 1,
        },
      });
    }
  };

  const onEditProduct = () => {
    if (!openEdit.info) return; // اگر اطلاعاتی برای ویرایش وجود نداشت، تابع متوقف شود.

    const filterItemSelected = orderItems.filter((item) => item._id !== openEdit?.info?._id);
    setOrderItems([...filterItemSelected, openEdit.info]);

    setOpenEdit({ info: null, open: false });
  };

  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <ReactTable
        isSuccess={true}
        columns={[
          'productCount',
          'title',
          'url',
          'wooId',
          'productPrice',
          'createdAt',
          'total',
          'nid',
          'action',
        ]}
        mainData={orderItems}
        showData={columns}
      />
      {openDelete && (
        <BaseDialog
          size="lg"
          isOpen={openDelete.open}
          onClose={onCloseDelete}
          title="حذف محصول"
          onClickFooter={onVerifyDelete}
          nameBtnBack="بستن"
        >
          <div>
            <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-gray-100 p-3">
              {/* @ts-ignore */}
              <Image
                className="h-[64px] w-[64px] rounded-lg border border-[#E4E7E9]"
                src={openDelete?.info?.thumbnailImage!}
                alt=""
              />
              <p className="font-regular text-[14px] text-[#616A76]">{openDelete.info?.title}</p>
            </div>
            <p className="py-5 text-center font-medium">
              آیا مطمئن هستید که میخواهید این محصول را از لیست سفارشات خود حذف کنید؟
            </p>
          </div>
        </BaseDialog>
      )}

      {openEdit && (
        <BaseDialog
          size="md"
          isOpen={openEdit.open}
          title="ویرایش محصول"
          onClickFooter={onEditProduct}
          onClose={() => setOpenEdit({ open: false, info: null })}
        >
          <div className="border-gray-10 flex items-center gap-2 overflow-hidden rounded-lg border p-3">
            {/* @ts-ignore */}
            <Image
              className="h-[64px] w-[64px] rounded-lg border border-[#E4E7E9]"
              src={openEdit?.info?.thumbnailImage!}
              alt=""
            />
            <div>
              <p className="font-regular text-[14px] text-[#616A76]">{openEdit.info?.title}</p>
              <div className="flex items-center gap-2">
                <div className={`flex items-center`}>
                  <Button onClick={increment} className="w-full !min-w-fit bg-transparent px-0">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 8H12.5"
                        stroke="#DD338B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 12V4"
                        stroke="#DD338B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                  <span
                    className={`block min-w-[32px] flex-1 text-center font-bold text-[14px] text-main`}
                  >
                    {openEdit?.info?.productCount}
                  </span>
                  <Button onClick={decrement} className="w-full !min-w-fit bg-transparent px-0">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 8H12.5"
                        stroke="#DD338B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
                {Number(openEdit?.info?.productCount) >= 1 && (
                  <Button onClick={decrement} className="w-fit min-w-fit px-0 pt-1">
                    <span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665"
                          stroke="#DD338B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.66675 3.31337L5.81341 2.44004C5.92008 1.80671 6.00008 1.33337 7.12675 1.33337H8.87341C10.0001 1.33337 10.0867 1.83337 10.1867 2.44671L10.3334 3.31337"
                          stroke="#DD338B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5667 6.09338L12.1334 12.8067C12.06 13.8534 12 14.6667 10.14 14.6667H5.86002C4.00002 14.6667 3.94002 13.8534 3.86668 12.8067L3.43335 6.09338"
                          stroke="#DD338B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.88672 11H9.10672"
                          stroke="#DD338B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.33325 8.33337H9.66659"
                          stroke="#DD338B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </BaseDialog>
      )}
    </div>
  );
};

export default ProductsOrder;
