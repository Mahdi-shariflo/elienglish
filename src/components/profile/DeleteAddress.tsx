import React, { useEffect } from 'react';
import BaseDialog from '../common/BaseDialog';
import { Address } from '@/types';
import { useRemoveAddress } from '@/hooks/address/useRemoveAddress';
type Props = {
  open: {
    open: boolean;
    info: null | Address;
  };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      info: Address | null;
    }>
  >;
};
const DeleteAddress = ({ open, setOpen }: Props) => {
  const { mutate, isPending, isSuccess } = useRemoveAddress();
  const onClose = () => setOpen({ open: false, info: null });
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);
  return (
    <BaseDialog
      size="md"
      isLoadingFooterBtn={isPending}
      title="حذف آدرس"
      isOpen={open.open}
      onClickFooter={() => mutate({ id: open.info?._id })}
      nameBtnFooter="حذف آدرس"
      onClose={onClose}
    >
      <p className="py-5 text-center font-medium text-[18px]">
        آیا مطمئن هستید که میخواهید آدرس را حذف کنید؟
      </p>
    </BaseDialog>
  );
};

export default DeleteAddress;
