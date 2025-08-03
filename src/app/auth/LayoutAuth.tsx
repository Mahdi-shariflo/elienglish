'use client';
import { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useLoginGoogle } from '@/hooks/auth/useLoginGoogle';
import Loading from '@/components/common/Loading';
import Link from 'next/link';
import Slider from './Slider';
import { useGetSliderLogin } from '@/hooks/auth/useGetSliderLogin';
import Logo from '@/components/common/Logo';
import { useSession as useSessionAuth } from '@/lib/auth/useSession';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

const LayoutAuth = ({ children }: Props) => {
  const router = useRouter();
  const session = useSessionAuth();
  const { data: dataSlider } = useGetSliderLogin();
  // @ts-expect-error error
  const data: { data: { idToken: string } } = useSession();
  const { mutate, isPending } = useLoginGoogle();
  useEffect(() => {
    if (data?.data?.idToken) {
      mutate({ idToken: data.data.idToken });
    }
  }, [data]);
  const sliders = dataSlider?.data.data;

  useEffect(() => {
    if (session?.accessToken) {
      router.push('/');
    }
  }, [session]);

  return (
    <>
      <header className="fixed !z-50 flex !h-[84px] !w-full justify-between bg-white bg-opacity-100 shadow-header dark:!bg-[#0B1524]">
        <div className="container_page flex items-center justify-between">
          <Logo className="lg:w-[160px]" />
          <Link
            className="flex h-[40px] w-fit items-center justify-center rounded-lg border border-[#E5EAEF] !px-4 font-medium text-[14px] text-main dark:border-gray-400 lg:h-[46px] lg:w-[220px]"
            href={'/'}
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </header>
      <div className="bg-[#ECEFF4] dark:!bg-[#0B1524] lg:min-h-screen lg:bg-white">
        <div className="container_page !relative !z-[1] flex h-screen flex-col-reverse items-center justify-center lg:flex-row">
          <div className="w-full">{children}</div>
          <div className="hidden h-full w-full flex-col items-center justify-between overflow-hidden bg-[#F4F6FA] dark:bg-[#172334] lg:flex">
            <Slider sliders={sliders} />
          </div>

          {isPending ? <Loading /> : null}
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
