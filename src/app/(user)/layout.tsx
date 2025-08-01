import Footer from '@/components/common/Footer';
import Header from '@/components/common/header/Header';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header categories="" />
      <div className="pt-[10rem] lg:pt-52">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
