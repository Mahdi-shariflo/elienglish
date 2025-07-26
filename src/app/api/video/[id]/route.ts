// app/api/video/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id, 'jhdfhfjfhdjhfjdhfdjh');
  const range = req.headers.get('range') || '';
  const videoUrl = `${id}`;

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
