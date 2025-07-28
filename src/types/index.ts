import { Product } from './home';

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
  targetId?: string;
  author: {
    firstName: string;
    lastName: string;
  };
  published?: boolean;
  children: Comment[];
  content: string;
  _id: string;
  title: string;
  createdAt: string;
  picture: string[];
  rating: string;
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
      page?: string;
      isLink?: boolean;
      type: string;
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
  _id: string;
  id: string;
  title: string;
  altText: string;
  author: string;
  createdAt: string; // یا اگر با Date کار می‌کنی: Date
  updatedAt: string; // یا Date
  url: string;
  fileType: string;
  width: number;
  height: number;
  __v: number;
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
  published: boolean;
}

export interface FormValuesCreteProduct {
  title: string;
  type: string;
  children?: Product[];
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

export type ThumbnailImage = {
  _id: string;
  url: string;
  title: string;
  altText: string;
  author: string;
  width: number;
  height: number;
  fileType: string;
  createdAt: string; // یا Date
  updatedAt: string; // یا Date
  __v: number;
};

export type Blog = {
  description: string;
  _id: string;
  author: User;
  type: string; // مثلا "video"
  url: string;
  title: string;
  readTime: string;
  keyWords: string[];
  shortDescription: string;
  Published: boolean;
  thumbnailImage: ThumbnailImage;
  coverVideo: ThumbnailImage;
  audio: ThumbnailImage;
  video: ThumbnailImage; // به نظر میاد id ویدئو باشه
  tags: string[]; // آیدی‌های تگ‌ها
  category: { title: string } | string; // آیدی دسته‌بندی
  isChosen: boolean;
  requiredLogin: boolean;
  downloads: any[]; // اگر ساختار دانلودها مشخص است، می‌تونیم دقیق‌تر تایپ کنیم
  createdAt: string; // یا Date
  updatedAt: string; // یا Date
};

export type CommentInfo = {
  _id: string;
  thumbnailImage: ThumbnailImage;
  title: string;
  targetType: 'blog' | 'product';
};

export type Lpa = {
  teacherProfile: string;
  title: string;
  type: 'LEVEL_TEST_WITH_COUNSELING' | '';
  teacherName: string;
  date: string;
  time: string;
  price: number;
  discountPrice: number;
  status: string;
  weekday: string;
};

type BasketItemType = 'COURSE' | 'PRODUCT_DIGITAL' | 'LEVEL' | 'PRODUCT_PHYSICAL';

type MediaType = 'audio' | 'video' | 'document';

export interface BasketItem {
  _id: string;
  userId: string;
  __v: number;
  basketItems: {
    type: BasketItemType;
    itemId: string;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
  type: BasketItemType;
  itemId: string;
  count: number;
  finalPrice: number;
  course: Course;
  product: Product;
  lpas: Product;
}

interface Course {
  isInstallment?: boolean;
  installmentCount?: number;
  installmentPrice?: number;
  _id: string;
  type: 'inPerson' | string;
  status: 'inProgress' | 'completed' | string;
  title: string;
  url: string;
  author: string;
  thumbnailImage: Image;
  tags: string[];
  properties: CourseProperty[];
  demo: CourseDemo[];
  chapters: CourseChapter[];
  category: string;
  categories: string[];
  price: number;
  discountPrice: number;
  keyWords: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  coverVideo: string;
  video: string;
  description: string;
  shortTitle: string;
  discountTime: string;
}

interface Image {
  _id: string;
  url: string;
  title: string;
  altText: string;
  author: string;
  width: number;
  height: number;
  fileType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CourseProperty {
  property: string;
  attribiute: string;
  iconUrl: string;
}

interface CourseDemo {
  title: string;
  order: number;
  episodes: Episode[];
}

interface Episode {
  title: string;
  order: number;
  type: MediaType;
  mediaUrl: string;
}

interface CourseChapter {
  title: string;
  order: number;
  lessons: string;
  duration: string;
  episodes: {
    title: string;
    order: number;
    duration: string;
  }[];
}

export type Notification = {
  title: string;
  description: string;
  createdAt: string;
};

export type Installment = {
  amount: number;
  courseId: string;
  createdAt: string;
  dueDate: string;
  installmentNumber: number;
  isPaid: boolean;
  orderId: string;
  paidAt: null;
  status: 'AWAITING';
  updatedAt: string;
};
