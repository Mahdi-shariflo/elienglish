import Button from './Button';
import BaseDialog from './BaseDialog';
// import { removeSession } from '@/lib/auth/storage'
import { useRouter } from 'next/navigation';
import useGlobalStore from '../../store/global-store';
import { removeSession } from '@/lib/auth/storage';
import { useTransition } from 'react';
import { signOut } from 'next-auth/react';

const Logout = () => {
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  const { logout, setLogout } = useGlobalStore();

  const onLogout = async () => {
    startTransaction(async () => {
      await removeSession();
      await signOut();
      setLogout();
      router.push('/auth/');
    });
  };
  return (
    <>
      <BaseDialog onClose={setLogout} size="lg" isOpen={logout} title="خروج از حساب کاربری">
        <p className="p-6 text-center font-medium text-lg">
          آیا مطمئن هستید که میخواهید از حساب کاربری خود خارج شوید
        </p>
        <div className="flex items-center gap-8">
          <Button onClick={setLogout} className="border">
            انصراف
          </Button>
          <Button isPending={isPending} onClick={onLogout} className="bg-red-500 text-white">
            خروج از حساب
          </Button>
        </div>
      </BaseDialog>
    </>
  );
};

export default Logout;
