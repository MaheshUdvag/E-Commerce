import { IProduct } from "./IProduct";

export interface IOrder {
  _id: string;
  total: number;
  totalSalesTax: number;
  totalShippingTax: number;
  user: string;
  store: string;
  status: string;
  orderItems: IOrderItems[];
  address: [];
  createdAt: Date;
  updatedAt: Date;
  __v: Number;
}

export interface IOrderItems {
  _id: string;
  price: number;
  salesTax: number;
  shippingTax: number;
  product: IProduct;
  quantity: number;
}
