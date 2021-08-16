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
