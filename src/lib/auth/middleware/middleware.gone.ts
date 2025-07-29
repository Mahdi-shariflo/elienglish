// middleware.gone.ts
import { headers } from '@/lib/safeClient';
import { BASEURL } from '@/lib/variable';
import { NextRequest, NextResponse } from 'next/server';

export async function handleGonePaths(request: NextRequest): Promise<NextResponse | null> {
  const pathname = new URL(request.url).pathname;
  const res = await fetch(`${BASEURL}/blog/detail${decodeURIComponent(pathname)}`, {
    headers,
    credentials: 'include',
  });
  const json = await res.json();
  if (json?.data?.blog?.redirectType === 410) {
    return new NextResponse('این صفحه توسط شرکت حذف شده است', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }
  return NextResponse.next();
}
