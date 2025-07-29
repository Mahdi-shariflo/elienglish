import 'server-only';

import { User } from '@/store/types';
import { cookies } from 'next/headers';
import { headers } from '../safeClient';
import { BASEURL, COOCIES_NAME } from '../variable';

export async function refreshTokenSet(refreshToken: string) {
  const res = await fetch(`${BASEURL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!res.ok) {
    console.error(await res.json(), 'ننشد که نشد');
    throw new Error('Failed to refresh token');
  }

  const data = await res.json();

  return {
    accessToken: data?.data?.accessToken,
    refreshToken: data?.data?.refreshToken,
    accessTokenExpires: data?.data?.tokenExpiresIn,
  };
}

export async function getSession(): Promise<User | null> {
  const rawSession = (await cookies()).get(COOCIES_NAME)?.value;
  const finger = (await cookies()).get('finger')?.value as string;
  const viewport = (await cookies()).get('viewport')?.value as string;
  const theme = (await cookies()).get('theme')?.value as string;
  if (!rawSession) {
    return {
      finger,
      viewport,
      theme,
    };
  }

  const session = JSON.parse(rawSession);

  const { accessToken, accessTokenExpires, refreshToken } = session;
  if (accessToken) {
    const res = await fetch(`${BASEURL}/auth/me`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return {
        finger,
        theme,
      };
    }

    const user = await res.json();

    return {
      finger,
      theme,
      viewport,
      refreshToken,
      ...user.data,
      accessToken,
      accessTokenExpires,
    };
  }
  return {
    finger,
    viewport,
    theme,
  };
}
