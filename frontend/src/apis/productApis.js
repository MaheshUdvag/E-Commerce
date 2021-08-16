import axios from "axios";

export const getProducts = (count) => {
  return axios({
    method: "GET",
    url: "/admin/api/products",
    params: {
      count,
      storeName: "MaheshCommerce",
    },
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getProductsByCategory = (path, count) => {
  return axios({
    method: "GET",
    url: "/admin/api/products/byCategory",
    params: {
      path,
      count,
      storeName: "MaheshCommerce",
    },
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getProductDetail = (path) => {
  return axios({
    method: "GET",
    url: `/admin/api/products//detail/${path}`,
    params: {
      storeName: "MaheshCommerce",
    },
    headers: {
      "content-type": "application/json",
    },
  });
};
