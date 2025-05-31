import Slider from '@/components/common/Slider';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import LoginSlider from '@/../public/images/login-slider.png';
type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'ورود / ثبت‌نام',
  robots: 'noindex, nofollow',
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
  return (
    <div className="container_page flex h-screen items-center justify-center">
      <div className="w-full">{children}</div>
      <div className="relative z-20 hidden h-full lg:block">
        {/* <Image className="absolute left-7 top-0" src={Logo} alt="" /> */}
        <div className="flex h-full w-[672px] flex-col items-center justify-between overflow-hidden bg-[#F4F6FA]">
          <Slider sliders={sliders} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
