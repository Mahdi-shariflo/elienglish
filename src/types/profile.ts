import { Address } from '.';
import { Product } from './home';

export type Order = {
  author: string;
  authority: string;
  createdAt: string;
  orderAddress: Address;
  orderItems: Product[];
  orderNote: { title: string }[];
  orderNumber: number;
  orderStatus: 'Awaiting';
  paymentInvoiceNumber: string;
  postPrice: number;
  postType: string;
  totalAmount: number;
  transactionType: 'Online';

  _id: string;
};
