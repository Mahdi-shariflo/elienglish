'use client';
import { ReactNode, useEffect } from 'react';
import LoginSlider from '@/../public/images/login-slider.png';
import { useSession } from 'next-auth/react';
import { useLoginGoogle } from '@/hooks/auth/useLoginGoogle';
import Loading from '@/components/common/Loading';
import LogoImage from '@/../public/icons/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import Slider from './Slider';
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
  const data: { data: { idToken: string } } = useSession();
  const { mutate, isPending } = useLoginGoogle();
  useEffect(() => {
    if (data?.data?.idToken) {
      mutate({ idToken: data.data.idToken });
    }
  }, [data]);

  return (
    <>
      <header className="fixed !z-[9999] flex !h-[84px] !w-full justify-between bg-white bg-opacity-100 shadow-header dark:!bg-[#0B1524]">
        <div className="container_page flex items-center justify-between">
          <Link href={'/'}>
            <Image className="h-32 w-48" src={LogoImage} alt="" />
          </Link>
          <Link
            className="flex h-[46px] w-fit items-center justify-center rounded-lg border border-[#E5EAEF] !px-4 font-medium text-main dark:border-gray-400 lg:w-[220px]"
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

export default Layout;
