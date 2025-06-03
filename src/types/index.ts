export type Form = {
  isLoading?: boolean;
  isFetching?: boolean;
  page?: number;
  total?: number;
  setPage?: () => void;
  type: string;
  placeholder?: string;
  label?: string;
  validationName?: string;
  name?: string;
  price?: boolean;
  className?: string;
  nameLabel?: string;
  nameValue?: string;
  Label?: string;
  options?: { [key: string]: string }[];
  RenderValue?: React.ReactElement;
  typeForm?: string;
  selectionMode?: 'single' | 'multiple' | undefined;
}[];

export type Address = {
  _id?: string;
  address: string;
  lastName: string;
  firstName: string;
  city: string;
  mobileNumber: string;
  postalCode: string;
  province?: string;
  title: string;
  recipientsName?: string;
  provinceLabel?: string;
};
export type Payment = {
  description: string;
  entitle: string;
  logo: string;
  title: string;
};

export type Transport = {
  _id: string;
  city: string;
  shippingMethod: shippingMethod[];
};

export type shippingMethod = {
  isShippingFree: boolean;
  shippingPrice: number;
  shippingTime: string;
  type: string;
  _id: string;
  icon: {
    url: string;
  };
};

export type User = {
  theme?: string;
  viewport?: string;
  shabaNumber?: string;
  accessToken?: string;
  accessTokenExpires?: number;
  refreshToken?: string;
  finger?: string;
  Role?: string;
  discountNotification?: string[];
  firstName?: string;
  id?: string;
  inventoryNotification?: string[];
  lastName?: string;
  likeProducts?: string[];
  mobile?: string;
  permissions?: string[];
  _id?: string;
};

export type Comment = {
  author: {
    firstName: string;
    lastName: string;
  };
  published?: string;
  children: Comment[];
  comment: string;
  _id: string;
  commentTitle: string;
  createdAt: string;
  picture: string[];
  rate: string;
  like: number;
  disLike: number;
};

export type FilterCategory = {
  maxProductPrice?: number;
  minProductPrice?: number;
  description: string;
  properties: {
    title: string;
    displayType: 'color' | 'text' | 'image';
    attributes: {
      image: string;
      color: string;
      _id: string;
      title: string;
      url: string;
    }[];
  }[];
  title: string;
  breadcrumb: {
    url: string;
    title: string;
    id: string;
    order: number;
  }[];
  children: {
    _id: string;
    title: string;
    url: string;
    thumbnailimage: {
      url: string;
    };
    properties: [];
    keyWords: [];
    createdAt: string;
    updatedAt: string;
    depth: 1;
  }[];
} | null;

export type Media = {
  title: string;
  url: string;
  href: string;
  altpic: string;
  filename: string;
  updatedAt: string;
  createdAt: string;
  _id: string;
  author: User;
};

export interface Article {
  _id: string;
  author: Record<string, any>; // اگر ساختار دقیق مشخص است، بهتر است تایپ دقیق‌تر باشد
  url: string;
  description: string;
  title: string;
  keyWords: string[]; // فرض بر این که کلیدواژه‌ها آرایه‌ای از رشته‌ها هستند
  short_des: string;
  isPublic: boolean;
  thumbnailimage: Record<string, any>; // یا یک نوع مشخص‌تر
  tags: string[]; // فرض بر این که تگ‌ها آرایه‌ای از رشته‌ها هستند
  category: Record<string, any>; // اگر ساختار مشخص است، آن را دقیق‌تر مشخص کنید
  createdAt: string; // اگر نیاز به کار با تاریخ باشد، می‌توان از `Date` استفاده کرد
  updatedAt: string;
  canonicalurl: string;
  metaDescription: string;
  metaTitle: string;
  redirecturl: string;
  redirecturltype: number; // معمولا 301 یا 302
  robots: string;
  breadcrumb: { title: string; url: string; order: number; id: string }[];
}

interface ImageType {
  _id: string;
  url?: string;
}

export interface TagType {
  _id: string;
  title?: string;
  url: string;
  link: string;
}

export interface FormValuesCreteProduct {
  title: string;
  shortTitle: string;
  canonicalurl: string;
  url: string;
  enTitle: string;
  description: string;
  thumbnailImage?: ImageType;
  video?: any;
  gtin: string;
  galleryImage: ImageType[];
  categories: string[];
  tags: TagType[];
  properties: any[];
  variables: any[];
  category: string[];
  price: string;
  discountPrice: string;
  discountTime: string;
  skuId: string;
  count: number;
  freedelivery: boolean;
  towWorkingDays: boolean;
  towBuyThree: boolean;
  published: string;
  rozeBox: string;
  minCart: string;
  singleSale: boolean;
  metaTitle: string;
  metaDescription: string;
  keyWords: string;
  variablesAttribiutes: any[];
  robots: string;
  redirecturltype: any;
  redirecturl: string;
}
