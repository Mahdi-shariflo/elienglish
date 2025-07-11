import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="bg-[#F7F7F7] dark:bg-dark lg:pb-10">{children}</div>;
};

export default Layout;
