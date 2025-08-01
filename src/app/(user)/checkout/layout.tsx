'use client';
import Factor from '@/components/checkout/Factor';
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
    <div className="-mt-[10rem] lg:mt-0">
      <BackPrevPage isLogo title="" />
      <div className="container_page pb-[12rem]">
        <div className="flex flex-col items-start gap-4 lg:mt-24 lg:flex-row lg:gap-[60px]">
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
