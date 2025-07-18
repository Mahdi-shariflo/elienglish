import { Address, Blog, ThumbnailImage, User } from '.';

export type Home = {
  section1: { title: string };
};
export type Slider = {
  _id: string;
  title: string;
  url: string;
  link: string;
  category: string;
  href: string;
  published: boolean;
  author: string;
};

export type Category = {
  thumbnailImage: ThumbnailImage;
  description?: string;
  _id: string;
  children?: Category[];
  thumbnailimage?: {
    altpic: string;

    url: string;

    _id: string;
  };

  title?: string;
  url?: string;
};

export type Product = {
  lessons: string;
  parent: string;
  type: 'digital' | 'physical';
  duration: string;
  teacherProfile: string;
  episodes: { title: string; duration: string; order: number }[];
  order: number;
  tags: {
    title: string;
    type: string;
    url: string;
  }[];
  gtin: number;
  urlVar?: string;
  productId?: string;
  amount: number;
  breadcrumb: [];
  metaDescription: string;
  metaTitle: string;
  createdAt?: string;
  orderDiscountPrice: string;
  productCount: number;
  productDiscountPrice: number;
  productPrice: number;
  categories: { title: string }[];
  category: {
    metaTitle: string;
    _id: string;
    title: string;
    url: string;
  };
  nid: string;
  wooid: string;
  skuId: string;
  description: string;
  updatedAt?: string;
  properties: {
    attribiute: string[];
    main: boolean;
    property: string;
    _id: string;
  }[];

  enTitle: string;
  video: {
    url: string;
  };
  galleryImage: {
    url: string;
    title: string;
    thumbnailImage: {
      url: string;
    };
  }[];
  _id: string;
  title: string;
  shortTitle: string;
  url: string;
  thumbnailImage: ThumbnailImage;
  price: number;
  discountPrice: number;
  discountTime: string;
  count: number;
  freedelivery: boolean;
  towBuyThree: boolean;
  published: boolean;
  minCart: number;
  singleSale: boolean;
  isVariable: boolean;
  variables: Product[];
  children: Product[];
  property: string;
  mainVariableProperty: string;
  attribiute: {
    color: string;
    image: {
      url: string;
    };
    createdAt: string;
    keyWords: [];
    property: string;
    title: string;
    updatedAt: string;
    url: string;
    __v: 0;
    _id: string;
  }[];
};
export type Course = {
  type: 'vitural' | 'inPerson';
  status: 'complated' | 'inProgress';
  short_des?: string;
  demo: {
    title: string;
    order: number;
    episodes: { title: string; type: string }[];
  }[];
  chapters: {
    title: string;
    lessons: string;
    duration: string;
    order: number;
    episodes: { title: string; duration: string; order: number }[];
  }[];
  episodes: { title: string; type: string }[];
  order: number;
  tags: {
    title: string;
    type: string;
    url: string;
  }[];
  productId?: string;
  amount: number;
  breadcrumb: [];
  metaDescription: string;
  metaTitle: string;
  createdAt?: string;
  orderDiscountPrice: string;
  productCount: number;
  productDiscountPrice: number;
  productPrice: number;
  categories: { title: string }[];
  category: {
    metaTitle: string;
    _id: string;
    title: string;
    url: string;
  };
  description: string;
  updatedAt?: string;
  properties: {
    iconUrl: string;
    attribiute: string[];
    main: boolean;
    property: string;
    _id: string;
  }[];

  enTitle: string;
  video: {
    url: string;
  };
  galleryImage: {
    url: string;
    title: string;
    thumbnailImage: {
      url: string;
    };
  }[];
  _id: string;
  title: string;
  shortTitle: string;
  url: string;
  thumbnailImage: ThumbnailImage;
  coverVideo: ThumbnailImage;
  audio: ThumbnailImage;
  price: number;
  discountPrice: number;
  discountTime: string;
  count: number;
  freedelivery: boolean;
  towBuyThree: boolean;
  published: boolean;
  minCart: number;
  singleSale: boolean;
  isVariable: boolean;
  variables: Product[];
  children: Product[];
  property: string;
  mainVariableProperty: string;
  attribiute: {
    color: string;
    image: {
      url: string;
    };
    createdAt: string;
    keyWords: [];
    property: string;
    title: string;
    updatedAt: string;
    url: string;
    __v: 0;
    _id: string;
  }[];
};

export const findLowestPricedProduct = (data: { attributes: { product: Product }[] }[]) => {
  // Collect all products
  const products = [];
  for (const category of data) {
    for (const attribute of category.attributes) {
      const product = attribute.product;
      if (product.count !== 0) {
        const effectivePrice = Boolean(product.discountPrice)
          ? product.discountPrice
          : product.price;
        // Check if the effective price is not zero
        if (effectivePrice !== 0) {
          products.push({
            ...attribute,
            effectivePrice,
          });
        }
      }
    }
  }

  // Find the product with the lowest price
  let lowestPricedProduct = null;
  for (const product of products) {
    if (!lowestPricedProduct || product.effectivePrice < lowestPricedProduct.effectivePrice) {
      lowestPricedProduct = product;
    }
  }

  return lowestPricedProduct;
};

export interface Order {
  orderTrackingCodeType: string;
  orderTrackingCode: string;
  orderDiscountPrice?: number;
  orderDiscountType?: string;
  orderDiscountCode?: string;
  productId: string;
  amount: string;
  authority: string;
  snappOrderId: string;
  paymentToken: string;
  _id: string;
  orderNumber: number;
  paymentInvoiceNumber: string;
  totalAmount: number;
  transactionType: string;
  orderNote: { text: string; date: string }[];
  orderStatus: string;
  author: User;
  orderAddress: Address;
  postPrice: number;
  postType: string;
  orderItems: Product[];
  wpSended: boolean;
  wooId: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
