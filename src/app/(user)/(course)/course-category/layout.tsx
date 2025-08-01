'use client';
import Loading from '@/components/common/Loading';
import useGlobalStore from '@/store/global-store';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const { isPendingCategory } = useGlobalStore();
  return (
    <>
      {isPendingCategory && <Loading />} {children}
    </>
  );
};

export default Layout;
