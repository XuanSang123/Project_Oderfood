import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authReducer";
import cartSlice from "./slices/cartReducer";
import { saveToLocalStorage } from "./middleware/localStorageMiddleware";
import loadState from "./loadState";

const preloadedState = loadState();

export default configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(saveToLocalStorage);
  },
});
