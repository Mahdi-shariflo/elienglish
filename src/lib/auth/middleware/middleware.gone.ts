// middleware.gone.ts
import { headers } from '@/lib/safeClient';
import { BASEURL } from '@/lib/variable';
import { NextRequest, NextResponse } from 'next/server';
import { pages } from './middleware.constants';

export async function handleGonePaths(request: NextRequest): Promise<NextResponse | null> {
  const pathname = new URL(request.url).pathname;
  // اگه مسیر جزو مسیرهای استاتیک بود، ادامه بده (هیچ fetch ای نزن)
  const isAllowedPage = pages.some((page) => pathname === page || pathname.startsWith(page + '/'));
  if (isAllowedPage) return null;

  const res = await fetch(`${BASEURL}/blog/detail${decodeURIComponent(pathname)}`, {
    headers,
    credentials: 'include',
  });

  const json = await res.json();

  if (json?.data?.blog?.redirectType === 410) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
        <head>
          <meta charset="UTF-8" />
          <title>صفحه حذف شده</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #f8f8f8;
              font-family: sans-serif;
              color: #444;
            }
            .message {
              font-size: 1.5rem;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="message">این صفحه توسط شرکت حذف شده است</div>
        </body>
      </html>
    `,
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  }

  // در غیر این صورت ادامه بده
  return NextResponse.next();
}
