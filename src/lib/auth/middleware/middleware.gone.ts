// middleware.gone.ts
import { headers } from '@/lib/safeClient';
import { BASEURL } from '@/lib/variable';
import { NextRequest, NextResponse } from 'next/server';

export async function handleGonePaths(request: NextRequest): Promise<NextResponse | null> {
  const pathname = new URL(request.url).pathname;

  // فقط روی مسیرهای blog اعمال بشه
  if (!pathname.startsWith('/blog')) return NextResponse.next();

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
