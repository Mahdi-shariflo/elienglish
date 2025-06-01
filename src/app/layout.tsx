import './globals.css';

import Fetcher from '@/components/common/Fetcher';
import GlobalContextProvider from '@/components/common/GlobalContextProvider';
import { SessionProvider } from '@/lib/auth/SessionProvider';

import { Viewport } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SessionWrapper from '@/lib/auth/SessionWrapperNextAuth';
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

  return (
    <html lang="fa">
      <body>
        <SessionWrapper session={session}>
          <SessionProvider session={null}>
            <Fetcher>
              <GlobalContextProvider>{children}</GlobalContextProvider>
            </Fetcher>
          </SessionProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
