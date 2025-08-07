'use client';

import { Product } from '@/store/types/home';
import { COOCIES_NAME } from './variable';

export const cookieName = COOCIES_NAME;

export function addSpacesToCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export const addCommas = (num: number | string) => {
  if (num.toString() === '0') {
    return '0';
  } else {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

export const removeNumNumeric = (num: number | string | boolean) => {
  // Check if num is truthy and not explicitly zero
  if (num !== undefined && num !== null) {
    // Convert num to string and check for "0"
    const strNum = num.toString();
    if (strNum === '0') {
      return ' ';
    } else {
      // Remove non-numeric characters
      return strNum.replace(/[^0-9]/g, '');
    }
  } else {
    return ' ';
  }
};

type AnyObject = { [key: string]: any };

export function removeEmptyFields<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(
        ([_, value]) =>
          value !== '' &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
      )
      .map(([key, value]) => {
        if (typeof value === 'string') {
          // تبدیل اعداد فارسی/عربی به انگلیسی
          value = toEnglishDigits(value);
          // اگر مقدار فقط عدد باشد، آن را به عدد تبدیل کنید
          if (/^\d+$/.test(value)) {
            return [key, value];
          }
        }
        return [key, value];
      })
  ) as Partial<T>;
}

export const findHasAccess = (permissions: string[], name: string) => {
  const isAccess = permissions?.find((permission) => permission === name);
  return isAccess ? true : false;
};

export function parseRobotsString(robotsString: string) {
  const robotsArray = robotsString.split(', ');
  const robotsObject = {};

  robotsArray.forEach((item: any) => {
    const [key, value] = item.split(':');
    if (value === undefined) {
      // @ts-ignore
      robotsObject[key] = true;
    } else {
      // @ts-ignore
      robotsObject[key] = value;
    }
  });

  return robotsObject;
}

export function createURL(inputText: string, baseUrl?: string): string {
  if (!inputText) return '';

  const trimmedText = inputText.trim();

  // حذف تمام کاراکترهای غیر از حروف، اعداد، و فاصله‌ها (فارسی و انگلیسی)
  const cleanedText = trimmedText.replace(/[^a-zA-Z0-9آ-ی\s]/g, '');

  // تبدیل فاصله‌ها به خط تیره
  const words = cleanedText.split(/\s+/);
  const urlPath = words.join('-');

  return baseUrl ? `${baseUrl}${urlPath}` : urlPath;
}

export function toEnglishDigits(str: string): string {
  return str.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
}
export function cleanUrl(url: string) {
  return url.replace(/\/+$/, ''); // حذف تمام اسلش‌های انتهایی
}

export function generateRandomString(
  length = 8,
  includeNumbers = true,
  includeBigLetters = true,
  includeSmallLetters = false
) {
  const characters = [];

  if (includeNumbers) {
    for (let i = 0; i < 10; i++) {
      characters.push(String.fromCharCode(i + 48)); // Add digits (0-9)
    }
  }

  if (includeBigLetters) {
    for (let i = 0; i < 26; i++) {
      characters.push(String.fromCharCode(i + 65)); // Add uppercase letters (A-Z)
    }
  }

  if (includeSmallLetters) {
    for (let i = 0; i < 26; i++) {
      characters.push(String.fromCharCode(i + 97)); // Add lowercase letters (a-z)
    }
  }

  // Generate random string of desired length
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * charactersLength)];
  }

  return result;
}

export const sortBreadcumb = (breadcrumb: { order: number; title: string }[]) => {
  return Array.isArray(breadcrumb)
    ? breadcrumb.sort((a, b) => {
        if (a.order === null) return -1;
        if (b.order === null) return 1;
        return a.order - b.order;
      })
    : [];
};

export const filterLowProduct = (children: Product[]) => {
  const findProductCount = children.filter((p) => p.count !== 0);
  if (findProductCount.length === 0) {
    return children[0];
  } else {
    return findProductCount.reduce((prev, curr) => (curr.price < prev.price ? curr : prev), {
      price: Infinity,
    });
  }
};

interface Attribute {
  _id: string;
  title: string;
  property: string;
  url: string;
  metaTitle: string;
  metaDescription: string;
  keyWords: string[];
  createdAt: string;
  updatedAt: string;
}

interface Property {
  _id: string;
  title: string;
  url: string;
  archive: boolean;
  displayType: string;
}

interface FinalItem {
  _id: string;
  title: string;
  url: string;
  archive: boolean;
  displayType: string;
  attribiute: (Attribute & { description: string; __v: number })[];
  isVarible: boolean;
  mainProperty: boolean;
  isVariable: boolean;
}

export function mergePropertiesAndAttributes(properties: Property[]): FinalItem[] {
  return properties.map((property) => {
    return {
      // @ts-expect-error error
      attribiute: property.attribiuteDetails,
      // @ts-expect-error error
      ...property.propertyDetails,
      // @ts-expect-error error
      mainProperty: property.mainProperty,
      // @ts-expect-error error
      isVariable: property.isVariable,
    };
  });
}

export const EnumName = (label: string) => {
  const options = [
    { label: 'PENDING', value: 'در انتظار' },
    { label: 'AVAILABLE', value: 'در دسترسی' },
    { label: 'CANCELED', value: 'لغو شده' },
    { label: 'EXPIRED', value: 'منقضی شده' },
    { label: 'SUBMITTED', value: 'ثبت شده' },
    { label: 'COMPLETED', value: 'تکمیل شده' },
    { label: 'PAID', value: 'پرداخت شده' },
    { label: 'ACCESS_REVOKED', value: 'قطع دسترسی' },
    { label: 'PAID', value: 'پرداخت شده' },
    { label: 'AWAITING', value: 'در انتظار' },
    { label: 'REVIEW', value: 'در حال بررسی' },
    { label: 'DELIVERY', value: 'تحویل به پست' },
    { label: 'POSTED', value: 'پست شده' },
  ];

  const found = options.find((item) => item.label === label);
  return found ? found.value : label; // اگر پیدا نشد، خودش رو برمی‌گردونه
};
