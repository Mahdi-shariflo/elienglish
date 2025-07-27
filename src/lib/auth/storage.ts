'use server';
import { cookies } from 'next/headers';
import { COOCIES_NAME } from '../variable';
import { redirect } from 'next/navigation';

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
export async function saveTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');

  const newTheme = theme?.value === 'dark' ? 'light' : 'dark';

  cookieStore.set('theme', newTheme, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // ۳۰ روز
  });
}

export async function removeSession() {
  (await cookies()).delete(COOCIES_NAME);
}
