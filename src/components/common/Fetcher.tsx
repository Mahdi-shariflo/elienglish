'use client';

import { useLayoutEffect } from 'react';
import { AxiosHeaders } from 'axios';
import { useSession } from '@/lib/auth/useSession';
import { client } from '@/lib/safeClient';

export default function Fetcher({ children }: { children: React.ReactNode }) {
  const session = useSession();

  useLayoutEffect(() => {
    if (!session) return;

    const interceptor = client.interceptors.request.use(async (config) => {
      let headers = new AxiosHeaders({
        ...config.headers,
        Authorization: `Bearer ${session.accessToken}`,
      });

      // if (
      //   isSessionExpired(
      //     session?.accessTokenExpires!
      //   )
      // ) {
      //   const newSession =
      //     await refreshToken()

      //   headers = new AxiosHeaders({
      //     ...config.headers,
      //     Authorization: `Bearer ${newSession.accessToken}`,
      //   })
      //   await saveSession(newSession)
      //   await session.updateSession()
      // }

      config.headers = headers;
      return config;
    });

    return () => {
      client.interceptors.request.eject(interceptor);
    };
  }, [session]);

  // read the access token from the session
  // check if the token is expired
  // if the token is expired
  // refresh the token
  // update the session context
  // set the refreshed token in the Authorization header

  return children;
}
