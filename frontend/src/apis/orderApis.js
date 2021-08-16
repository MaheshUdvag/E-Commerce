import axios from "axios";

export const activeOrder = (token) => {
  return axios({
    method: "GET",
    url: "/api/orders/active",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const addUpdateItem = (orderId, productId, quantity, token) => {
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

export const createOrder = (productId, quantity, token) => {
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

export const removeItem = (orderId, productId, token) => {
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
