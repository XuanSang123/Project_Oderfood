import axiosClient from "./axiosClient";

const authApi = {
  userLogin: (data) => axiosClient.post("signin", data),
  userRegister: (data) => axiosClient.post("register", data),
  getUserInfo: (userId) => axiosClient.get(`users/${userId}`),
  updateUserInfo: (userId, data) => axiosClient.put(`users/${userId}`, data),
};

export default authApi;
