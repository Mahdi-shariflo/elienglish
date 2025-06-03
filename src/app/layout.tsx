import './globals.css';

import Fetcher from '@/components/common/Fetcher';
import GlobalContextProvider from '@/components/common/GlobalContextProvider';

import { Viewport } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SessionWrapper from '@/lib/auth/SessionWrapperNextAuth';
import { getSession } from '@/lib/auth/session';
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
  const session = await getServerSession(authOptions);
  const sessionUser = await getSession();

  return (
    <html lang="fa">
      <body className={`${sessionUser?.theme === 'dark' ? 'dark' : ''}`}>
        <SessionWrapper session={{ ...session, ...sessionUser }}>
          <Fetcher>
            <GlobalContextProvider theme={sessionUser?.theme}>{children}</GlobalContextProvider>
          </Fetcher>
        </SessionWrapper>
      </body>
    </html>
  );
}
