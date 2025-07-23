'use client';

import BaseDialog from '@/components/common/BaseDialog';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import { initialDataLpa } from '@/lib/table-column';
import useOrderStore from '@/store/order-store';
import { Order, Product } from '@/types/home';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ReactTable from '../common/ReactTable';

const ProductsOrderLpa = ({ order }: { order: Order }) => {
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

  // Determine edit mode
  const isEdit = searchParams.get('status') === 'Review';

  // Memoize columns - always call useMemo
  const columns: any = useMemo(() => {
    return initialDataLpa(
      isEdit
        ? {
            onDelete: (info) => setDeleteModal({ info, open: true }),
            onEdit: (info) => setOpenEdit({ info, open: true }),
          }
        : {}
    );
  }, [isEdit, setDeleteModal, setOpenEdit]);

  // Set order items when order changes
  useEffect(() => {
    if (order) {
      // @ts-expect-error error
      setOrderItems([order['levelItems']]);
    }
  }, [order, setOrderItems]);

  // Early return if no orderItems to render
  // @ts-expect-error error
  if (!order?.levelItems) return null;

  // Handlers
  const onCloseDelete = () => {
    setDeleteModal({ open: false, info: null });
  };

  const onVerifyDelete = () => {
    if (openDelete.info?._id) {
      setOrderItems(orderItems.filter((item) => item._id !== openDelete.info!._id));
      setDeleteModal({ open: false, info: null });
    }
  };

  const increment = () => {
    if (openEdit.info) {
      setOpenEdit({
        open: true,
        info: {
          ...openEdit.info,
          productCount: Number(openEdit.info.productCount) + 1,
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
          productCount: Number(openEdit.info.productCount) - 1,
        },
      });
    }
  };

  const onEditProduct = () => {
    if (!openEdit.info) return;

    const filteredItems = orderItems.filter((item) => item._id !== openEdit.info!._id);
    setOrderItems([...filteredItems, openEdit.info]);

    setOpenEdit({ info: null, open: false });
  };
  console.log(orderItems);

  return (
    <div className="mt-3 rounded-xl border border-[#E4E7E9] p-4">
      <ReactTable
        isSuccess={true}
        columns={['_id', 'title', 'teacherName', 'price', 'discountPrice', 'action']}
        mainData={orderItems}
        showData={columns}
      />
      {openDelete.open && (
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
              <Image
                className="h-[64px] w-[64px] rounded-lg border border-[#E4E7E9]"
                // @ts-expect-error error
                src={openDelete.info?.thumbnailImage || ''}
                alt={openDelete.info?.title || ''}
              />
              <p className="font-regular text-[14px] text-[#616A76]">{openDelete.info?.title}</p>
            </div>
            <p className="py-5 text-center font-medium">
              آیا مطمئن هستید که میخواهید این محصول را از لیست سفارشات خود حذف کنید؟
            </p>
          </div>
        </BaseDialog>
      )}

      {openEdit.open && (
        <BaseDialog
          size="md"
          isOpen={openEdit.open}
          title="ویرایش محصول"
          onClickFooter={onEditProduct}
          onClose={() => setOpenEdit({ open: false, info: null })}
        >
          <div className="border-gray-10 flex items-center gap-2 overflow-hidden rounded-lg border p-3">
            <Image
              className="h-[64px] w-[64px] rounded-lg border border-[#E4E7E9]"
              // @ts-expect-error error
              src={openEdit.info?.thumbnailImage || ''}
              alt={openEdit.info?.title || ''}
            />
            <div>
              <p className="font-regular text-[14px] text-[#616A76]">{openEdit.info?.title}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Button onClick={increment} className="w-full !min-w-fit bg-transparent px-0">
                    {/* SVG plus icon */}
                  </Button>
                  <span className="block min-w-[32px] flex-1 text-center font-bold text-[14px] text-main">
                    {openEdit.info?.productCount}
                  </span>
                  <Button onClick={decrement} className="w-full !min-w-fit bg-transparent px-0">
                    {/* SVG minus icon */}
                  </Button>
                </div>
                {Number(openEdit.info?.productCount) >= 1 && (
                  <Button onClick={decrement} className="w-fit min-w-fit px-0 pt-1">
                    {/* SVG trash icon */}
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

export default ProductsOrderLpa;
