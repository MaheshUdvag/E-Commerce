import { instance } from "./index";

export const getProducts = (count) => {
  return instance({
    method: "GET",
    url: "/admin/api/products",
    params: {
      count,
    },
  });
};

export const getProductsByCategory = (id, count) => {
  return instance({
    method: "GET",
    url: "/admin/api/products/byCategory",
    params: {
      id,
      count,
    },
  });
};
