// "use server";

// import { cookies } from "next/headers";
// import { parseSessionCookie } from "./utils";
// import { BASEURL } from "./variable";
// import { redirect } from "next/navigation";
// import { removeSession } from "./auth/storage";

// export const safeRequest = async (config: any) => {
//   const cookieStore = await cookies();

//   const rawSession = await cookieStore.get(COOCIES_NAME)?.value;
//   const session = rawSession ? parseSessionCookie(rawSession) : null;
//   const response = await fetch(`${BASEURL}${decodeURIComponent(config.url)}`, {
//     method: config.method || "GET", // یا هر متد دلخواهی که بخوای
//     headers: {
//       "Content-Type": "application/json",
//       loginKey: btoa(`asdl;l;,/.p,SDL:SADCw34352GR^(*@&#)*()@(F)`),
//       ...config.headers, // این باعث میشه که اگر هدر خاصی اضافه کرده باشی، لحاظ بشه
//       ...(session?.accessToken
//         ? { Authorization: `Bearer ${session.accessToken}` }
//         : {}),
//     },
//     body: config?.data ? JSON.stringify(config.data) : undefined,
//     cache: "no-store", // برای جلوگیری از کش شدن درخواست‌ها
//   });

//   const data = await response.json();
//   if (response.status === 401) {

//     await removeSession()
//     return redirect(`/auth`);
//   }
//   if (!response.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }
//   return { data: data };
// };

import axios, { AxiosRequestConfig } from 'axios';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { removeSession } from './auth/storage';
import { parseSessionCookie } from './utils';
import { BASEURL, COOCIES_NAME } from './variable';
import CryptoJS from 'crypto-js';

const secret =
  '6c0a9fc9f157c7ca2c70becb24a7e7a9b9e143eee5b29d6aee075639fba1c754ff0857c03ee1d6d7a241699e9ee02fce4620bdaeedb074d585318730580d6ae0';

// تولید signature با HMAC-SHA256 از یک پیام خاص (در اینجا رشته خالی)
const signature = CryptoJS.HmacSHA256('', secret).toString(CryptoJS.enc.Hex);

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
  return client.request(config);
}

const isServer = typeof window === 'undefined';
export const request = isServer ? React.cache(safeRequest) : safeRequest;
