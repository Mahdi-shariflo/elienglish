import React from 'react';
import BaseDialog from './BaseDialog';
import { useRouter } from 'next/navigation';
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};
const ModalNeedLoginUser = ({
  open,
  setOpen,
  title = 'برای انجام عملیات،نیاز به ورود حساب کاربری می باشد',
}: Props) => {
  const onClose = () => setOpen(false);
  const router = useRouter();
  return (
    <BaseDialog
      isOpen={open}
      onClose={onClose}
      title="نیاز به ورود"
      size="lg"
      onClickFooter={() => router.push('/auth/')}
      nameBtnFooter="ورود به حساب کاربری"
    >
      <div className="flex flex-col items-center gap-4 py-2">
        <p className="text-center font-medium text-[#0C0C0C]">{title}</p>
      </div>
    </BaseDialog>
  );
};

export default ModalNeedLoginUser;
