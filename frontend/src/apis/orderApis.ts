import axios from "axios";

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

export const addUpdateItem = (orderId: string, productId: string, quantity: number, token: string) => {
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

export const createOrder = (productId: string, quantity: number, token: string) => {
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

export const removeItem = (orderId: string, productId: string, token: string) => {
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
