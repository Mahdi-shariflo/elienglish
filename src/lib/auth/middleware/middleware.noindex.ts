// middleware.noindex.ts
import { NextRequest, NextResponse } from 'next/server';
import { noIndexPaths } from './middleware.constants';

export function handleNoIndex(request: NextRequest, response: NextResponse) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const searchParams = url.searchParams.toString();

  // no index pathname/page/:id => id is number
  if (pathname.match(/\/page\/\d+\/?$/)) {
    response.headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
  }

  // noindex special path and all query params
  if (noIndexPaths.some((path) => pathname.startsWith(path)) || searchParams) {
    response.headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
  }
}
