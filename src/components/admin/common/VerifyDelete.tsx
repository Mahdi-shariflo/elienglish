import BaseDialog from '@/components/common/BaseDialog';
import useDeleteMutation from '@/hooks/common/useDelete';
import useGlobalStore from '@/store/global-store';
import { useEffect } from 'react';

const VerifyDelete = () => {
  const { mutate, isPending, isSuccess, reset } = useDeleteMutation();
  const { verifyDelete, setVerifyDelete } = useGlobalStore();
  const onClose = () => setVerifyDelete({ open: false, title: '', updateCache: '', url: '' });

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess]);
  return (
    <BaseDialog
      isLoadingFooterBtn={isPending}
      size="lg"
      onClose={onClose}
      title={verifyDelete.title}
      isOpen={verifyDelete.open}
      onClickFooter={() => mutate()}
    >
      <p className="px-10 py-5 text-center font-regular text-lg leading-9">
        {' '}
        آیا مطمئن هستید که میخواهید <span className="text-main">{verifyDelete.info}</span> از لیست{' '}
        {verifyDelete.description} حذف کنید؟
      </p>
    </BaseDialog>
  );
};

export default VerifyDelete;
