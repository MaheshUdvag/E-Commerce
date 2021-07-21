import { instance } from "./index";

export const getCategories = () => {
  return instance({
    method: "GET",
    url: "/admin/api/categories",
  });
};
