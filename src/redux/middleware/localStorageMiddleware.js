export const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  console.log(state);
  localStorage.setItem("CART", JSON.stringify(state));
  return result;
};
