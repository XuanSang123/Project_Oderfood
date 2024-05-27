import axiosClient from "./axiosClient";

const foodApi = {
  getAsiaFood: () => axiosClient.get("asiafood"),
  getDessertsfood: () => axiosClient.get("dessertsfood"),
  getEuropeanfood: () => axiosClient.get("europeanfood"),
  getJapansefood: () => axiosClient.get("japanesefood"),
  getKoreafood: () => axiosClient.get("koreanfood"),
  getVietfood: () => axiosClient.get("vietfood"),
};

export default foodApi;
