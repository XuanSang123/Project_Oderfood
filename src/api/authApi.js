import axiosClient from "./axiosClient";

const authApi = {
  userLogin: (data) => axiosClient.post("signin", data),
  userRegister: (data) => axiosClient.post("register", data),
};

export default authApi;
