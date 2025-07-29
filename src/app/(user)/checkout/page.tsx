'use client';
import Address from '@/components/checkout/Address';
import CardBasket from '@/components/common/CardBasket';
import Title from '@/components/common/Title';
import useBasket from '@/hooks/basket/useBasket';
import { useCheckoutStore } from '@/store/checkout-store';
import React, { useEffect, useState } from 'react';
import { Address as AddressType, BasketItem } from '@/store/types';
import Input from '@/components/common/form/Input';
import EmptyCartPage from '@/components/checkout/EmptyCartPage';
import { useFormik } from 'formik';
import ActionAddress from '@/components/profile/ActionAddress';
import { useGetAddress } from '@/hooks/address/useGetAddress';
import { useGetPayment } from '@/hooks/checkout/useGetPayment';
import { useSession } from '@/lib/auth/useSession';
import DeleteAddress from '@/components/profile/DeleteAddress';
import { Radio, RadioGroup } from '@heroui/react';
import Installment from '@/components/checkout/Installment';
function groupByParent(items: BasketItem[]) {
  const map = new Map();
  const result: any[] = [];
  const parentIdsWithChildren = new Set<string>();

  for (const item of items) {
    const parentId = item.product?.parent;

    if (parentId) {
      // parent هنوز اضافه نشده؟
      if (!map.has(parentId)) {
        const parentItem = items.find(
          (i) =>
            i.product?._id === parentId || i.course?._id === parentId || i.lpas?._id === parentId
        );

        if (parentItem) {
          const mainItem = { ...parentItem, children: [] };
          result.push(mainItem);
          map.set(parentId, mainItem);
          parentIdsWithChildren.add(parentId); // علامت‌گذاری اینکه این parent بچه دارد
        } else {
          // اگر parent داخل لیست نبود
          const mainItem = { _id: parentId, children: [] };
          result.push(mainItem);
          map.set(parentId, mainItem);
          parentIdsWithChildren.add(parentId);
        }
      }

      map.get(parentId).children.push(item);
    }
  }

  // حالا آیتم‌هایی که نه parent هستند و نه زیرمجموعه، به نتیجه اضافه شوند
  for (const item of items) {
    const itemId = item.product?._id || item.course?._id || item.lpas?._id;

    // اگر این آیتم parent یک زیرمجموعه است، اضافه نکن
    if (parentIdsWithChildren.has(itemId)) continue;

    const parentId = item.product?.parent;
    // اگر خود آیتم زیرمجموعه است، اضافه نکن
    if (parentId) continue;

    // آیتم مستقل است، اضافه کن
    const mainItem = { ...item, children: [] };
    result.push(mainItem);
  }

  return result;
}

const Page = () => {
  const session = useSession();
  const { data: payment } = useGetPayment();
  const { data } = useGetAddress();
  const { setCheckout, checkout } = useCheckoutStore();
  const { baskets } = useBasket();
  const groupedItems = groupByParent(baskets ? baskets : []);
  const address = data?.data?.data?.address;

  const [deleteModal, setDeleteModal] = useState<{ open: boolean; info: AddressType | null }>({
    open: false,
    info: null,
  });

  const [selectAddress, setSelectAddress] = useState<AddressType | null>(null);
  const [modalAddress, setModalAddress] = useState<{ open: boolean; info: AddressType | null }>({
    open: false,
    info: null,
  });
  useEffect(() => {
    setCheckout({
      address: null,
      discountCode: null,
      payment: null,
      transport: null,
      selectInstallment: 'online',
    });
  }, []);

  const onSelectAddress = (address: AddressType) => {
    setSelectAddress(address);
    setCheckout({ ...checkout, address });
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });
  const installmentCourses = baskets?.filter(
    (item) => item.type === 'COURSE' && item.course?.isInstallment
  );

  const isCartPhycial = baskets?.find((item) => item.type === 'PRODUCT_PHYSICAL');
  useEffect(() => {
    if (session) {
      formik.setValues({
        firstName: session?.firstName as string,
        lastName: session?.lastName as string,
      });
    }
  }, [session]);
  if (!baskets || baskets?.length < 1) return <EmptyCartPage />;
  return (
    <>
      <div className="mt-14 flex w-full flex-col lg:mt-0 lg:gap-10">
        <div className="rounded-lg border border-[#E5EAEF] p-3 dark:border-[#505B74]">
          <Title title="سبد خرید" />
          <div className="mt-10 flex flex-col gap-5">
            {groupedItems?.map((product, idx) => (
              <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-[#505B74] dark:bg-[#172334]">
                <CardBasket
                  showDeleteIcon={true}
                  showAddBasketDialog={false}
                  showOtherItem={false}
                  key={idx}
                  product={
                    product.type === 'PRODUCT_DIGITAL' || product.type === 'PRODUCT_PHYSICAL'
                      ? { ...product.product, count: product.count }
                      : product.type === 'COURSE'
                        ? product.course
                        : product.lpas
                  }
                />
                {product?.children && product?.children?.length >= 1 ? (
                  <div className="border-t border-[#E5EAEF] px-3 dark:border-[#505B74]">
                    {product?.children?.map((item: any, idx: number) => {
                      if (!item.product.title) return null;
                      return (
                        <CardBasket
                          classImage="!w-[60px] !min-h-[40px] !min-w-[60px] !h-[40px]"
                          showTotal={false}
                          showAddBasketDialog={false}
                          showOtherItem={false}
                          key={idx}
                          product={item?.product}
                          showDeleteIcon={false}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
            {/* <CardBasket product={null} /> */}
          </div>
        </div>
        <div className="rounded-lg border border-[#E5EAEF] p-3 dark:border-[#505B74]">
          <Title title="اطلاعات ثبت‌نام کننده" />
          <div className="mt-10 grid grid-cols-2 gap-4">
            <Input label={'نام'} formik={formik} name="firstName" />
            <Input label={'نام خانوادگی'} formik={formik} name="lastName" />
          </div>
        </div>
        {isCartPhycial ? (
          <div className="rounded-lg border border-[#E5EAEF] p-3">
            <Title title="انتخاب آدرس" />
            <div className="mt-10">
              <Address
                setDeleteModal={setDeleteModal}
                setModalAddress={setModalAddress}
                isPending={false}
                onSelectAddress={onSelectAddress}
                selectAddress={selectAddress}
                address={address}
              />
            </div>
          </div>
        ) : null}

        <div className="rounded-lg border border-[#E5EAEF] p-3 dark:border-[#505B74]">
          <Title title="ثبت سفارش و پرداخت" />
          <div className="mt-10">
            {/* online */}
            <div className="">
              <RadioGroup
                value={checkout.selectInstallment}
                onValueChange={(value) => setCheckout({ ...checkout, selectInstallment: value })}
              >
                <Radio
                  classNames={{
                    control: 'group-data-[selected=true]:bg-main',
                    wrapper: 'group-data-[selected=true]:!border-main',
                  }}
                  value="online"
                >
                  <span className="font-medium">پرداخت اینترنتی</span>
                </Radio>
              </RadioGroup>
              {checkout.selectInstallment === 'online' ? (
                <>
                  <p className="pt-4 font-medium text-[12px] text-[#6A7890]">
                    پرداخت آنلاین توسط کلیه کارت‌های بانکی متصل به شبکه شتاب
                  </p>
                  <div className="mt-4"></div>
                </>
              ) : null}
            </div>
            {/* installment */}

            {installmentCourses && (
              <div className="mt-4">
                <RadioGroup
                  value={checkout.selectInstallment}
                  onValueChange={(value) => setCheckout({ ...checkout, selectInstallment: value })}
                >
                  <Radio
                    classNames={{
                      control: 'group-data-[selected=true]:bg-main',
                      wrapper: 'group-data-[selected=true]:!border-main',
                    }}
                    value="installment"
                  >
                    <span className="font-medium">پرداخت اقساطی</span>
                  </Radio>
                </RadioGroup>
                {checkout.selectInstallment === 'installment' ? (
                  <>
                    <p className="pt-4 font-medium text-[12px] text-[#6A7890]">
                      شما با پرداخت اقساطی میتوانید مبلغ دوره مد نظر را در 4 قسط پرداخت کنید.{' '}
                    </p>
                    <Installment />
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
      {modalAddress && <ActionAddress modal={modalAddress} setModal={setModalAddress} />}
      {deleteModal.open && <DeleteAddress open={deleteModal} setOpen={setDeleteModal} />}
    </>
  );
};

export default Page;
