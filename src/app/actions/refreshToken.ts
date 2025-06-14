'use server';

import { refreshTokenSet } from '@/lib/auth/session';
import { saveSession } from '@/lib/auth/storage';
import { parseSessionCookie } from '@/lib/utils';
import { COOCIES_NAME } from '@/lib/variable';
import { cookies } from 'next/headers';

// handle race conditions by using a shared cache
// you can use memoizee helper to cache the refresh token function
// use saved refreshToken as the cache key
/*
  normalizer: function (args) {
    return JSON.stringify(args[0]);
  },
*/

let lastRefresh: {
  refreshToken: string;
  promise: Promise<any>;
  timestamp: number;
} | null = null;

export const refreshToken = async () => {
  const rawSession = (await cookies()).get(COOCIES_NAME)?.value;
  if (!rawSession) {
    throw new Error('Session cookie not found');
  }

  const { refreshToken, accessToken } = parseSessionCookie(rawSession);
  if (lastRefresh && lastRefresh.refreshToken === refreshToken) {
    if (Date.now() - lastRefresh.timestamp < 10000) {
      return lastRefresh.promise;
    }
  }

  try {
    const promise = refreshTokenSet(accessToken, refreshToken);
    lastRefresh = {
      refreshToken,
      promise,
      timestamp: Date.now(),
    };

    const newSession = await promise;
    await saveSession(newSession);
    lastRefresh = null;
    return newSession;
  } catch (error) {
    lastRefresh = null;
    throw error;
  }
};
