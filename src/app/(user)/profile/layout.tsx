import Sidebar from '@/components/profile/Sidebar';
import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="h-full min-h-screen dark:bg-dark lg:bg-white lg:pt-32">
      <div className="lg:container_page flex-col items-start lg:flex lg:flex-row lg:gap-[20px] lg:!pb-20">
        <div className="hidden w-full pt-5 lg:block lg:w-[296px]">
          {/* <ProfileInformation /> */}
          <Sidebar />
        </div>

        <div className="-mt-28 min-h-[80vh] flex-1 overflow-hidden lg:mt-0">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
