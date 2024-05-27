import axios from "axios";
import queryString from "query-string";
import { getToken } from "../utilities/localStorageUtil";

// https://axios-http.com/docs/instance.

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// https://axios-http.com/docs/interceptors.

axiosClient.interceptors.request.use((config) => {
  if (getToken()) {
    config.headers.authorization = "Bearer " + getToken();
    console.log("www ", getToken());
  }
  return config;
});

export default axiosClient;
