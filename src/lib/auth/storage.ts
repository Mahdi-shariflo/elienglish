'use server';
import { cookies } from 'next/headers';
import { COOCIES_NAME } from '../variable';

interface Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export const saveSession = async (session: Session) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOCIES_NAME,
    value: JSON.stringify(session),
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    expires: 7 * 24 * 60 * 60,
    path: '/',
  });
};
export const saveTheme = async (session: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'theme',
    value: session,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    expires: 7 * 24 * 60 * 60,
    path: '/',
  });
};

export async function removeSession() {
  (await cookies()).delete(COOCIES_NAME);
}
