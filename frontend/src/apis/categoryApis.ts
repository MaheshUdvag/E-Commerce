import axios from "axios";

export const getCategories = () => {
  return axios({
    method: "GET",
    url: "/admin/api/categories",
    params: {
      storeName: "MaheshCommerce",
    },
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getProductsBySearchTerm = (
  count: Number,
  sortBy: Number,
  term: string
) => {
  return axios({
    method: "GET",
    url: `/admin/api/products/bySearchTerm`,
    params: {
      count,
      sortBy,
      term,
      storeName: "MaheshCommerce",
    },
    headers: {
      "content-type": "application/json",
    },
  });
};
