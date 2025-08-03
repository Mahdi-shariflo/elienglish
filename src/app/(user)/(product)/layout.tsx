import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="!-mt-40 lg:!mt-0">{children}</div>;
};

export default Layout;
