import axios from "axios";
import { IAddress } from "../components/Interface/IUser";

export const activeOrder = (token: string) => {
  return axios({
    method: "GET",
    url: "/api/orders/active",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const getOrderByStatus = (token: string, status: string) => {
  return axios({
    method: "GET",
    url: `/api/orders/byStatus/${status}`,
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const completedOrder = (token: string, orderId: string) => {
  return axios({
    method: "POST",
    url: "/api/orders/completed",
    data: {
      orderId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const addUpdateItem = (
  orderId: string,
  productId: string,
  quantity: number,
  token: string
) => {
  return axios({
    method: "POST",
    url: "/api/orders/cart",
    data: {
      orderId,
      productId,
      quantity,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const createOrder = (
  productId: string,
  quantity: number,
  token: string
) => {
  return axios({
    method: "POST",
    url: "/api/orders",
    data: {
      storeName: "MaheshCommerce",
      productId,
      quantity,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const removeItem = (
  orderId: string,
  productId: string,
  token: string
) => {
  return axios({
    method: "DELETE",
    url: "/api/orders/cart",
    data: {
      orderId,
      productId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const createPayPayOrder = (
  orderId: string,
  token: string,
  addressId: string
) => {
  return axios({
    method: "POST",
    url: "/api/orders/paypal/create",
    data: {
      orderId,
      addressId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const updateOrderShippingAddress = (
  payPalOrderId: string,
  orderId: string,
  token: string,
  address: any
) => {
  return axios({
    method: "POST",
    url: "/api/orders/paypal/updateAddress",
    data: {
      orderId,
      address,
      payPalOrderId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const approvePayPalOrder = (
  payPalOrderId: string,
  orderId: string,
  token: string
) => {
  return axios({
    method: "POST",
    url: "/api/orders/paypal/approve",
    data: {
      payPalOrderId,
      orderId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const approveOrder = (
  orderId: string,
  paymentType: string,
  address: IAddress,
  token: string
) => {
  return axios({
    method: "POST",
    url: "/api/orders/approveOrder",
    data: {
      paymentType,
      orderId,
      address,
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
