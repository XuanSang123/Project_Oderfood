import axiosClient from "./axiosClient";

const orderApi = {
  saveOrder: (data) => axiosClient.post("orders", data),
};

export default orderApi;
