import { Address as AddressType } from '@/store/types';
import React from 'react';
import Button from '../common/Button';
import { addToast, Spinner } from '@heroui/react';
import { Plus_icon } from '../common/icon';
import { useMedia } from 'react-use';
import { useRouter } from 'next/navigation';
type Props = {
  isPending: boolean;
  address: AddressType[];
  onSelectAddress: (item: AddressType) => void;
  setModalAddress: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: AddressType | null;
    }>
  >;
  setDeleteModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: AddressType | null;
    }>
  >;
  selectAddress: AddressType | null;
};
const Address = ({
  address,
  onSelectAddress,
  selectAddress,
  setModalAddress,
  setDeleteModal,
  isPending,
}: Props) => {
  const isMobile = useMedia('(max-width: 480px)', false);
  const router = useRouter();
  if (isPending)
    return (
      <Spinner classNames={{ circle1: 'border-b-main', circle2: 'border-b-main', base: 'mt-4' }} />
    );
  const onNewAddress = () => {
    if (address?.length === 5)
      return addToast({ title: 'حداکثر 5 آدرس قابل ثبت است', color: 'danger' });
    if (isMobile) return router.push(`/profile/address/new/`);
    setModalAddress({ open: true, info: null });
  };
  return (
    <>
      {address?.length >= 1 ? (
        <>
          <div className="mt-4 space-y-4 overflow-hidden">
            {address.map((item, idx) => (
              <Button
                onClick={() => onSelectAddress(item)}
                key={idx}
                className={`!h-fit !min-h-[73px] items-start justify-between rounded-lg border py-2 ${selectAddress?._id === item._id ? 'border-main bg-main bg-opacity-10' : 'border-transparent bg-[#F6F6F6]'}`}
              >
                <div className="flex h-full flex-col items-start justify-center space-y-2 px-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-[20px] w-[20px] items-center justify-center rounded-full border ${selectAddress?._id === item._id ? 'border-main' : 'border-[#7D8793]'}`}
                    >
                      {selectAddress?._id === item._id && (
                        <span className="block h-[14px] w-[14px] rounded-full bg-main"></span>
                      )}
                    </span>
                    <p className="font-regular text-[12px] text-[#232429] lg:text-[14px]">
                      {item?.title}
                    </p>
                  </div>
                  <p className="text-wrap pt-2 font-regular text-[12px] text-[#545A66] lg:pt-0 lg:text-[14px]">
                    {item.address}
                  </p>
                </div>
                <div className="absolute left-0 top-0 flex items-center gap-1 px-2 lg:static">
                  <Button
                    className="w-fit min-w-fit px-2 text-main"
                    onClick={() =>
                      isMobile
                        ? router.push(`/profile/address/${item._id}/`)
                        : setModalAddress({ info: item, open: true })
                    }
                  >
                    <span className="text-[12px]">ویرایش آدرس</span>
                    <span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.33325 1.33398H5.99992C2.66659 1.33398 1.33325 2.66732 1.33325 6.00065V10.0007C1.33325 13.334 2.66659 14.6673 5.99992 14.6673H9.99992C13.3333 14.6673 14.6666 13.334 14.6666 10.0007V8.66732"
                          stroke="#6E3DFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6933 2.0135L5.43992 7.26684C5.23992 7.46684 5.03992 7.86017 4.99992 8.14684L4.71325 10.1535C4.60659 10.8802 5.11992 11.3868 5.84659 11.2868L7.85325 11.0002C8.13325 10.9602 8.52659 10.7602 8.73325 10.5602L13.9866 5.30684C14.8933 4.40017 15.3199 3.34684 13.9866 2.0135C12.6533 0.680168 11.5999 1.10684 10.6933 2.0135Z"
                          stroke="#6E3DFF"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.93994 2.76758C10.3866 4.36091 11.6333 5.60758 13.2333 6.06091"
                          stroke="#6E3DFF"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Button>
                  <div className="h-6 w-px bg-gray-300" />
                  <Button
                    className="w-fit min-w-fit px-2"
                    onClick={() => setDeleteModal({ info: item, open: true })}
                  >
                    <span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 3.98763C11.78 3.76763 9.54667 3.6543 7.32 3.6543C6 3.6543 4.68 3.72096 3.36 3.8543L2 3.98763"
                          stroke="#6E3DFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.6665 3.31398L5.81317 2.44065C5.91984 1.80732 5.99984 1.33398 7.1265 1.33398H8.87317C9.99984 1.33398 10.0865 1.83398 10.1865 2.44732L10.3332 3.31398"
                          stroke="#6E3DFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5664 6.09375L12.1331 12.8071C12.0598 13.8537 11.9998 14.6671 10.1398 14.6671H5.85977C3.99977 14.6671 3.93977 13.8537 3.86644 12.8071L3.43311 6.09375"
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
                          d="M6.3335 8.33398H9.66683"
                          stroke="#6E3DFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Button>
                </div>
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-4 flex flex-col justify-start rounded-lg bg-[#F9F9F9] p-[18px] font-regular text-[14px] lg:flex-row lg:items-center lg:justify-between">
          <p className="flex flex-col space-y-2">
            <span className="text-[14px]">آدرسی برای شما ثبت نشده است.</span>
            <span className="text-[12px]">
              برای ادامه فرایند خرید، ابتدا آدرس دریافت را وارد کنید.
            </span>
          </p>
          <Button
            onClick={onNewAddress}
            className="mt-5 h-[32px] w-fit min-w-fit self-end rounded-md bg-main px-2 text-white lg:mt-0 lg:h-[40px] lg:rounded-lg"
          >
            <span>
              <Plus_icon />
            </span>
            <span className="text-[12px]">افزودن آدرس جدید</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default Address;
