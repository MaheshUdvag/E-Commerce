import { IProduct } from "./IProduct";
import { IAddress } from "./IUser";

export interface IOrder {
  _id: string;
  orderId: number;
  total: number;
  totalSalesTax: number;
  totalShippingTax: number;
  user: string;
  store: string;
  status: string;
  orderItems: IOrderItems[];
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
  payment?: IPayment;
  placedTime?: Date;
  __v: Number;
}

export interface IPayment {
  payerId: string;
  paymentId: string;
  paymentType: string;
  status: string;
  _id: string;
}

export interface IOrderItems {
  _id: string;
  price: number;
  salesTax: number;
  shippingTax: number;
  product: IProduct;
  quantity: number;
}
