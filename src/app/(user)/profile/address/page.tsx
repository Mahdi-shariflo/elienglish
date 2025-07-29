'use client';
import BackPrevPage from '@/components/common/BackPrevPage';
import Button from '@/components/common/Button';
import ActionAddress from '@/components/profile/ActionAddress';
import CardAddress from '@/components/profile/CardAddress';
import DeleteAddress from '@/components/profile/DeleteAddress';
import EmptyAddress from '@/components/profile/EmptyAddress';
import { useGetAddress } from '@/hooks/address/useGetAddress';
import { Address } from '@/store/types';
import { addToast, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMedia } from 'react-use';
type TypeModal = {
  open: boolean;
  info: Address | null;
};
const Page = () => {
  const isMobile = useMedia('(max-width: 480px)', false);
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState<TypeModal>({
    open: false,
    info: null,
  });
  const { data, isPending } = useGetAddress();
  const [modal, setModal] = useState<TypeModal>({
    open: false,
    info: null,
  });
  const address: Address[] = data?.data?.data?.address;

  const onNewAddress = () => {
    if (address.length === 5)
      return addToast({ title: 'حداکثر 5 آدرس قابل ثبت است', color: 'danger' });
    if (isMobile) return router.push('/profile/address/new/');
    setModal({ open: true, info: null });
  };
  return (
    <div className="pb-32 pt-4 lg:mb-10 lg:pb-0 lg:pt-0">
      <BackPrevPage title="لیست آدرس‌ها" />

      <div className="container_page mt-10 space-y-4 rounded-2xl border border-[#E4E7E9] bg-white p-4 lg:mt-5 lg:min-h-[70vh] lg:!w-full lg:p-[16px]">
        <div className="flex items-center justify-between border-b border-[#E4E7E9] pb-3 lg:border-0">
          <p className="hidden font-medium text-[18px] text-[#0C0C0C] lg:block">لیست آدرس‌ها</p>
          {address?.length >= 1 && (
            <Button
              onClick={onNewAddress}
              className="h-[42px] border border-[#E4E7E9] px-2 font-regular text-main lg:w-fit"
            >
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18"
                    stroke="#6E3DFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18V6"
                    stroke="#6E3DFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              آدرس جدید
            </Button>
          )}
        </div>

        {isPending ? (
          <Spinner
            size="lg"
            classNames={{ circle1: 'border-b-main', circle2: 'border-b-main' }}
            className="mt-10 flex items-center justify-center lg:mt-20"
          />
        ) : address?.length >= 1 ? (
          <div className="space-y-3 !pr-5 lg:!mt-10">
            {address.map((item, idx) => {
              return (
                <CardAddress
                  onDelete={() => setDeleteModal({ info: item, open: true })}
                  onEdit={() =>
                    isMobile
                      ? router.push(`/profile/address/${item._id}/`)
                      : setModal({ info: item, open: true })
                  }
                  key={idx}
                  address={item}
                />
              );
            })}
          </div>
        ) : (
          <EmptyAddress setModal={setModal} />
        )}

        {/* {
                    address?.length > 1 &&
                    <Pagination />
                } */}
      </div>
      <DeleteAddress open={deleteModal} setOpen={setDeleteModal} />
      <ActionAddress modal={modal} setModal={setModal} />
    </div>
  );
};

export default Page;
