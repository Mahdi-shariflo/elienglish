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
import Button from '@/components/common/Button';
import EditInfo from '@/components/checkout/EditInfo';
import BacketItems from '@/components/checkout/BacketItems';

const Page = () => {
  const { data } = useGetAddress();
  const { setCheckout, checkout } = useCheckoutStore();
  const { baskets } = useBasket();
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

  const installmentCourses = baskets?.filter(
    (item) => item.type === 'COURSE' && item.course?.isInstallment
  );

  const isCartPhycial = baskets?.find((item) => item.type === 'PRODUCT_PHYSICAL');

  if (!baskets || baskets?.length < 1) return <EmptyCartPage />;
  return (
    <>
      <div className="mt-6 flex w-full flex-col gap-10 lg:mt-0">
        <BacketItems />
        <EditInfo />
        {isCartPhycial ? (
          <div className="rounded-lg border-[#E5EAEF] dark:border-[#263248] lg:border lg:p-[25px]">
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

        <div className="rounded-lg border-[#E5EAEF] dark:border-[#263248] lg:border lg:p-[25px]">
          <Title title="ثبت سفارش و پرداخت" />
          <div className="mt-10 space-y-6">
            {/* online */}
            <div className="cardPayment">
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
              <div className="cardPayment mt-4 w-full">
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
