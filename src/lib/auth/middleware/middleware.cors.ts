import { NextRequest, NextResponse } from 'next/server';

export function handleCors(request: NextRequest, response: NextResponse) {
  const targetDomain = 'stage.rozesefid.com';

  const currentHost = request.nextUrl.hostname;

  if (currentHost !== targetDomain) {
    return null;
  }

  const allowedOrigin = 'http://stage.rozesefid.com:3000';
  const origin = request.headers.get('origin');

  if (origin === allowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  if (request.method === 'OPTIONS') {
    if (origin === allowedOrigin) {
      return new NextResponse(null, { status: 204, headers: response.headers });
    }
    return new NextResponse(null, { status: 403 });
  }

  return null;
}
