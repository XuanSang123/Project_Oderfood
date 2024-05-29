import axiosClient from "./axiosClient";

const foodApi = {
  getListFood: () => axiosClient.get("allfood"),
  getAsiaFood: () => axiosClient.get("allfood?categories=asiafood"),
  getDessertsfood: () => axiosClient.get("allfood?categories=dessertsfood"),
  getEuropeanfood: () => axiosClient.get("allfood?categories=europeanfood"),
  getJapansefood: () => axiosClient.get("allfood?categories=japanesefood"),
  getKoreafood: () => axiosClient.get("allfood?categories=koreanfood"),
  getVietfood: () => axiosClient.get("allfood?categories=vietfood"),
};

export default foodApi;
