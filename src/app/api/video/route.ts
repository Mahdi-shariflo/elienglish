// app/api/video/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const range = req.headers.get('range') || '';
  const videoUrl = 'https://eli-backend-main.liara.run/upload/2025/07/1753187632504.mp4';

  const response = await fetch(videoUrl, {
    headers: {
      Range: range,
    },
  });

  const headers = new Headers();
  response.headers.forEach((value, key) => {
    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
