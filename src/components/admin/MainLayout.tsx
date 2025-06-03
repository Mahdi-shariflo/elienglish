'use client';
import Slidebar from '@/components/admin/Slidebar';
import Button from '@/components/common/Button';
import Logo from '@/components/common/Logo';
import { Drawer, DrawerContent, Spinner } from '@heroui/react';
import React, { Suspense, useState } from 'react';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-[#F5F6FA] lg:flex-row lg:gap-5">
      <div className="container_page flex items-center justify-between py-4 lg:hidden">
        <Logo className="!w-10" />
        <Button onClick={() => setOpenDrawer(true)} className="w-fit">
          <svg
            width="25"
            height="20"
            viewBox="0 0 25 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1.75"
              y1="1.84998"
              x2="23.25"
              y2="1.84998"
              stroke="#7D8793"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="1.75"
              y1="10.25"
              x2="23.25"
              y2="10.25"
              stroke="#7D8793"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="1.75"
              y1="18.65"
              x2="23.25"
              y2="18.65"
              stroke="#7D8793"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </div>
      <Slidebar open={open} setOpen={setOpen} className="hidden lg:block" />

      <Drawer title="" isOpen={openDrawer} onClose={() => setOpenDrawer(false)}>
        <DrawerContent>
          {() => (
            <Slidebar open={open} setOpen={setOpen} className="" setOpenDrawer={setOpenDrawer} />
          )}
        </DrawerContent>
      </Drawer>

      <Suspense fallback={<Spinner className="flex items-center justify-center" />}>
        <div
          className={`min-h-screen overflow-hidden rounded-lg bg-white px-4 lg:mb-32 lg:ml-[50px] lg:mt-10 lg:w-[90%] lg:p-4 ${
            open ? 'lg:mr-[90px]' : 'lg:mr-[300px]'
          }`}
        >
          {children}
        </div>
      </Suspense>
    </div>
  );
};
