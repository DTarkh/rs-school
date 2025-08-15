'use server';

import { cookies } from 'next/headers';

export type Theme = 'light' | 'dark';

export async function setThemeCookie(theme: Theme) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'theme',
    value: theme,
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });
}
