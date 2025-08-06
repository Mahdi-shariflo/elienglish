import axios, { AxiosRequestConfig } from 'axios';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { parseSessionCookie } from './utils';
import { BASEURL, COOCIES_NAME } from './variable';
import CryptoJS from 'crypto-js';

const secret =
  '6c0a9fc9f157c7ca2c70becb24a7e7a9b9e143eee5b29d6aee075639fba1c754ff0857c03ee1d6d7a241699e9ee02fce4620bdaeedb074d585318730580d6ae0';

// تولید signature با HMAC-SHA256 از یک پیام خاص (در اینجا رشته خالی)
const signature = CryptoJS.HmacSHA256('', secret).toString(CryptoJS.enc.Hex);
function cleanUrl(url: string) {
  return url.replace(/\/+$/, ''); // حذف تمام اسلش‌های انتهایی
}

const getXFFHeader = async () => {
  const { headers } = await import('next/headers');
  const forwardedFor = (await headers()).get('x-forwarded-for');
  return forwardedFor;
};

export const headers = {
  'Content-Type': 'application/json',
  'x-signature': signature,
};

export const client = axios.create({
  baseURL: BASEURL,
  headers,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status || error.status;
    console.log(error?.config?.url, 'errrrr');
    if (status === 410) {
      return notFound();
    }
    if (status === 404) {
      return notFound();
    }
    if ((typeof window !== 'undefined' && status === 401) || status === 401) {
      // removeSession();
      location.href === '/auth';
    }
    if (((typeof window !== 'undefined') !== undefined && status === 429) || status === 429) {
      redirect('/too-many-request');
    } else if (((typeof window !== 'undefined') !== undefined) !== undefined && status === 429) {
      location.href = '/too-many-request';
    }

    if (error?.config?.url && error?.config?.url.startsWith('/course')) {
      return error;
    }
    return Promise.reject(error);
  }
);

export async function safeRequest(config: AxiosRequestConfig) {
  if (typeof window === 'undefined') {
    const { headers } = await import('next/headers');
    const h = await headers();
    const userAgent = h.get('user-agent');
    const xff = await getXFFHeader();
    const { cookies } = await import('next/headers');
    if (xff) {
      config.headers = {
        ...config.headers,
        'X-Forwarded-For': xff,
        'user-agent': userAgent,
      };
    }

    const rawSession = (await cookies()).get(COOCIES_NAME)?.value;

    if (rawSession) {
      const session = parseSessionCookie(rawSession);
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${session.accessToken}`,
      };
    }
  }

  // 🧼 پاک کردن / انتهایی از آدرس
  if (config.url) {
    config.url = cleanUrl(config.url);
  }

  return client.request(config);
}

const isServer = typeof window === 'undefined';
export const request = isServer ? React.cache(safeRequest) : safeRequest;
