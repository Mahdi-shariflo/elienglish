import './globals.css';

import Fetcher from '@/components/common/Fetcher';
import GlobalContextProvider from '@/components/common/GlobalContextProvider';

import { Viewport } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SessionWrapper from '@/lib/auth/SessionWrapperNextAuth';
import { getSession } from '@/lib/auth/session';
import { SessionProvider } from '@/lib/auth/SessionProvider';
import { cookies } from 'next/headers';
export const viewport: Viewport = {
  themeColor: '#6E3DFF',
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
        <SessionProvider session={{ ...session }}>
          <SessionWrapper session={{ ...session, ...sessionUser }}>
            <Fetcher>
              <GlobalContextProvider theme={sessionUser?.theme}>{children}</GlobalContextProvider>
            </Fetcher>
          </SessionWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
