// app/api/download/route.ts (در Next.js 13+)
import { NextRequest } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const fileUrl = id; // یا از req.url بخون
  const response = await fetch(fileUrl);

  const headers = new Headers(response.headers);
  headers.set('Content-Disposition', 'attachment; filename="file.pdf"');

  const body = await response.blob();

  return new Response(body, {
    status: response.status,
    headers,
  });
}
