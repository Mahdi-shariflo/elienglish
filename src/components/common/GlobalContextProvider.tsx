'use client';
import { HeroUIProvider } from '@heroui/react';
import { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Logout from './Logout';
import CommingSoon from './CommingSoon';
import { ToastProvider } from '@heroui/toast';
import VerifyDelete from './VerifyDelete';

type Props = {
  children: ReactNode;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retryDelay: 1000,
      retry: (count, error: any) => {
        if ([404, 403].includes(error?.response?.status)) {
          return false; // درخواست متوقف شود
        }
        return count < 1; // فقط یکبار تلاش مجدد انجام شود
      },
    },
  },
});

function GlobalContextProvider({ children }: Props) {
  function getDefaultTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark');
    } else {
      // هیچ تمی ذخیره نشده، پس تم سیستم رو چک کن
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }

  useEffect(() => {
    getDefaultTheme();
  }, []);

  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        {/* <SwipeBack/> */}
        <div className="min-h-screen dark:bg-[#0B1524]">{children}</div>
        <Logout />
        <VerifyDelete />
        <CommingSoon />
      </QueryClientProvider>
      <ToastProvider placement="top-center" />
    </HeroUIProvider>
  );
}

export default GlobalContextProvider;
