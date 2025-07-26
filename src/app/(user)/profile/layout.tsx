import Sidebar from '@/components/profile/Sidebar';
import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="h-full min-h-screen dark:bg-dark lg:mt-10 lg:bg-white lg:pt-32">
      <div className="lg:container_page flex-col items-start lg:flex lg:flex-row lg:gap-[20px] lg:!pb-20">
        <div className="hidden w-full lg:block lg:w-[296px]">
          {/* <ProfileInformation /> */}
          <Sidebar />
        </div>

        <div className="mb-32 min-h-[80vh] flex-1 overflow-hidden lg:mb-0 lg:mt-0">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
