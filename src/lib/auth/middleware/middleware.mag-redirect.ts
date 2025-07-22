// middleware.mag-redirect.ts
import { headers } from '@/lib/safeClient';
import { BASEURL } from '@/lib/variable';
import { NextRequest, NextResponse } from 'next/server';
import { pages } from './middleware.constants';

export async function handleMagRedirect(request: NextRequest): Promise<NextResponse | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const isAllowedPage = pages.some((page) => pathname === page || pathname.startsWith(page + '/'));
  if (isAllowedPage) return null;

  if (!pathname.startsWith('/mag/')) {
    const pathParts = pathname.split('/').filter(Boolean);
    const result = await fetch(`${BASEURL}/user/mag/${pathParts[0]}`, {
      headers,
      credentials: 'include',
    });

    if (result.status !== 404) {
      const newUrl = new URL(request.url);
      newUrl.pathname = `/mag/${pathParts[0]}`;
      return NextResponse.redirect(newUrl);
    }
  }

  return null;
}
