'use client';

import { useLayoutEffect } from 'react';
import { AxiosHeaders } from 'axios';
import { client } from '@/lib/safeClient';
import { useSession } from 'next-auth/react';

export default function Fetcher({ children }: { children: React.ReactNode }) {
  const session = useSession();

  useLayoutEffect(() => {
    if (!session?.data) return;
    console.log(session, 'fhvsdfgshgfsjyg');
    const interceptor = client.interceptors.request.use(async (config) => {
      let headers = new AxiosHeaders({
        ...config.headers,
        // @ts-expect-error error
        Authorization: `Bearer ${session?.data?.accessToken}`,
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
