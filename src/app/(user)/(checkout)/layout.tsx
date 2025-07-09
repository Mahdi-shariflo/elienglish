'use client';
import Factor from '@/components/checkout/Factor';
import Steps from '@/components/checkout/Steps';
import BackPrevPage from '@/components/common/BackPrevPage';
import useBasket from '@/hooks/basket/useBasket';
import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  const { baskets } = useBasket();

  // useEffect(() => {
  //     if ((pathname === "/address" || pathname === "/checkout") && baskets?.length === 0) {
  //         router.replace("/");
  //     }
  // }, [pathname, baskets?.length]); // فقط به تغییر طول آرایه حساس باشد

  return (
    <div>
      <BackPrevPage className="-mt-44 mb-24" isLogo title="" />
      <div className="container_page pb-[12rem] lg:py-20">
        <div className="flex flex-col items-start gap-4 lg:mt-24 lg:flex-row lg:gap-[60px] 5xl:gap-[104px]">
          <div className="w-full overflow-hidden">{children}</div>
          {baskets?.length >= 1 && (
            <div className="w-full lg:!w-[416px] lg:min-w-[416px]">
              <Factor />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
