import z from 'zod';
const sessionCookieSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
  accessTokenExpires: z.number(),
});

export function parseSessionCookie(cookie: string) {
  try {
    const session = sessionCookieSchema.parse(JSON.parse(cookie));
    return session;
  } catch {
    throw new Error('Failed to parse session cookie');
  }
}

// check if the access token is expired
export function isSessionExpired(accessTokenExpires: number) {
  return Date.now() > accessTokenExpires;
}

type Item = {
  [key: string]: any;
};

export const sortedArray = (data: Item[], field: string) => {
  const secItems = data.filter(
    (item) => typeof item[field] === 'string' && item[field].startsWith('sec')
  );

  const otherItems = data.filter(
    (item) => !(typeof item[field] === 'string' && item[field].startsWith('sec'))
  );

  const sortedSecItems = secItems.sort((a, b) => {
    const valA = parseInt(a[field].replace(/\D/g, '') || '0', 10);
    const valB = parseInt(b[field].replace(/\D/g, '') || '0', 10);
    return valA - valB;
  });

  return [...sortedSecItems, ...otherItems];
};

export const discountCalculation = (special_price: string | number, price: string | number) => {
  const math = Number(special_price) / Number(price);
  const off = (1 - math) * 100;
  return off.toFixed();
};

export function getMediaType(filePath: string): 'video' | 'audio' | 'document' | 'unknown' {
  const extension = filePath.split('.').pop()?.toLowerCase();

  if (!extension) return 'unknown';

  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const videoExts = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
  const audioExts = ['mp3', 'wav', 'ogg', 'm4a', 'aac'];
  const docExts = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];

  if (videoExts.includes(extension)) return 'video';
  if (audioExts.includes(extension)) return 'audio';
  if (docExts.includes(extension)) return 'document';

  return 'unknown';
}
