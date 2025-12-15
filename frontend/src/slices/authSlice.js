import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    isAdmin: false,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      state.isAdmin = action.payload?.role === "admin";
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setUser, clearUser, setAuthLoading, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
