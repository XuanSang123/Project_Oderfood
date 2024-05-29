export const moneyFormat = (price = 0) =>
  price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
