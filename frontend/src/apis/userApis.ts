import axios from "axios";

export const userLogin = (loginId: string, password: string) => {
  return axios({
    method: "POST",
    url: "/api/users/login",
    data: {
      loginId,
      password,
    },
    headers: {
      "content-type": "application/json",
    },
  });
};

export const userRegister = (email: string, password: string, name: string) => {
  return axios({
    method: "POST",
    url: "/api/users/register",
    data: {
      email,
      password,
      name,
      storeName: "MaheshCommerce",
    },
    headers: {
      "content-type": "application/json",
    },
  });
};

export const userProfile = (token: string) => {
  return axios({
    method: "GET",
    url: "/api/users/profile",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const userUpdate = (email: string, name: string, token: string) => {
  return axios({
    method: "PUT",
    url: "/api/users/profile",
    data: {
      email,
      name,
      storeName: "MaheshCommerce",
    },
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
