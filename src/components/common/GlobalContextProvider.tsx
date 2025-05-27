'use client';
import { HeroUIProvider } from '@heroui/react';
import { ReactNode } from 'react';
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
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        {/* <SwipeBack/> */}
        {children}
        <Logout />
        <VerifyDelete />
        <CommingSoon />
      </QueryClientProvider>
      <ToastProvider placement="top-center" />
    </HeroUIProvider>
  );
}

export default GlobalContextProvider;
