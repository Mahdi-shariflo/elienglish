import Sidebar from '@/components/profile/Sidebar';
import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="-mt-40 h-full dark:bg-dark lg:mt-10 lg:min-h-screen lg:bg-white">
      <div className="lg:container_page flex-col items-start lg:flex lg:flex-row lg:gap-[20px] lg:!pb-20">
        <div className="hidden w-full lg:block lg:w-[296px]">
          {/* <ProfileInformation /> */}
          <Sidebar />
        </div>

        <div className="mb-32 min-h-[50vh] flex-1 overflow-hidden lg:mb-0 lg:mt-0 lg:min-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
