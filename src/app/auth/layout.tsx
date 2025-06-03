'use client';
import Slider from '@/components/common/Slider';
import { ReactNode, useEffect } from 'react';
import LoginSlider from '@/../public/images/login-slider.png';
import { useSession } from 'next-auth/react';
import { useLoginGoogle } from '@/hooks/auth/useLoginGoogle';
import Loading from '@/components/common/Loading';
import LogoImage from '@/../public/icons/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
  children: ReactNode;
};

const sliders = [
  {
    image: LoginSlider,
    title: 'آزمون تعیین سطح ',
    description:
      'آزمون تعیین سطح به ما کمک می‌کند تا سطح دانش زبان شما را به‌درستی ارزیابی کنیم و متناسب با آن، بهترین دوره آموزشی را به شما پیشنهاد دهیم.',
  },
  {
    image: LoginSlider,
    title: 'آزمون تعیین سطح ',
    description:
      'آزمون تعیین سطح به ما کمک می‌کند تا سطح دانش زبان شما را به‌درستی ارزیابی کنیم و متناسب با آن، بهترین دوره آموزشی را به شما پیشنهاد دهیم.',
  },
];
const Layout = ({ children }: Props) => {
  // @ts-expect-error error
  const data: { data: { accessToken: string } } = useSession();
  const { mutate, isPending } = useLoginGoogle();
  useEffect(() => {
    if (data?.data?.accessToken) {
      mutate({ idToken: `Bearer ${data?.data?.accessToken}` });
    }
  }, [data]);

  return (
    <>
      <header className="fixed flex !h-[84px] !w-full justify-between bg-white bg-opacity-100 shadow-header dark:bg-[#0B1524]">
        <div className="container_page flex items-center justify-between">
          <Image src={LogoImage} alt="" />
          <Link
            className="flex h-[48px] w-[220px] items-center justify-center rounded-lg border border-[#E5EAEF] font-medium text-main"
            href={'/'}
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </header>
      <div className="container_page flex h-screen items-center justify-center">
        <div className="w-full">{children}</div>
        <div className="flex h-full w-full flex-col items-center justify-between overflow-hidden bg-[#F4F6FA] dark:bg-[#172334]">
          <Slider sliders={sliders} />
        </div>

        {isPending ? <Loading /> : null}
      </div>
    </>
  );
};

export default Layout;
