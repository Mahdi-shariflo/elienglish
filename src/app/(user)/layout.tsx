import Header from '@/components/common/header/Header';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header categories="" />
      <div className="container_page mt-44">{children}</div>
    </div>
  );
};

export default Layout;
