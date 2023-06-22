import { api } from "../configs/api/axiosConfigs";

export const UserAPI = {
  get: async function (id) {
    const response = await api.request({
      url: `/users/${id}`,
      method: "GET",
    });
    console.log(`get response : `, response);
    return response;
  },
  getAll: async function (page) {
    const response = await api.request({
      url: `/users${page && `?page=${page}`}`,
      method: "GET",
    });
    return response;
  },
  create: async function (user) {
    const response = await api.request({
      url: `/users`,
      method: "POST",
      data: user,
    });
    return response;
  },
  update: async function (id, user) {
    const response = await api.request({
      url: `/users/${id}`,
      method: "PUT",
      data: user,
    });
    return response;
  },
  del: async function (id) {
    const response = await api.request({
      url: `/users/${id}`,
      method: "DELETE",
    });
    return response;
  },
};

export const { get, getAll, create, update, del } = UserAPI;
