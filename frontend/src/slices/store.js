import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import sweetsReducer from "./sweetSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sweets: sweetsReducer,
    cart: cartReducer
  }
});

export default store;
