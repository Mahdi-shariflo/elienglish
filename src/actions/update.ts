'use server';

import { revalidateTag } from 'next/cache';

export const updateCache = async (slug: string) => {
  await revalidateTag(slug);
};
