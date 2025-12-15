import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: []
  },
  reducers: {
    addToCart: (state, action) => {
      const { sweetId, quantity, ...sweet } = action.payload;
      const existing = state.cartItems.find((item) => item.sweetId === sweetId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cartItems.push({ sweetId, quantity, ...sweet });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.sweetId !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
