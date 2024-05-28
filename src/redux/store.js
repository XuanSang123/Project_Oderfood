import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authReducer";
import cartSlice from "./slices/cartReducer";

export default configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});
