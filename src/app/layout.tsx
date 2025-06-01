import './globals.css';

import Fetcher from '@/components/common/Fetcher';
import GlobalContextProvider from '@/components/common/GlobalContextProvider';
import { SessionProvider } from '@/lib/auth/SessionProvider';
import { SessionProvider as SessionProviderNextAuth } from 'next-auth/react';

import { Viewport } from 'next';
import { getSession } from 'next-auth/react';
export const viewport: Viewport = {
  themeColor: '#DD338B',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="fa">
      <body>
        <SessionProviderNextAuth session={session}>
          <SessionProvider session={null}>
            <Fetcher>
              <GlobalContextProvider>{children}</GlobalContextProvider>
            </Fetcher>
          </SessionProvider>
        </SessionProviderNextAuth>
      </body>
    </html>
  );
}
