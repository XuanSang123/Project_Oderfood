import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(state, "hoziontail");
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.totalPrice -=
          state.items[itemIndex].price * state.items[itemIndex].quantity;
        // delete a item from array
        state.items.splice(itemIndex, 1);
      }
    },
    adjustQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalPrice -= item.price * item.quantity;
        item.quantity = action.payload.quantity;
        state.totalPrice += item.price * action.payload.quantity;
        if (item.quantity <= 0) {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, adjustQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
