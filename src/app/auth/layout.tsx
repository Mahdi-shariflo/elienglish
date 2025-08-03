import { Metadata } from 'next';
import React, { ReactNode } from 'react';
import LayoutAuth from './LayoutAuth';
export const metadata: Metadata = {
  title: 'ورود / ثبت‌نام',
  description: 'ورود / ثبت‌نام',
};
const Layout = ({ children }: { children: ReactNode }) => {
  return <LayoutAuth>{children}</LayoutAuth>;
};

export default Layout;
