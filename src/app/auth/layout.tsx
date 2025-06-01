'use client';
import Slider from '@/components/common/Slider';
import { ReactNode, useEffect } from 'react';
import LoginSlider from '@/../public/images/login-slider.png';
import { useSession } from 'next-auth/react';
import { useLoginGoogle } from '@/hooks/auth/useLoginGoogle';
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
  const data: { token: string } = useSession();
  const { mutate } = useLoginGoogle();

  useEffect(() => {
    if (data?.token) {
      mutate({ idToken: data?.token });
    }
  }, [data]);

  return (
    <div className="container_page flex h-screen items-center justify-center">
      <div className="w-full">{children}</div>
      <div className="flex h-full w-full flex-col items-center justify-between overflow-hidden bg-[#F4F6FA]">
        <Slider sliders={sliders} />
      </div>
    </div>
  );
};

export default Layout;
