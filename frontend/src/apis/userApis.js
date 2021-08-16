import axios from "axios";

export const userLogin = (loginId, password) => {
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

export const userRegister = (email, password, name) => {
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

export const userProfile = (token) => {
  return axios({
    method: "GET",
    url: "/api/users/profile",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const userUpdate = (email, name, token) => {
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
