import { Media } from '.';

export type Order = {
  createdAt: string;
  orderNumber: number;
  totalAmount: number;
  productPhysicalItems: {
    thumbnailImage: Media;
    status:
      | 'AWAITING'
      | 'CANCELED'
      | 'DELIVERY'
      | 'DOING'
      | 'POSTED'
      | 'REVIEW'
      | 'PENDING'
      | 'AVAILABLE';
    products: {
      count: number;
      discountPrice: number;
      parent: string;
      price: number;
      productId: string;
      suggestedDiscount: number;
      thumbnailImage: Media;
      title: string;
      type: 'physical' | 'digital' | string; // اگر فقط physical هست می‌تونی فقط همونو بذاری
      url: string;
      urlVar: string;
    }[];
    orderAddress: {
      firstName: string;
      lastName: string;
      mobileNumber: string;
      address: string;
      city: string;
      postalCode: string;
      province: string; // به انگلیسی مثل: East-Azerbaijan
      provinceCode: string; // به اختصار مثل: EAZ
      provinceLabel: string; // به فارسی مثل: آذربایجان شرقی
    };
  };
  courseItems: {
    courseId: string;
    status: 'PAID' | 'CANCELED' | 'AWAITING';
    count: number;
    discountPrice: number;
    parent: string;
    price: number;
    productId: string;
    suggestedDiscount: number;
    thumbnailImage: Media;
    title: string;
    type: 'physical' | 'digital' | string; // اگر فقط physical هست می‌تونی فقط همونو بذاری
    url: string;
    urlVar: string;
    orderAddress: {
      firstName: string;
      lastName: string;
      mobileNumber: string;
      address: string;
      city: string;
      postalCode: string;
      province: string; // به انگلیسی مثل: East-Azerbaijan
      provinceCode: string; // به اختصار مثل: EAZ
      provinceLabel: string; // به فارسی مثل: آذربایجان شرقی
    };
  };
  productDigitalItems: {
    thumbnailImage: Media;
    productId: string;
    status:
      | 'AWAITING'
      | 'CANCELED'
      | 'DELIVERY'
      | 'DOING'
      | 'POSTED'
      | 'REVIEW'
      | 'PENDING'
      | 'AVAILABLE';
    products: {
      count: number;
      discountPrice: number;
      parent: string;
      price: number;
      productId: string;
      suggestedDiscount: number;
      thumbnailImage: Media;
      title: string;
      type: 'physical' | 'digital' | string; // اگر فقط physical هست می‌تونی فقط همونو بذاری
      url: string;
      urlVar: string;
    }[];
    orderAddress: {
      firstName: string;
      lastName: string;
      mobileNumber: string;
      address: string;
      city: string;
      postalCode: string;
      province: string; // به انگلیسی مثل: East-Azerbaijan
      provinceCode: string; // به اختصار مثل: EAZ
      provinceLabel: string; // به فارسی مثل: آذربایجان شرقی
    };
  };
  levelItems: {
    thumbnailImage: Media;
    productId: string;
    date: string; // ISO string format
    discountPrice: number;
    lpaId: string;
    lpaTotalAmount: number;
    price: number;
    status: 'SUBMITTED' | 'CANCELLED' | 'COMPLETED' | string; // یا فقط "SUBMITTED" اگر تنها همینه
    teacherName: string;
    teacherProfile: string; // URL
    time: string; // فرمت زمان مثلاً "18:30"
    title: string;
    typeLevel: 'LEVEL_TEST' | 'REGULAR' | string; // بسته به نوع جلسه
    weekday:
      | 'SATURDAY'
      | 'SUNDAY'
      | 'MONDAY'
      | 'TUESDAY'
      | 'WEDNESDAY'
      | 'THURSDAY'
      | 'FRIDAY'
      | string;
  };

  _id: string;
};

export type STATUSCOUNTS = {
  AWAITING: number;
  CANCELED: number;
  DELIVERY: number;
  DOING: number;
  POSTED: number;
  AVAILABLE: number;
  PENDING: number;
  REVIEW: number;
  PAID: number;
};

export type Ticket = {
  _id: string;
  title: string;
  content: string;
  section: string;
  submitDate: string;
  attachmentUrl: string;
  ticketNumber: number;
  status: 'REVIEW';
  fullName: string;
  createdAt: string;
  messages: Ticket[];
};
