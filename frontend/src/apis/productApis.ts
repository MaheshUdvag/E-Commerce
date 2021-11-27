import axios from "axios";

export const getProducts = (count: number) => {
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

export const getProductsByCategory = (
  path: string,
  count: number,
  sortBy: number
) => {
  return axios({
    method: "GET",
    url: "/admin/api/products/byCategory",
    params: {
      path,
      count,
      sortBy,
      storeName: "MaheshCommerce",
    },
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getProductDetail = (path: string) => {
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
